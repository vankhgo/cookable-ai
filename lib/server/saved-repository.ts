import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import type { RecipeRecommendation, SavedRecipeRecord } from "@/lib/types/recipe";

type SupabaseClient = Awaited<ReturnType<typeof createServerSupabaseClient>>;

type Context = { userId: string; supabase: SupabaseClient };

function toSavedRecord(recipe: RecipeRecommendation, existing?: SavedRecipeRecord): SavedRecipeRecord {
  const now = new Date().toISOString();
  return {
    ...recipe,
    savedAt: existing?.savedAt ?? now,
    updatedAt: now,
  };
}

function mapRowToSavedRecipe(row: Record<string, unknown>): SavedRecipeRecord {
  return {
    recipeKey: String(row.recipe_key),
    title: String(row.title),
    shortDescription: String(row.short_description ?? ""),
    summary: String(row.summary ?? ""),
    cuisine: String(row.cuisine ?? "Any"),
    servings: Number(row.servings ?? 2),
    cookTimeMinutes: Number(row.cook_time_minutes ?? 30),
    ingredients: Array.isArray(row.ingredients_json)
      ? row.ingredients_json.filter((item): item is string => typeof item === "string")
      : [],
    steps: Array.isArray(row.steps_json)
      ? row.steps_json.filter((item): item is string => typeof item === "string")
      : [],
    whyThisWorks: String(row.why_this_works ?? ""),
    substitutions: Array.isArray(row.substitutions_json)
      ? row.substitutions_json.filter((item): item is string => typeof item === "string")
      : [],
    imageUrl: typeof row.image_url === "string" ? row.image_url : null,
    sourceProvider: String(row.source_provider ?? "catalog"),
    fitScore: Number(row.fit_score ?? 0.4),
    savedAt: String(row.created_at ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
  };
}

function mapSavedRecipeToRow(userId: string, recipe: SavedRecipeRecord) {
  return {
    user_id: userId,
    recipe_key: recipe.recipeKey,
    title: recipe.title,
    short_description: recipe.shortDescription,
    summary: recipe.summary,
    cuisine: recipe.cuisine,
    servings: recipe.servings,
    cook_time_minutes: recipe.cookTimeMinutes,
    ingredients_json: recipe.ingredients,
    steps_json: recipe.steps,
    why_this_works: recipe.whyThisWorks,
    substitutions_json: recipe.substitutions,
    image_url: recipe.imageUrl,
    source_provider: recipe.sourceProvider,
  };
}

export async function listSavedRecipes(context: Context): Promise<SavedRecipeRecord[]> {
  const { data, error } = await context.supabase
    .from("saved_recipes")
    .select("*")
    .eq("user_id", context.userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapRowToSavedRecipe(row));
}

export async function getSavedRecipeByKey(
  context: Context,
  recipeKey: string,
): Promise<SavedRecipeRecord | null> {
  const { data, error } = await context.supabase
    .from("saved_recipes")
    .select("*")
    .eq("user_id", context.userId)
    .eq("recipe_key", recipeKey)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapRowToSavedRecipe(data) : null;
}

export async function saveRecipe(
  context: Context,
  recipe: RecipeRecommendation,
): Promise<SavedRecipeRecord> {
  const existing = await getSavedRecipeByKey(context, recipe.recipeKey);
  const baseRecord = toSavedRecord(recipe, existing ?? undefined);
  const row = mapSavedRecipeToRow(context.userId, baseRecord);

  const { data, error } = await context.supabase
    .from("saved_recipes")
    .upsert(row, { onConflict: "user_id,recipe_key" })
    .select("*")
    .single();

  if (error || !data) {
    throw error ?? new Error("Failed to save recipe");
  }

  return mapRowToSavedRecipe(data);
}

export async function unsaveRecipe(context: Context, recipeKey: string): Promise<void> {
  const { error } = await context.supabase
    .from("saved_recipes")
    .delete()
    .eq("user_id", context.userId)
    .eq("recipe_key", recipeKey);

  if (error) {
    throw error;
  }
}
