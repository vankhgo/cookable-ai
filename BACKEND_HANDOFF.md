# Backend Handoff - Cookable AI

## Domain Overview
Cookable AI is an ingredient-first recommendation application. Backend responsibilities center on secure orchestration of third-party services (Recipe API + AI), request validation, and persistence of saved recipes.

## Backend Responsibilities
- Expose generation endpoint for recipe recommendations
- Require authenticated user identity for generation and saved recipes
- Validate and sanitize input payloads
- Orchestrate Recipe API retrieval and AI refinement
- Return consistent, typed response contract to frontend
- Persist and fetch saved recipes from Supabase
- Handle failure modes and fallback behavior
- Return screen-ready fields for Results and Detail views (title, short description, cuisine, time, servings, why-this-works, ingredients, steps, substitutions)
- Enforce per-user daily quota for generation usage

## Supabase Responsibilities
- Store user-scoped saved recipes
- Store user-scoped quota records (`user_quotas`)
- Enforce RLS access policies
- Provide reliable retrieval for Saved Recipes view
- Optionally store generation request logs for debugging/tuning

## What Should Be Persisted
### Must Persist (MVP)
- Saved recipes records (`saved_recipes`)
- User quota records (`user_quotas`)
- Timestamps for auditability (`created_at`, `updated_at`)

### Optional Persist (MVP+)
- Recommendation request metadata (`recommendation_requests`):
  - ingredients snapshot
  - selected cuisine/servings
  - generation status
  - provider timing/error metadata

## How Saved Recipes Work
1. Frontend sends save action with normalized recipe payload
2. Backend/auth context resolves `user_id`
3. Upsert by unique constraint (`user_id`, `recipe_key`)
4. Return updated saved state
5. Saved page reads user-scoped records sorted by recency

## Recommendation Records (Optional)
If implemented in MVP, keep it lightweight:
- Store request inputs and summary outcome only
- Avoid storing full verbose AI output unless needed for diagnostics
- Use retention policy for log table to control growth

## Validation Responsibilities
### Client Validation
- UX-focused, immediate feedback
- Basic required/range checks

### Backend Validation (Source of Truth)
- Schema validate full request
- Reject malformed cuisine/servings
- Sanitize ingredient list before provider calls
- Reject unauthenticated generation/save requests
- Reject generation when user quota remaining is 0

## Data Flow Expectations
1. Client POST `/api/recommendations`
2. Server validates auth + payload + quota
3. Server queries Recipe API for candidates
4. Server sends candidates + request context to AI for ranking/adaptation
5. Server increments quota on successful generation
6. Server returns unified recommendation response + quota status
7. Client renders cards/detail
8. Client save action writes Supabase record (authenticated user scope)

Response contract guidance:
- Include enough compact metadata for Result cards (short description + chips)
- Include complete cooking payload for Detail screen (summary, ingredients, steps, substitutions)

## Practical MVP Backend Priorities
1. Reliable request validation and clear error contracts
2. Stable orchestration with timeout handling
3. Saved recipes persistence with RLS
4. Minimal observability (duration, provider failures)
5. Simple fallback strategy for provider outages
