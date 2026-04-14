-- Cookable AI auth + quota setup
-- Run in Supabase SQL editor

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.saved_recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  recipe_key text not null,
  title text not null,
  short_description text,
  summary text,
  cuisine text,
  servings int4 not null check (servings >= 1 and servings <= 12),
  cook_time_minutes int4,
  ingredients_json jsonb not null,
  steps_json jsonb not null,
  why_this_works text,
  substitutions_json jsonb,
  image_url text,
  source_provider text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, recipe_key)
);

create index if not exists idx_saved_recipes_user_created_at
  on public.saved_recipes(user_id, created_at desc);

create table if not exists public.user_quotas (
  user_id uuid primary key references auth.users(id) on delete cascade,
  daily_quota int4 not null default 5 check (daily_quota >= 0),
  daily_used int4 not null default 0 check (daily_used >= 0),
  quota_reset_at date not null default (timezone('utc', now())::date),
  last_generation_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_saved_recipes_updated_at on public.saved_recipes;
create trigger set_saved_recipes_updated_at
before update on public.saved_recipes
for each row execute function public.set_updated_at();

drop trigger if exists set_user_quotas_updated_at on public.user_quotas;
create trigger set_user_quotas_updated_at
before update on public.user_quotas
for each row execute function public.set_updated_at();

alter table public.saved_recipes enable row level security;
alter table public.user_quotas enable row level security;

drop policy if exists "saved_recipes_select_own" on public.saved_recipes;
create policy "saved_recipes_select_own"
on public.saved_recipes for select
using (auth.uid() = user_id);

drop policy if exists "saved_recipes_insert_own" on public.saved_recipes;
create policy "saved_recipes_insert_own"
on public.saved_recipes for insert
with check (auth.uid() = user_id);

drop policy if exists "saved_recipes_update_own" on public.saved_recipes;
create policy "saved_recipes_update_own"
on public.saved_recipes for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "saved_recipes_delete_own" on public.saved_recipes;
create policy "saved_recipes_delete_own"
on public.saved_recipes for delete
using (auth.uid() = user_id);

drop policy if exists "user_quotas_select_own" on public.user_quotas;
create policy "user_quotas_select_own"
on public.user_quotas for select
using (auth.uid() = user_id);

drop policy if exists "user_quotas_insert_own" on public.user_quotas;
create policy "user_quotas_insert_own"
on public.user_quotas for insert
with check (auth.uid() = user_id);

drop policy if exists "user_quotas_update_own" on public.user_quotas;
create policy "user_quotas_update_own"
on public.user_quotas for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
