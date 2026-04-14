import { NextResponse } from "next/server";

import { ApiRouteError, requireAuthContext } from "@/lib/server/auth";
import { getUserQuota } from "@/lib/server/quota";
import type { ApiErrorPayload } from "@/lib/types/auth";

export async function GET() {
  try {
    const { user, supabase } = await requireAuthContext();
    const quota = await getUserQuota(supabase, user.id);
    return NextResponse.json(quota);
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
        error: "Unable to load quota.",
        code: "server_error",
      } satisfies ApiErrorPayload,
      { status: 500 },
    );
  }
}
