"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useAuth } from "@/components/cookable/auth-provider";
import { ApiClientError, getSavedRecipes, saveRecipe, unsaveRecipe } from "@/lib/client/api";
import type { RecipeRecommendation, SavedRecipeRecord } from "@/lib/types/recipe";

const AUTH_REQUIRED_MESSAGE = "Sign in to save recipes.";

export function useSavedRecipes() {
  const { user, loading: authLoading, openAuthPrompt } = useAuth();
  const [saved, setSaved] = useState<SavedRecipeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setSaved([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const records = await getSavedRecipes();
      setSaved(records);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load saved recipes";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    void refresh();
  }, [refresh, authLoading]);

  const savedKeys = useMemo(() => new Set(saved.map((item) => item.recipeKey)), [saved]);

  const toggleSave = useCallback(
    async (recipe: RecipeRecommendation, nextSaved: boolean) => {
      if (!user) {
        openAuthPrompt();
        throw new ApiClientError(AUTH_REQUIRED_MESSAGE, { code: "auth_required" });
      }

      if (nextSaved) {
        const record = await saveRecipe(recipe);
        setSaved((current) => {
          const byKey = new Map(current.map((entry) => [entry.recipeKey, entry]));
          byKey.set(record.recipeKey, record);
          return Array.from(byKey.values()).sort((a, b) => Date.parse(b.savedAt) - Date.parse(a.savedAt));
        });
        return;
      }

      await unsaveRecipe(recipe.recipeKey);
      setSaved((current) => current.filter((entry) => entry.recipeKey !== recipe.recipeKey));
    },
    [user, openAuthPrompt],
  );

  return {
    saved,
    savedKeys,
    loading: authLoading || loading,
    error,
    refresh,
    toggleSave,
    isAuthenticated: Boolean(user),
  };
}
