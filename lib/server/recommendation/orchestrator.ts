import { enrichRecommendations } from "@/lib/server/recommendation/ai";
import { getCuisineAlignment } from "@/lib/server/recommendation/cuisine";
import { getRecipeCandidates } from "@/lib/server/recommendation/recipe-api";
import type { RecipeRecommendation } from "@/lib/types/recipe";
import type { RecommendationResponse } from "@/lib/types/recipe";

const MIN_STRONG_MATCH_SCORE = 0.35;
const MIN_NEUTRAL_SUCCESS_SCORE = 0.25;
const MIN_STRICT_SUCCESS_SCORE = 0.5;

function partitionByCuisine(
  recommendations: RecipeRecommendation[],
  requestedCuisine: string,
) {
  const aligned: RecipeRecommendation[] = [];
  const neutral: RecipeRecommendation[] = [];
  const mismatch: RecipeRecommendation[] = [];

  recommendations.forEach((recipe) => {
    const alignment = getCuisineAlignment(requestedCuisine, recipe.cuisine, {
      title: recipe.title,
      shortDescription: recipe.shortDescription,
      ingredientNames: recipe.ingredients,
    });

    if (alignment === "aligned") {
      aligned.push(recipe);
      return;
    }

    if (alignment === "neutral") {
      neutral.push(recipe);
      return;
    }

    mismatch.push(recipe);
  });

  return { aligned, neutral, mismatch };
}

export async function generateRecommendationResponse(input: {
  ingredients: string[];
  cuisine: string;
  servings: number;
  simulateApiFailure?: boolean;
  simulateAiFailure?: boolean;
}): Promise<RecommendationResponse> {
  const candidateResult = await getRecipeCandidates({
    ingredients: input.ingredients,
    cuisine: input.cuisine,
    servings: input.servings,
    simulateFailure: input.simulateApiFailure,
  });

  if (candidateResult.candidates.length === 0) {
    return {
      status: "error",
      recommendations: [],
      fallbackReason:
        "We could not generate recipes right now. Please try again in a moment or simplify your ingredient list.",
      providerFlags: {
        apiUnavailable: true,
        aiUnavailable: true,
        usedCatalogFallback: true,
      },
      inputContext: {
        ingredients: input.ingredients,
        cuisine: input.cuisine,
        servings: input.servings,
      },
    };
  }

  const enriched = await enrichRecommendations({
    candidates: candidateResult.candidates,
    ingredients: input.ingredients,
    cuisine: input.cuisine,
    servings: input.servings,
    simulateFailure: input.simulateAiFailure,
  });

  const sorted = enriched.recommendations.sort((a, b) => b.fitScore - a.fitScore);
  const strongMatch = sorted[0]?.fitScore ?? 0;
  let status: "success" | "fallback" = strongMatch < MIN_STRONG_MATCH_SCORE ? "fallback" : "success";
  let fallbackReason: string | undefined;
  let recommendations: RecipeRecommendation[] = [];

  if (input.cuisine === "Any") {
    const limit = status === "success" ? 6 : 3;
    recommendations = sorted.slice(0, Math.max(3, Math.min(limit, sorted.length)));
    fallbackReason =
      status === "fallback"
        ? "We could not find a perfect direct match, but here are flexible ideas using most of your ingredients."
        : undefined;
  } else {
    const { aligned, neutral, mismatch } = partitionByCuisine(sorted, input.cuisine);
    const qualifiedNeutral = neutral.filter((recipe) => recipe.fitScore >= MIN_NEUTRAL_SUCCESS_SCORE);
    const strictPool = [...aligned, ...qualifiedNeutral].sort((a, b) => b.fitScore - a.fitScore);
    const bestStrictScore = strictPool[0]?.fitScore ?? 0;

    if (strictPool.length > 0) {
      recommendations = strictPool.slice(0, Math.min(6, strictPool.length));
      if (bestStrictScore >= MIN_STRICT_SUCCESS_SCORE) {
        status = "success";
        fallbackReason = undefined;
      } else {
        status = "fallback";
        const fallbackFlexible = [...strictPool, ...neutral, ...mismatch].slice(
          0,
          Math.max(3, Math.min(6, sorted.length)),
        );
        recommendations = fallbackFlexible.length > 0 ? fallbackFlexible : recommendations;
        fallbackReason = `We found limited strong ${input.cuisine}-style matches, so these are flexible ideas using your ingredients.`;
      }
    } else {
      status = "fallback";
      recommendations = [...strictPool, ...neutral, ...mismatch].slice(0, Math.max(3, Math.min(6, sorted.length)));
      fallbackReason = `We found limited strong ${input.cuisine}-style matches, so these are flexible ideas using your ingredients.`;
    }
  }

  return {
    status,
    recommendations,
    fallbackReason,
    providerFlags: {
      apiUnavailable: candidateResult.apiUnavailable,
      aiUnavailable: enriched.aiUnavailable,
      usedCatalogFallback: candidateResult.usedCatalogFallback,
    },
    inputContext: {
      ingredients: input.ingredients,
      cuisine: input.cuisine,
      servings: input.servings,
    },
  };
}
