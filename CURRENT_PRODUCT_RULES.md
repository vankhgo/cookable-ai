# Current Product Rules - Cookable AI

## Input Rules
- A generation request must include valid `ingredients`, `cuisine`, and `servings` payload fields.
- `ingredients` must contain at least 2 meaningful ingredient tokens.
- Requests with invalid payloads are rejected before API/AI calls.
- Generation requires an authenticated user identity.

## Ingredient Textarea Rules
- Accept freeform user text (comma/newline separated).
- Normalize whitespace and casing before processing.
- Ignore empty tokens after split/trim.
- Deduplicate identical ingredient tokens for matching logic.

## Cuisine Rules
- Cuisine uses controlled values plus `Any`.
- Unsupported cuisine values are rejected server-side.
- `Any` removes cuisine bias but keeps ingredient-first matching.

## Servings Rules
- Servings must be integer within MVP range `1-12`.
- Default servings is `2`.
- Serving value must be applied consistently to returned recipe quantities.

## Recommendation Rules
- Recommendations must prioritize ingredient fit first, then cuisine preference.
- System should return `3-6` recommendations when possible.
- Each recommendation must include core recipe fields and short rationale.
- Low-confidence outputs must not be presented as high-confidence matches.
- Results should include a compact context summary (input/cuisine/servings) and an edit/regenerate path.

## Save Recipe Rules
- Saving is user-scoped and persisted in Supabase.
- Uniqueness key: `user_id + recipe_key` (no duplicate favorites).
- Save/unsave actions must synchronize UI and persisted state.
- Unauthenticated save attempts must prompt sign-in and must not persist anonymously.

## Auth Rules
- Preferred sign-in method is Google OAuth.
- Magic link email sign-in is the fallback auth method.
- Saved recipes and quota usage are always tied to authenticated users.

## Quota Rules
- Each authenticated user receives `5` recipe generations per UTC day by default.
- Quota is checked before generation.
- Quota is incremented only after successful generation response.
- Quota resets lazily when `quota_reset_at` is not the current UTC day.
- When quota is exhausted, generation is blocked with a clear user-facing message.

## No-Strong-Match Fallback Rules
- If confidence below threshold, show fallback panel instead of forcing poor results.
- Fallback must provide practical next actions:
  - adjust cuisine to `Any`
  - add staple ingredients
  - modify ingredient list and regenerate

## Loading / Generation Rules
- One active generation request per input form at a time.
- UI must clearly indicate pending state.
- Pending state must always resolve into: success, fallback, or error.
- Loading copy should sound calm and practical, not robotic.

## Recipe Detail Rules
- Detail view must include:
  - short summary
  - cuisine
  - ingredients
  - step-by-step instructions
  - cook time
  - servings
  - "Why this works"
- Substitutions are optional and only shown when relevant.

## Navigation Rules
- MVP primary navigation includes only `Home` and `Saved`.
- Results and Recipe Detail are part of the cooking flow and may be route-based or in-page.

## Interaction Rules
- `Generate Recipes` is the primary high-emphasis CTA.
- Save interaction should use lightweight bookmark-style affordance and must not overpower primary cooking actions.

## MVP Simplification Rules
- No personalization engine beyond saved recipes.
- No nutritional optimization requirements in MVP.
- No multi-user sharing or social workflows.
- No grocery delivery integrations.

## Out-of-Scope Rules (Current)
- Chatbot conversation interface
- Recipe blogging/publishing CMS
- Marketplace and transaction flows
- Admin analytics dashboards beyond basic developer diagnostics
