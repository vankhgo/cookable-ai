"use client";

import Link from "next/link";
import { ArrowLeft, Bookmark, Clock3, Users } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RecipeRecommendation } from "@/lib/types/recipe";

type Props = {
  recipe: RecipeRecommendation;
  isSaved: boolean;
  onToggleSave: (recipe: RecipeRecommendation, nextSaved: boolean) => Promise<void>;
};

export function RecipeDetailContent({ recipe, isSaved, onToggleSave }: Props) {
  const [pending, setPending] = useState(false);

  const handleSave = async () => {
    setPending(true);
    try {
      await onToggleSave(recipe, !isSaved);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-[#D8C8B7] bg-[#FFFDF9] px-3 text-sm font-medium text-[#5B3A29] transition hover:bg-[#F5EFE7]"
        >
          <ArrowLeft className="size-4" />
          Back to results
        </Link>
        <Button
          onClick={handleSave}
          disabled={pending}
          variant="outline"
          className="rounded-xl border-[#D8C8B7] bg-[#FFFDF9] text-[#5B3A29] hover:bg-[#F5EFE7]"
        >
          <Bookmark className="size-4" />
          {isSaved ? "Saved" : "Save recipe"}
        </Button>
      </div>

      <Card className="mb-6 rounded-[30px] bg-[#FFFDF9]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#2E211B] md:text-3xl">{recipe.title}</CardTitle>
          <p className="mt-2 text-base leading-7 text-[#6B5B52]">{recipe.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
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
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Card className="rounded-[28px] bg-[#FFFDF9] lg:sticky lg:top-6 lg:h-fit">
          <CardHeader>
            <CardTitle className="text-lg text-[#2E211B]">Why this works</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="rounded-2xl border border-[#E7D8C9] bg-[#F5EFE7] p-4 text-sm leading-7 text-[#5B3A29]">
              {recipe.whyThisWorks}
            </p>

            {recipe.substitutions.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-[#5B3A29]">Substitution notes</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-[#6B5B52]">
                  {recipe.substitutions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[28px] bg-[#FFFDF9]">
            <CardHeader>
              <CardTitle className="text-lg text-[#2E211B]">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-6 text-[#2E211B]">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient} className="rounded-xl border border-[#E7D8C9] bg-[#FFFDF9] px-3 py-2">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] bg-[#FFFDF9]">
            <CardHeader>
              <CardTitle className="text-lg text-[#2E211B]">Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {recipe.steps.map((step, index) => (
                  <li
                    key={`${index}-${step}`}
                    className="flex gap-3 rounded-2xl border border-[#E7D8C9] bg-[#FFFDF9] p-3 text-sm leading-6 text-[#2E211B]"
                  >
                    <span className="mt-0.5 inline-flex size-6 flex-none items-center justify-center rounded-full bg-[#5B3A29] text-xs font-semibold text-[#FFF9F4]">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
