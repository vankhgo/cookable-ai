import { NextResponse } from "next/server";

import { getCatalogRecipeByKey, toRecommendation } from "@/lib/server/recommendation/catalog";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const recipeKey = decodeURIComponent(id);

  const recipe = getCatalogRecipeByKey(recipeKey);
  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  const recommendation = toRecommendation(
    recipe,
    recipe.baseServings,
    "This is a practical baseline version from the recipe catalog. Generate from Home for personalized fit notes.",
    [],
  );

  return NextResponse.json(recommendation);
}
