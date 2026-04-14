"use client";

import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/components/cookable/auth-provider";
import { ApiClientError, getQuota } from "@/lib/client/api";
import type { UserQuota } from "@/lib/types/auth";

export function useQuota() {
  const { user, loading: authLoading } = useAuth();
  const [quota, setQuota] = useState<UserQuota | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setQuota(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const nextQuota = await getQuota();
      setQuota(nextQuota);
    } catch (err) {
      if (err instanceof ApiClientError && err.code === "auth_required") {
        setQuota(null);
        setError(null);
      } else {
        setError(err instanceof Error ? err.message : "Unable to load quota");
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    void refresh();
  }, [authLoading, refresh]);

  return {
    quota,
    loading: authLoading || loading,
    error,
    refresh,
    setQuota,
  };
}
