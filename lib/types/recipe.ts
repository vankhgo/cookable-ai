export type RecommendationStatus = "success" | "fallback" | "error";

export type ProviderFlags = {
  apiUnavailable: boolean;
  aiUnavailable: boolean;
  usedCatalogFallback: boolean;
};

export type RecipeRecommendation = {
  recipeKey: string;
  title: string;
  shortDescription: string;
  summary: string;
  cuisine: string;
  cookTimeMinutes: number;
  servings: number;
  ingredients: string[];
  steps: string[];
  whyThisWorks: string;
  substitutions: string[];
  imageUrl: string | null;
  sourceProvider: string;
  fitScore: number;
};

export type RecommendationResponse = {
  status: RecommendationStatus;
  recommendations: RecipeRecommendation[];
  fallbackReason?: string;
  providerFlags: ProviderFlags;
  quota?: import("@/lib/types/auth").UserQuota;
  inputContext: {
    ingredients: string[];
    cuisine: string;
    servings: number;
  };
};

export type RecommendationRequestPayload = {
  ingredientsRaw: string;
  cuisine: string;
  servings: number;
};

export type SavedRecipeRecord = RecipeRecommendation & {
  savedAt: string;
  updatedAt: string;
};
