"use client";

import type { User } from "@supabase/supabase-js";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { createClient as createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isSupabaseReady: boolean;
  authPromptOpen: boolean;
  authError: string | null;
  openAuthPrompt: () => void;
  closeAuthPrompt: () => void;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isSupabaseReady = isSupabaseConfigured();
  const [loading, setLoading] = useState(isSupabaseReady);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const supabase = useMemo(
    () => (isSupabaseReady ? createSupabaseBrowserClient() : null),
    [isSupabaseReady],
  );

  useEffect(() => {
    if (!supabase) return;

    let mounted = true;

    const init = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!mounted) return;
      setUser(authUser ?? null);
      setLoading(false);
    };

    void init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      setAuthPromptOpen(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const openAuthPrompt = useCallback(() => {
    setAuthPromptOpen(true);
  }, []);

  const closeAuthPrompt = useCallback(() => {
    setAuthPromptOpen(false);
  }, []);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) {
      setAuthError("Supabase auth is not configured.");
      return;
    }

    setAuthError(null);

    const redirectPath =
      typeof window !== "undefined" ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}` : undefined;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectPath,
      },
    });

    if (error) {
      setAuthError(error.message);
    }
  }, [supabase]);

  const signInWithMagicLink = useCallback(
    async (email: string) => {
      if (!supabase) {
        setAuthError("Supabase auth is not configured.");
        return;
      }

      setAuthError(null);

      const redirectPath =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}`
          : undefined;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectPath,
        },
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      setAuthError("Magic link sent. Check your email to continue.");
    },
    [supabase],
  );

  const signOut = useCallback(async () => {
    if (!supabase) return;
    setAuthError(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthError(error.message);
    }
  }, [supabase]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isSupabaseReady,
      authPromptOpen,
      authError,
      openAuthPrompt,
      closeAuthPrompt,
      clearAuthError,
      signInWithGoogle,
      signInWithMagicLink,
      signOut,
    }),
    [
      user,
      loading,
      isSupabaseReady,
      authPromptOpen,
      authError,
      openAuthPrompt,
      closeAuthPrompt,
      clearAuthError,
      signInWithGoogle,
      signInWithMagicLink,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
