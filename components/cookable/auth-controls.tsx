"use client";

import { Mail, Sparkles } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/components/cookable/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthControls() {
  const {
    user,
    loading,
    authPromptOpen,
    authError,
    openAuthPrompt,
    closeAuthPrompt,
    clearAuthError,
    signInWithGoogle,
    signInWithMagicLink,
    signOut,
  } = useAuth();
  const [email, setEmail] = useState("");

  if (loading) {
    return <div className="h-9 w-28 rounded-xl bg-[#E9DED2]" aria-hidden />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden text-right md:block">
          <p className="text-xs text-[#8A7668]">Signed in</p>
          <p className="max-w-40 truncate text-sm font-medium text-[#5B3A29]">{user.email}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void signOut()}
          className="rounded-xl border-[#D8C8B7] bg-[#FFFDF9] text-[#5B3A29]"
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        size="sm"
        onClick={() => {
          clearAuthError();
          openAuthPrompt();
        }}
        className="rounded-xl bg-[#5B3A29] text-[#FFF9F4] hover:bg-[#4D3123]"
      >
        Sign in
      </Button>

      {authPromptOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-[#D8C8B7] bg-[#FFFDF9] p-4 shadow-xl">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-[#2E211B]">Sign in to continue</p>
              <p className="text-xs leading-5 text-[#6B5B52]">Use Google first, or magic link as fallback.</p>
            </div>
            <button
              type="button"
              aria-label="Close sign in panel"
              className="text-sm text-[#8A7668] hover:text-[#5B3A29]"
              onClick={closeAuthPrompt}
            >
              ✕
            </button>
          </div>

          <Button
            onClick={() => void signInWithGoogle()}
            variant="outline"
            className="w-full rounded-xl border-[#D8C8B7] bg-[#FFFDF9] text-[#5B3A29]"
          >
            <Sparkles className="size-4" />
            Continue with Google
          </Button>

          <div className="my-3 h-px bg-[#E7D8C9]" />

          <label className="mb-1 block text-xs font-medium text-[#6B5B52]" htmlFor="magic-link-email">
            Magic link email
          </label>
          <Input
            id="magic-link-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="h-10"
          />
          <Button
            variant="outline"
            className="mt-2 w-full rounded-xl border-[#D8C8B7] bg-[#FFFDF9] text-[#5B3A29]"
            onClick={() => void signInWithMagicLink(email)}
            disabled={!email}
          >
            <Mail className="size-4" />
            Send magic link
          </Button>

          {authError && <p className="mt-2 text-xs text-[#8A3E2A]">{authError}</p>}
        </div>
      )}
    </div>
  );
}
