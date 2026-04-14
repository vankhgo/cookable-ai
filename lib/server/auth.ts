import type { User } from "@supabase/supabase-js";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient as createServerClient } from "@/lib/supabase/server";

export class ApiRouteError extends Error {
  status: number;
  code:
    | "auth_required"
    | "supabase_not_configured"
    | "quota_exceeded"
    | "quota_unavailable"
    | "validation_error"
    | "server_error";

  constructor(
    status: number,
    code:
      | "auth_required"
      | "supabase_not_configured"
      | "quota_exceeded"
      | "quota_unavailable"
      | "validation_error"
      | "server_error",
    message: string,
  ) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export type AuthContext = {
  user: User;
  supabase: Awaited<ReturnType<typeof createServerClient>>;
};

export async function requireAuthContext(): Promise<AuthContext> {
  if (!isSupabaseConfigured()) {
    throw new ApiRouteError(
      503,
      "supabase_not_configured",
      "Authentication is not configured yet. Add Supabase environment variables.",
    );
  }

  const supabase = await createServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new ApiRouteError(401, "auth_required", "Sign in to generate recipes and save favorites.");
  }

  return { user, supabase };
}
