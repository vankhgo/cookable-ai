import { NextResponse } from "next/server";

import { ApiRouteError, requireAuthContext } from "@/lib/server/auth";
import { listSavedRecipes, saveRecipe, unsaveRecipe } from "@/lib/server/saved-repository";
import type { ApiErrorPayload } from "@/lib/types/auth";
import type { RecipeRecommendation } from "@/lib/types/recipe";

export async function GET() {
  try {
    const { user, supabase } = await requireAuthContext();
    const saved = await listSavedRecipes({ userId: user.id, supabase });
    return NextResponse.json(saved);
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
        error: "Unable to load saved recipes.",
        code: "server_error",
      } satisfies ApiErrorPayload,
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { user, supabase } = await requireAuthContext();

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON payload",
          code: "validation_error",
        } satisfies ApiErrorPayload,
        { status: 400 },
      );
    }

    const recipe = (body as { recipe?: RecipeRecommendation })?.recipe;
    if (!recipe?.recipeKey || !recipe?.title) {
      return NextResponse.json(
        {
          error: "Recipe payload is required",
          code: "validation_error",
        } satisfies ApiErrorPayload,
        { status: 400 },
      );
    }

    const saved = await saveRecipe({ userId: user.id, supabase }, recipe);
    return NextResponse.json(saved);
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
        error: "Unable to save recipe.",
        code: "server_error",
      } satisfies ApiErrorPayload,
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { user, supabase } = await requireAuthContext();

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON payload",
          code: "validation_error",
        } satisfies ApiErrorPayload,
        { status: 400 },
      );
    }

    const recipeKey = (body as { recipeKey?: string })?.recipeKey;
    if (!recipeKey) {
      return NextResponse.json(
        {
          error: "Recipe key is required",
          code: "validation_error",
        } satisfies ApiErrorPayload,
        { status: 400 },
      );
    }

    await unsaveRecipe({ userId: user.id, supabase }, recipeKey);
    return NextResponse.json({ ok: true });
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
        error: "Unable to unsave recipe.",
        code: "server_error",
      } satisfies ApiErrorPayload,
      { status: 500 },
    );
  }
}
