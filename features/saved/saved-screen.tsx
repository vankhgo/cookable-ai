"use client";

import { Bookmark, Clock3, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/components/cookable/auth-provider";
import { EmptySavedPanel } from "@/components/cookable/state-panels";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cacheRecipeSnapshot } from "@/lib/client/session-cache";
import { useSavedRecipes } from "@/features/saved/use-saved-recipes";

export function SavedScreen() {
  const router = useRouter();
  const { user, openAuthPrompt } = useAuth();
  const { saved, loading, error, toggleSave } = useSavedRecipes();
  const [actionError, setActionError] = useState<string | null>(null);

  const openDetail = (recipeKey: string) => {
    const recipe = saved.find((item) => item.recipeKey === recipeKey);
    if (recipe) {
      cacheRecipeSnapshot(recipe);
    }
    router.push(`/recipe/${encodeURIComponent(recipeKey)}`);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-semibold text-[#2E211B] md:text-4xl">Saved Recipes</h1>
        <p className="mt-2 text-sm leading-6 text-[#6B5B52]">
          Your personal collection of practical meals you want to cook again.
        </p>
      </div>

      {!user && (
        <Card className="mb-4 rounded-[28px] border-[#D8C8B7] bg-[#FFFDF9]">
          <CardHeader>
            <CardTitle className="text-lg text-[#5B3A29]">Sign in to view saved recipes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#6B5B52]">Saved recipes are tied to your account for privacy and sync.</p>
            <Button
              onClick={openAuthPrompt}
              className="mt-3 rounded-xl bg-[#5B3A29] text-[#FFF9F4] hover:bg-[#4D3123]"
            >
              Sign in
            </Button>
          </CardContent>
        </Card>
      )}

      {loading && (
        <Card className="rounded-[28px] bg-[#FFFDF9]">
          <CardContent className="py-6 text-sm text-[#6B5B52]">Loading saved recipes...</CardContent>
        </Card>
      )}

      {!loading && error && (
        <Card className="rounded-[28px] border-[#C97B63]/40 bg-[#FFF4EF]">
          <CardContent className="py-6 text-sm text-[#8A3E2A]">{error}</CardContent>
        </Card>
      )}

      {!loading && !error && actionError && (
        <Card className="mb-4 rounded-[28px] border-[#C97B63]/40 bg-[#FFF4EF]">
          <CardContent className="py-6 text-sm text-[#8A3E2A]">{actionError}</CardContent>
        </Card>
      )}

      {!loading && !error && user && saved.length === 0 && <EmptySavedPanel />}

      {!loading && !error && user && saved.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {saved.map((recipe) => (
            <Card key={recipe.recipeKey} className="rounded-[28px] bg-[#FFFDF9]">
              <CardHeader>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge>{recipe.cuisine}</Badge>
                  <Badge>
                    <Clock3 className="mr-1 size-3" />
                    {recipe.cookTimeMinutes} min
                  </Badge>
                  <Badge>
                    <Users className="mr-1 size-3" />
                    {recipe.servings}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-[#2E211B]">{recipe.title}</CardTitle>
                <p className="mt-2 text-sm leading-6 text-[#6B5B52]">{recipe.shortDescription}</p>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => openDetail(recipe.recipeKey)}
                    className="rounded-xl bg-[#5B3A29] text-[#FFF9F4] hover:bg-[#4D3123]"
                  >
                    View details
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      try {
                        await toggleSave(recipe, false);
                        setActionError(null);
                      } catch (err) {
                        setActionError(err instanceof Error ? err.message : "Unable to unsave recipe.");
                      }
                    }}
                    className="rounded-xl border-[#D8C8B7] bg-[#FFFDF9] text-[#5B3A29]"
                  >
                    <Bookmark className="size-4" />
                    Unsave
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
