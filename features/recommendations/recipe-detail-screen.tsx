"use client";

import { useEffect, useState } from "react";

import { RecipeDetailContent } from "@/components/cookable/recipe-detail-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecipeDetail } from "@/lib/client/api";
import { getCachedRecipeSnapshot } from "@/lib/client/session-cache";
import type { RecipeRecommendation } from "@/lib/types/recipe";
import { useSavedRecipes } from "@/features/saved/use-saved-recipes";

type Props = {
  recipeKey: string;
};

export function RecipeDetailScreen({ recipeKey }: Props) {
  const { savedKeys, toggleSave } = useSavedRecipes();
  const [recipe, setRecipe] = useState<RecipeRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCachedRecipeSnapshot(recipeKey);
    if (cached) {
      setRecipe(cached);
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const detail = await getRecipeDetail(recipeKey);
        setRecipe(detail);
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Unable to load recipe detail");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [recipeKey]);

  const onToggleSave = async (target: RecipeRecommendation, nextSaved: boolean) => {
    try {
      await toggleSave(target, nextSaved);
      setActionError(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Unable to update saved recipes.");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Card className="rounded-[28px] bg-[#FFFDF9]">
          <CardHeader>
            <CardTitle className="text-lg text-[#5B3A29]">Matching recipes to your kitchen...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#6B5B52]">Loading recipe detail.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!recipe || loadError) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Card className="rounded-[28px] bg-[#FFFDF9]">
          <CardHeader>
            <CardTitle className="text-lg text-[#5B3A29]">Recipe unavailable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#6B5B52]">{loadError ?? "This recipe could not be loaded."}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {actionError && (
        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-[#C97B63]/40 bg-[#FFF4EF] px-4 py-3 text-sm text-[#8A3E2A]">
          {actionError}
        </div>
      )}
      <RecipeDetailContent
        recipe={recipe}
        isSaved={savedKeys.has(recipe.recipeKey)}
        onToggleSave={onToggleSave}
      />
    </>
  );
}
