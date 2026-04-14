"use client";

import { Bookmark, Clock3, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cacheRecipeSnapshot } from "@/lib/client/session-cache";
import type { RecipeRecommendation } from "@/lib/types/recipe";

type Props = {
  recipe: RecipeRecommendation;
  isSaved: boolean;
  onToggleSave: (recipe: RecipeRecommendation, nextSaved: boolean) => Promise<void>;
};

export function RecipeCard({ recipe, isSaved, onToggleSave }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const openDetail = () => {
    cacheRecipeSnapshot(recipe);
    router.push(`/recipe/${encodeURIComponent(recipe.recipeKey)}`);
  };

  const handleSave = async () => {
    setPending(true);
    try {
      await onToggleSave(recipe, !isSaved);
    } finally {
      setPending(false);
    }
  };

  return (
    <Card className="h-full rounded-[28px] bg-[#FFFDF9]">
      <CardHeader className="pb-3">
        <div className="mb-3 flex flex-wrap items-center gap-2">
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

      <CardContent className="pt-0">
        <div className="rounded-2xl border border-[#E7D8C9] bg-[#F5EFE7] p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#6F4A36]">Why this works</p>
          <p className="mt-1 text-sm leading-6 text-[#5B3A29]">{recipe.whyThisWorks}</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={pending}
            className="rounded-xl border-[#D8C8B7] bg-[#FFFDF9] text-[#5B3A29] hover:bg-[#F5EFE7]"
          >
            <Bookmark className="size-4" />
            {isSaved ? "Saved" : "Save"}
          </Button>

          <Button
            size="sm"
            onClick={openDetail}
            className="rounded-xl bg-[#5B3A29] text-[#FFF9F4] hover:bg-[#4D3123]"
          >
            View details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
