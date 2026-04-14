# Supabase Schema Proposal - Cookable AI

## Overview
This schema supports authenticated saved recipes and per-user daily generation quota.

## Table: `saved_recipes`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `uuid` | `primary key default gen_random_uuid()` | Record id |
| `user_id` | `uuid` | `not null references auth.users(id)` | Owner |
| `recipe_key` | `text` | `not null` | Stable recipe identifier |
| `title` | `text` | `not null` | Recipe title |
| `short_description` | `text` | nullable | Compact card summary |
| `summary` | `text` | nullable | Detail overview |
| `cuisine` | `text` | nullable | Cuisine label |
| `servings` | `int4` | `not null check (servings >= 1 and servings <= 12)` | Saved serving size |
| `cook_time_minutes` | `int4` | nullable | Estimated time |
| `ingredients_json` | `jsonb` | `not null` | Structured ingredients |
| `steps_json` | `jsonb` | `not null` | Ordered steps |
| `why_this_works` | `text` | nullable | AI explanation |
| `substitutions_json` | `jsonb` | nullable | Optional substitutions |
| `image_url` | `text` | nullable | Optional image |
| `source_provider` | `text` | nullable | Source/provider marker |
| `created_at` | `timestamptz` | `not null default now()` | Created timestamp |
| `updated_at` | `timestamptz` | `not null default now()` | Updated timestamp |

### Constraints and Indexes
- Unique: `unique (user_id, recipe_key)`
- Index: `idx_saved_recipes_user_created_at (user_id, created_at desc)`

### RLS
- `select/insert/update/delete` only when `auth.uid() = user_id`

---

## Table: `user_quotas`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `user_id` | `uuid` | `primary key references auth.users(id)` | One row per user |
| `daily_quota` | `int4` | `not null default 5 check (daily_quota >= 0)` | Daily generation limit |
| `daily_used` | `int4` | `not null default 0 check (daily_used >= 0)` | Current day usage |
| `quota_reset_at` | `date` | `not null` | UTC day marker for lazy reset |
| `last_generation_at` | `timestamptz` | nullable | Last successful generation |
| `created_at` | `timestamptz` | `not null default now()` | Created timestamp |
| `updated_at` | `timestamptz` | `not null default now()` | Updated timestamp |

### RLS
- `select/insert/update` only when `auth.uid() = user_id`

---

## Optional Table: `recommendation_requests` (MVP+)
Keep optional logging lightweight; not required for quota enforcement.

## SQL Setup
- Ready-to-run SQL: `supabase/sql/2026-04-14-auth-quota-setup.sql`
