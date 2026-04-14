import type { ApiErrorPayload, UserQuota } from "@/lib/types/auth";
import type {
  RecommendationRequestPayload,
  RecommendationResponse,
  RecipeRecommendation,
  SavedRecipeRecord,
} from "@/lib/types/recipe";

export class ApiClientError extends Error {
  code?: ApiErrorPayload["code"];
  quota?: UserQuota;

  constructor(message: string, options?: { code?: ApiErrorPayload["code"]; quota?: UserQuota }) {
    super(message);
    this.code = options?.code;
    this.quota = options?.quota;
  }
}

async function parseError(response: Response, fallbackMessage: string): Promise<ApiClientError> {
  const payload = (await response.json().catch(() => null)) as ApiErrorPayload | null;
  return new ApiClientError(payload?.error ?? fallbackMessage, {
    code: payload?.code,
    quota: payload?.quota,
  });
}

export async function generateRecommendations(payload: RecommendationRequestPayload) {
  const response = await fetch("/api/recommendations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseError(response, "Failed to generate recommendations");
  }

  return (await response.json()) as RecommendationResponse;
}

export async function saveRecipe(recipe: RecipeRecommendation): Promise<SavedRecipeRecord> {
  const response = await fetch("/api/saved", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipe }),
  });

  if (!response.ok) {
    throw await parseError(response, "Failed to save recipe");
  }

  return (await response.json()) as SavedRecipeRecord;
}

export async function unsaveRecipe(recipeKey: string): Promise<void> {
  const response = await fetch("/api/saved", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeKey }),
  });

  if (!response.ok) {
    throw await parseError(response, "Failed to unsave recipe");
  }
}

export async function getSavedRecipes(): Promise<SavedRecipeRecord[]> {
  const response = await fetch("/api/saved", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw await parseError(response, "Failed to load saved recipes");
  }

  return (await response.json()) as SavedRecipeRecord[];
}

export async function getRecipeDetail(recipeKey: string): Promise<RecipeRecommendation> {
  const response = await fetch(`/api/recipes/${encodeURIComponent(recipeKey)}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw await parseError(response, "Recipe not found");
  }

  return (await response.json()) as RecipeRecommendation;
}

export async function getQuota(): Promise<UserQuota> {
  const response = await fetch("/api/quota", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw await parseError(response, "Failed to load quota");
  }

  return (await response.json()) as UserQuota;
}
