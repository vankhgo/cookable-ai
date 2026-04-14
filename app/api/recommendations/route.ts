import { NextResponse } from "next/server";

import { generateRecommendationResponse } from "@/lib/server/recommendation/orchestrator";
import { ApiRouteError, requireAuthContext } from "@/lib/server/auth";
import { getUserQuota, incrementUserQuota } from "@/lib/server/quota";
import type { ApiErrorPayload } from "@/lib/types/auth";
import { normalizeIngredientTerms, recommendationRequestSchema } from "@/lib/validation/recommendation";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid JSON payload",
        code: "validation_error",
      } satisfies ApiErrorPayload,
      { status: 400 },
    );
  }

  const parsed = recommendationRequestSchema.safeParse(payload);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      {
        error: issue?.message ?? "Invalid request",
        code: "validation_error",
      } satisfies ApiErrorPayload,
      { status: 400 },
    );
  }

  try {
    const { user, supabase } = await requireAuthContext();

    let quota;
    try {
      quota = await getUserQuota(supabase, user.id);
    } catch {
      throw new ApiRouteError(
        503,
        "quota_unavailable",
        "Quota service is unavailable. Please try again shortly.",
      );
    }

    if (quota.remaining <= 0) {
      return NextResponse.json(
        {
          error: "You’ve reached today’s free limit. Try again tomorrow.",
          code: "quota_exceeded",
          quota,
        } satisfies ApiErrorPayload,
        { status: 429 },
      );
    }

    const ingredients = normalizeIngredientTerms(parsed.data.ingredientsRaw);

    const response = await generateRecommendationResponse({
      ingredients,
      cuisine: parsed.data.cuisine,
      servings: parsed.data.servings,
      simulateApiFailure: request.headers.get("x-simulate-api-failure") === "1",
      simulateAiFailure: request.headers.get("x-simulate-ai-failure") === "1",
    });

    if (response.status === "error") {
      return NextResponse.json(response, { status: 503 });
    }

    const updatedQuota = await incrementUserQuota(supabase, user.id);

    return NextResponse.json({
      ...response,
      quota: updatedQuota,
    });
  } catch (error) {
    if (error instanceof ApiRouteError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
        } satisfies ApiErrorPayload,
        { status: error.status },
      );
    }

    return NextResponse.json(
      {
        error: "Unable to generate recipes right now.",
        code: "server_error",
      } satisfies ApiErrorPayload,
      { status: 500 },
    );
  }
}
