import { z } from "zod";

import {
  getFallbackSubstitutions,
  toRecommendation,
  type CandidateRecipe,
} from "@/lib/server/recommendation/catalog";
import type { RecipeRecommendation } from "@/lib/types/recipe";

type EnrichmentInput = {
  candidates: CandidateRecipe[];
  ingredients: string[];
  cuisine: string;
  servings: number;
  simulateFailure?: boolean;
};

type EnrichmentResult = {
  recommendations: RecipeRecommendation[];
  aiUnavailable: boolean;
};

const aiResultSchema = z.object({
  recipes: z.array(
    z.object({
      recipeKey: z.string(),
      whyThisWorks: z.string().min(12),
      substitutions: z.array(z.string()).max(4).default([]),
      fitScoreBoost: z.number().min(-0.2).max(0.2).default(0),
    }),
  ),
});

function buildFallbackWhy(recipe: CandidateRecipe, inputIngredients: string[], servings: number): string {
  const matched = recipe.matchedIngredients.slice(0, 3);
  const matchText = matched.length > 0 ? matched.join(", ") : inputIngredients.slice(0, 2).join(", ");

  return `This suggestion uses ${matchText} you already have, stays practical for ${servings} servings, and keeps prep straightforward.`;
}

function heuristicEnrichment(input: EnrichmentInput): EnrichmentResult {
  const recommendations = input.candidates.map((candidate) => {
    const whyThisWorks = buildFallbackWhy(candidate, input.ingredients, input.servings);
    const substitutions = getFallbackSubstitutions(candidate, input.ingredients);
    return toRecommendation(candidate, input.servings, whyThisWorks, substitutions);
  });

  return {
    recommendations,
    aiUnavailable: true,
  };
}

function hasAiConfig() {
  return Boolean(process.env.AI_API_KEY);
}

async function callRemoteAI(input: EnrichmentInput): Promise<EnrichmentResult | null> {
  if (!hasAiConfig()) {
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const prompt = {
      task: "enrich_recipe_recommendations",
      constraints: {
        style: "practical, concise, non-chat",
        avoid_exotic_ingredients: true,
        servings: input.servings,
        cuisine_alignment: "Treat selected cuisine as a strong constraint. Do not boost clearly off-cuisine candidates.",
      },
      request: {
        inputIngredients: input.ingredients,
        cuisine: input.cuisine,
      },
      candidates: input.candidates.map((candidate) => ({
        recipeKey: candidate.recipeKey,
        title: candidate.title,
        shortDescription: candidate.shortDescription,
        cuisine: candidate.cuisine,
        ingredients: candidate.ingredients.map((item) => item.name),
        fitScore: candidate.fitScore,
      })),
      output_schema: {
        recipes: [
          {
            recipeKey: "string",
            whyThisWorks: "string",
            substitutions: ["string"],
            fitScoreBoost: "number between -0.2 and 0.2",
          },
        ],
      },
      output_rule:
        "Return only valid JSON. Keep fitScoreBoost <= 0 for clearly off-cuisine candidates unless the request cuisine is Any.",
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL ?? "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "You produce structured recommendation enrichment JSON for a recipe product. Never return markdown.",
          },
          {
            role: "user",
            content: JSON.stringify(prompt),
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`AI status ${response.status}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("AI response missing content");
    }

    const parsed = aiResultSchema.safeParse(JSON.parse(content));
    if (!parsed.success) {
      throw new Error("AI response schema invalid");
    }

    const byKey = new Map(parsed.data.recipes.map((entry) => [entry.recipeKey, entry]));

    const recommendations = input.candidates.map((candidate) => {
      const match = byKey.get(candidate.recipeKey);
      const whyThisWorks = match?.whyThisWorks ?? buildFallbackWhy(candidate, input.ingredients, input.servings);
      const substitutions = match?.substitutions?.length
        ? match.substitutions
        : getFallbackSubstitutions(candidate, input.ingredients);
      const adjusted = {
        ...candidate,
        fitScore: Math.max(0, Math.min(1, candidate.fitScore + (match?.fitScoreBoost ?? 0))),
      };

      return toRecommendation(adjusted, input.servings, whyThisWorks, substitutions);
    });

    return {
      recommendations,
      aiUnavailable: false,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function enrichRecommendations(input: EnrichmentInput): Promise<EnrichmentResult> {
  if (input.simulateFailure) {
    return heuristicEnrichment(input);
  }

  const remote = await callRemoteAI(input);
  if (remote) {
    return remote;
  }

  return heuristicEnrichment(input);
}
