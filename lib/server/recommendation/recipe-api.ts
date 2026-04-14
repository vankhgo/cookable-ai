import { getCatalogCandidates, type CandidateRecipe } from "@/lib/server/recommendation/catalog";
import { getCuisineAlignment } from "@/lib/server/recommendation/cuisine";
import { overlapsIngredient } from "@/lib/server/recommendation/ingredients";

type RecipeApiRequest = {
  ingredients: string[];
  cuisine: string;
  servings: number;
  simulateFailure?: boolean;
};

type RecipeApiResult = {
  candidates: CandidateRecipe[];
  apiUnavailable: boolean;
  usedCatalogFallback: boolean;
};

function clampScore(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function scoreForRequest(candidate: CandidateRecipe, request: RecipeApiRequest): CandidateRecipe {
  const ingredientNames = candidate.ingredients.map((item) => item.name);
  const matchedIngredients = ingredientNames.filter((name) => overlapsIngredient(request.ingredients, name));
  const overlapScore = matchedIngredients.length / Math.max(ingredientNames.length, 1);
  const cuisineAlignment = getCuisineAlignment(request.cuisine, candidate.cuisine, {
    title: candidate.title,
    shortDescription: candidate.shortDescription,
    ingredientNames,
  });
  const cuisineAdjustment =
    request.cuisine === "Any"
      ? 0.08
      : cuisineAlignment === "aligned"
        ? 0.22
        : cuisineAlignment === "neutral"
          ? 0.04
          : -0.35;

  const providerScore = clampScore(candidate.fitScore);
  const fitScore = clampScore(providerScore * 0.55 + overlapScore * 0.45 + cuisineAdjustment);

  return {
    ...candidate,
    fitScore,
    matchedIngredients: matchedIngredients.length > 0 ? matchedIngredients : candidate.matchedIngredients,
  };
}

function hasExternalRecipeApiConfig() {
  return Boolean(process.env.RECIPE_API_BASE_URL);
}

function mapExternalCandidate(candidate: Record<string, unknown>): CandidateRecipe | null {
  if (typeof candidate.recipeKey !== "string" || typeof candidate.title !== "string") {
    return null;
  }

  const ingredients = Array.isArray(candidate.ingredients)
    ? candidate.ingredients
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const entry = item as Record<string, unknown>;
          if (typeof entry.name !== "string" || typeof entry.amount !== "number" || typeof entry.unit !== "string") {
            return null;
          }

          return {
            name: entry.name,
            amount: entry.amount,
            unit: entry.unit,
            optional: entry.optional === true,
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
    : [];

  const steps = Array.isArray(candidate.steps)
    ? candidate.steps.filter((item): item is string => typeof item === "string")
    : [];

  if (ingredients.length === 0 || steps.length === 0) {
    return null;
  }

  return {
    recipeKey: candidate.recipeKey,
    title: candidate.title,
    shortDescription:
      typeof candidate.shortDescription === "string"
        ? candidate.shortDescription
        : "Practical recipe suggestion matched from your ingredients.",
    summary:
      typeof candidate.summary === "string"
        ? candidate.summary
        : "A practical recipe suggestion adapted for your current kitchen input.",
    cuisine: typeof candidate.cuisine === "string" ? candidate.cuisine : "Any",
    cookTimeMinutes: typeof candidate.cookTimeMinutes === "number" ? candidate.cookTimeMinutes : 30,
    baseServings: typeof candidate.baseServings === "number" ? candidate.baseServings : 2,
    ingredients,
    steps,
    substitutions:
      candidate.substitutions && typeof candidate.substitutions === "object"
        ? (candidate.substitutions as Record<string, string[]>)
        : {},
    sourceProvider: "recipe-api",
    imageUrl: typeof candidate.imageUrl === "string" ? candidate.imageUrl : null,
    fitScore: typeof candidate.fitScore === "number" ? candidate.fitScore : 0.4,
    matchedIngredients: Array.isArray(candidate.matchedIngredients)
      ? candidate.matchedIngredients.filter((item): item is string => typeof item === "string")
      : [],
  } satisfies CandidateRecipe;
}

async function fetchExternalCandidates(payload: RecipeApiRequest): Promise<CandidateRecipe[]> {
  const url = process.env.RECIPE_API_BASE_URL;
  if (!url) return [];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.RECIPE_API_KEY ? { Authorization: `Bearer ${process.env.RECIPE_API_KEY}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Recipe API status ${response.status}`);
    }

    const json = (await response.json()) as { candidates?: Record<string, unknown>[] };
    if (!Array.isArray(json.candidates)) {
      throw new Error("Recipe API candidates payload missing");
    }

    return json.candidates
      .map(mapExternalCandidate)
      .filter((item): item is CandidateRecipe => Boolean(item));
  } finally {
    clearTimeout(timeout);
  }
}

export async function getRecipeCandidates(request: RecipeApiRequest): Promise<RecipeApiResult> {
  const catalogCandidates = getCatalogCandidates(request.ingredients, request.cuisine).map((candidate) =>
    scoreForRequest(candidate, request),
  );

  if (request.simulateFailure) {
    return {
      candidates: catalogCandidates,
      apiUnavailable: true,
      usedCatalogFallback: true,
    };
  }

  if (!hasExternalRecipeApiConfig()) {
    return {
      candidates: catalogCandidates,
      apiUnavailable: false,
      usedCatalogFallback: true,
    };
  }

  try {
    const external = await fetchExternalCandidates(request);
    const rescoredExternal = external.map((candidate) => scoreForRequest(candidate, request));
    const merged = [...rescoredExternal, ...catalogCandidates]
      .reduce<Map<string, CandidateRecipe>>((acc, recipe) => {
        const existing = acc.get(recipe.recipeKey);
        if (!existing || recipe.fitScore > existing.fitScore) {
          acc.set(recipe.recipeKey, recipe);
        }
        return acc;
      }, new Map())
      .values();

    const candidates = Array.from(merged)
      .map((candidate) => scoreForRequest(candidate, request))
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, 8);

    return {
      candidates,
      apiUnavailable: false,
      usedCatalogFallback: rescoredExternal.length === 0,
    };
  } catch {
    return {
      candidates: catalogCandidates,
      apiUnavailable: true,
      usedCatalogFallback: true,
    };
  }
}
