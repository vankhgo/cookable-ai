export type UserQuota = {
  dailyQuota: number;
  dailyUsed: number;
  remaining: number;
  resetAt: string;
  lastGenerationAt: string | null;
};

export type ApiErrorPayload = {
  error: string;
  code:
    | "auth_required"
    | "supabase_not_configured"
    | "quota_exceeded"
    | "quota_unavailable"
    | "validation_error"
    | "server_error";
  quota?: UserQuota;
};
