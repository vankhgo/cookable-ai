"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { useAuth } from "@/components/cookable/auth-provider";
import { ContextSummaryBar } from "@/components/cookable/context-summary-bar";
import { LoadingRecipes } from "@/components/cookable/loading-recipes";
import { RecipeCard } from "@/components/cookable/recipe-card";
import { NoMatchPanel } from "@/components/cookable/state-panels";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CUISINES, CUISINE_SET } from "@/lib/constants/cuisine";
import { ApiClientError, generateRecommendations } from "@/lib/client/api";
import {
  cacheLatestRecommendationResult,
  cacheRecipeSnapshots,
  getCachedLatestRecommendationResult,
} from "@/lib/client/session-cache";
import type { RecommendationResponse, RecipeRecommendation } from "@/lib/types/recipe";
import { recommendationRequestSchema } from "@/lib/validation/recommendation";
import { useQuota } from "@/features/home/use-quota";
import { useSavedRecipes } from "@/features/saved/use-saved-recipes";

type FormValues = z.infer<typeof recommendationRequestSchema>;

const defaultValues: FormValues = {
  ingredientsRaw: "",
  cuisine: "Any",
  servings: 2,
};

export function DemoScreen() {
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ingredientsRef = useRef<HTMLTextAreaElement | null>(null);

  const { user, openAuthPrompt } = useAuth();
  const { quota, setQuota } = useQuota();
  const { savedKeys, toggleSave } = useSavedRecipes();

  const form = useForm<FormValues>({
    resolver: zodResolver(recommendationRequestSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    const cachedResult = getCachedLatestRecommendationResult();
    if (!cachedResult) return;

    setResult(cachedResult);
    cacheRecipeSnapshots(cachedResult.recommendations);

    const restoredCuisine = CUISINE_SET.has(cachedResult.inputContext.cuisine)
      ? (cachedResult.inputContext.cuisine as FormValues["cuisine"])
      : "Any";
    const restoredServings = Number.isInteger(cachedResult.inputContext.servings)
      ? Math.min(12, Math.max(1, cachedResult.inputContext.servings))
      : 2;

    form.reset({
      ingredientsRaw: cachedResult.inputContext.ingredients.join(", "),
      cuisine: restoredCuisine,
      servings: restoredServings,
    });

    if (cachedResult.quota) {
      setQuota(cachedResult.quota);
    }
  }, [form, setQuota]);

  const submit: SubmitHandler<FormValues> = async (values) => {
    setError(null);

    if (!user) {
      openAuthPrompt();
      setError("Sign in to generate recipes and use your daily credits.");
      return;
    }

    if (quota && quota.remaining <= 0) {
      setError("You’ve reached today’s free limit. Try again tomorrow.");
      return;
    }

    setLoading(true);

    try {
      const response = await generateRecommendations(values);
      setResult(response);
      cacheLatestRecommendationResult(response);
      cacheRecipeSnapshots(response.recommendations);
      if (response.quota) {
        setQuota(response.quota);
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
        if (err.quota) {
          setQuota(err.quota);
        }
      } else {
        setError(err instanceof Error ? err.message : "Unable to generate recipes");
      }
    } finally {
      setLoading(false);
    }
  };

  const onToggleSave = async (recipe: RecipeRecommendation, nextSaved: boolean) => {
    try {
      await toggleSave(recipe, nextSaved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update saved recipes");
    }
  };

  const onEdit = () => {
    ingredientsRef.current?.focus();
    ingredientsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const ingredientsField = form.register("ingredientsRaw");

  return (
    <div data-testid="cookable-demo-screen" className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Card className="rounded-[32px] border-[#E7D8C9] bg-[#FFFDF9]">
          <CardHeader>
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F5EFE7] px-3 py-1 text-xs font-semibold text-[#6F4A36]">
              <Sparkles className="size-3.5" />
              Ingredient-first cooking companion
            </p>
            <CardTitle className="mt-4 font-heading text-3xl leading-tight text-[#2E211B] md:text-4xl">
              Turn what you already have into a cookable meal.
            </CardTitle>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#6B5B52]">
              Add your ingredients, choose a cuisine and serving size, then get practical recipe suggestions with
              clear steps, substitution ideas, and a quick why-this-fits explanation.
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={form.handleSubmit(submit)}>
              <div>
                <Label htmlFor="ingredientsRaw">Ingredients</Label>
                <Textarea
                  id="ingredientsRaw"
                  placeholder="eggs, onion, spinach, rice"
                  {...ingredientsField}
                  ref={(node) => {
                    ingredientsField.ref(node);
                    ingredientsRef.current = node;
                  }}
                />
                <p className="mt-2 text-sm text-[#8A7668]">
                  Enter ingredients as a list, on separate lines, or as a short sentence.
                </p>
                {form.formState.errors.ingredientsRaw && (
                  <p className="mt-2 text-sm font-medium text-[#8A3E2A]">
                    {form.formState.errors.ingredientsRaw.message}
                  </p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="cuisine">Cuisine</Label>
                  <Select id="cuisine" {...form.register("cuisine")}>
                    {CUISINES.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="servings">Servings</Label>
                  <Select id="servings" {...form.register("servings", { valueAsNumber: true })}>
                    {Array.from({ length: 12 }).map((_, index) => {
                      const value = index + 1;
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || Boolean(quota && quota.remaining <= 0)}
                  className="h-12 rounded-2xl bg-[#5B3A29] px-6 text-[#FFF9F4] hover:bg-[#4D3123]"
                >
                  {loading
                    ? "Generating practical ideas..."
                    : !user
                      ? "Sign in to Generate Recipes"
                      : quota && quota.remaining <= 0
                        ? "Daily limit reached"
                        : "Generate Recipes"}
                </Button>

                {user && quota && (
                  <p className="text-sm text-[#6B5B52]">
                    {quota.remaining} of {quota.dailyQuota} recipe generations left today.
                  </p>
                )}

                {!user && (
                  <p className="text-sm text-[#6B5B52]">
                    Sign in to unlock your daily free recipe generations and saved recipes.
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-[#E7D8C9] bg-[#F5EFE7]">
          <CardHeader>
            <CardTitle className="font-heading text-2xl text-[#2E211B]">Why ingredient-first works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-[#5B3A29]">
            <p>Reduce food waste by cooking from what is already in your kitchen.</p>
            <p>Skip decision fatigue with recommendations you can scan in seconds.</p>
            <p>Get practical recipe detail with realistic substitutions when needed.</p>
          </CardContent>
        </Card>
      </section>

      {error && (
        <p className="mt-6 rounded-2xl border border-[#C97B63]/40 bg-[#FFF4EF] px-4 py-3 text-sm text-[#8A3E2A]">
          {error}
        </p>
      )}

      <section className="mt-8 space-y-5">
        {loading && <LoadingRecipes />}

        {!loading && result && (
          <>
            <ContextSummaryBar
              ingredients={result.inputContext.ingredients}
              cuisine={result.inputContext.cuisine}
              servings={result.inputContext.servings}
              onEdit={onEdit}
              onRegenerate={form.handleSubmit(submit)}
              disabled={loading}
            />

            {result.status === "fallback" && (
              <NoMatchPanel
                message={
                  result.fallbackReason ??
                  "We could not find a perfect direct match, but here are flexible ideas using most of your ingredients."
                }
              />
            )}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {result.recommendations.map((recipe) => (
                <RecipeCard
                  key={recipe.recipeKey}
                  recipe={recipe}
                  isSaved={savedKeys.has(recipe.recipeKey)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>

            {(result.providerFlags.aiUnavailable || result.providerFlags.apiUnavailable) && (
              <p className="text-xs text-[#8A7668]">
                Some providers were unavailable for this request. You are seeing a graceful fallback response.
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
