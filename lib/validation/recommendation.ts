import { z } from "zod";

import { CUISINES } from "@/lib/constants/cuisine";
import { parseIngredientCandidates } from "@/lib/validation/ingredients";

export const recommendationRequestSchema = z
  .object({
    ingredientsRaw: z.string().min(1, "Please add ingredients"),
    cuisine: z.enum(CUISINES),
    servings: z.number().int().min(1).max(12),
  })
  .superRefine((payload, ctx) => {
    const terms = parseIngredientCandidates(payload.ingredientsRaw);
    if (terms.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ingredientsRaw"],
        message: "Please enter at least a few ingredients to get recipe suggestions.",
      });
    }
  });

export type RecommendationRequestInput = z.infer<typeof recommendationRequestSchema>;

export const normalizeIngredientTerms = (raw: string): string[] => {
  return parseIngredientCandidates(raw);
};
