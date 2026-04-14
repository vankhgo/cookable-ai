import type { RecommendationResponse, RecipeRecommendation } from "@/lib/types/recipe";

const SNAPSHOT_KEY = "cookable:recipe-snapshots";
const RESULT_KEY = "cookable:latest-recommendation-result";

type SnapshotMap = Record<string, RecipeRecommendation>;

function readSnapshotMap(): SnapshotMap {
  if (typeof window === "undefined") return {};
  const raw = window.sessionStorage.getItem(SNAPSHOT_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as SnapshotMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeSnapshotMap(map: SnapshotMap) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SNAPSHOT_KEY, JSON.stringify(map));
}

export function cacheRecipeSnapshot(recipe: RecipeRecommendation) {
  const map = readSnapshotMap();
  map[recipe.recipeKey] = recipe;
  writeSnapshotMap(map);
}

export function cacheRecipeSnapshots(recipes: RecipeRecommendation[]) {
  const map = readSnapshotMap();
  recipes.forEach((recipe) => {
    map[recipe.recipeKey] = recipe;
  });
  writeSnapshotMap(map);
}

export function getCachedRecipeSnapshot(recipeKey: string): RecipeRecommendation | null {
  const map = readSnapshotMap();
  return map[recipeKey] ?? null;
}

export function cacheLatestRecommendationResult(result: RecommendationResponse) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
}

export function getCachedLatestRecommendationResult(): RecommendationResponse | null {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(RESULT_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as RecommendationResponse;
    if (!parsed || typeof parsed !== "object") return null;
    if (!Array.isArray(parsed.recommendations)) return null;
    if (!parsed.inputContext || typeof parsed.inputContext !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}
