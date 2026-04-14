import type { UserQuota } from "@/lib/types/auth";

const DEFAULT_DAILY_QUOTA = 5;

type QuotaRow = {
  user_id: string;
  daily_quota: number;
  daily_used: number;
  quota_reset_at: string;
  last_generation_at: string | null;
};

function utcDayString(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function normalizeQuota(row: QuotaRow): UserQuota {
  const dailyQuota = Math.max(0, Number(row.daily_quota ?? DEFAULT_DAILY_QUOTA));
  const dailyUsed = Math.max(0, Number(row.daily_used ?? 0));
  const remaining = Math.max(0, dailyQuota - dailyUsed);

  return {
    dailyQuota,
    dailyUsed,
    remaining,
    resetAt: row.quota_reset_at,
    lastGenerationAt: row.last_generation_at,
  };
}

async function getOrCreateQuota(
  supabase: Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>>,
  userId: string,
): Promise<QuotaRow> {
  const today = utcDayString();

  const { data: existing, error } = await supabase
    .from("user_quotas")
    .select("user_id,daily_quota,daily_used,quota_reset_at,last_generation_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!existing) {
    const { data: created, error: insertError } = await supabase
      .from("user_quotas")
      .insert({
        user_id: userId,
        daily_quota: DEFAULT_DAILY_QUOTA,
        daily_used: 0,
        quota_reset_at: today,
      })
      .select("user_id,daily_quota,daily_used,quota_reset_at,last_generation_at")
      .single();

    if (insertError || !created) {
      throw insertError ?? new Error("Failed to create quota record");
    }

    return created as QuotaRow;
  }

  const current = existing as QuotaRow;
  if (current.quota_reset_at !== today) {
    const { data: reset, error: resetError } = await supabase
      .from("user_quotas")
      .update({
        daily_used: 0,
        quota_reset_at: today,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select("user_id,daily_quota,daily_used,quota_reset_at,last_generation_at")
      .single();

    if (resetError || !reset) {
      throw resetError ?? new Error("Failed to reset daily quota");
    }

    return reset as QuotaRow;
  }

  return current;
}

export async function getUserQuota(
  supabase: Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>>,
  userId: string,
): Promise<UserQuota> {
  const row = await getOrCreateQuota(supabase, userId);
  return normalizeQuota(row);
}

export async function incrementUserQuota(
  supabase: Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>>,
  userId: string,
): Promise<UserQuota> {
  const row = await getOrCreateQuota(supabase, userId);
  const dailyQuota = Math.max(0, Number(row.daily_quota ?? DEFAULT_DAILY_QUOTA));
  const dailyUsed = Math.max(0, Number(row.daily_used ?? 0));

  if (dailyUsed >= dailyQuota) {
    return normalizeQuota(row);
  }

  const { data: updated, error } = await supabase
    .from("user_quotas")
    .update({
      daily_used: dailyUsed + 1,
      last_generation_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select("user_id,daily_quota,daily_used,quota_reset_at,last_generation_at")
    .single();

  if (error || !updated) {
    throw error ?? new Error("Failed to increment quota usage");
  }

  return normalizeQuota(updated as QuotaRow);
}
