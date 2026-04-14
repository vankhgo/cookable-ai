# API + AI Integration Specification - Cookable AI

## Purpose
Define how Recipe API and AI work together in one recommendation pipeline for an ingredient-first product flow.

## Design Principle
AI is embedded product intelligence that improves recommendation quality and usefulness. It is not exposed as an open-ended chatbot interaction.

## Responsibilities Split

## Recipe API Role
Recipe API provides structured baseline data:
- Candidate recipes by ingredient/cuisine signals
- Metadata (title, cook time, category, image, source)
- Canonical ingredient/instruction structures where available
- Stable identifiers used for dedupe/save operations

## AI Role
AI refines and adapts results for user context:
- Interpret freeform ingredient text into normalized concepts
- Evaluate best-fit recipes against available ingredients
- Rank/prioritize candidates by practical cookability
- Generate concise "Why this works" explanations
- Suggest substitution notes where gaps exist
- Adjust ingredient quantities/instructions for selected servings

## Orchestration Flow
1. Validate input (`ingredients`, `cuisine`, `servings`)
2. Parse/normalize ingredients
3. Query Recipe API for candidate set
4. Send candidate set + normalized user context to AI
5. Receive structured enriched recommendations
6. Return unified response to frontend

## Request Contract (Generation)
### Input
- `ingredients_raw: string`
- `cuisine: string`
- `servings: number`

### Internal Enriched Context
- `ingredients_normalized: string[]`
- `recipe_candidates: CandidateRecipe[]`

### Output
- `recommendations: Recommendation[]`
- `status: success | fallback | error`
- `fallback_reason` (when applicable)
- `provider_flags` (e.g., `api_only_mode`, `ai_enriched`)
- `input_context` (echo of normalized ingredients + cuisine + servings for Results summary bar)

## Response Expectations
Each recommendation should include:
- `recipe_key`
- `title`
- `short_description`
- `summary`
- `cuisine`
- `cook_time_minutes`
- `servings`
- `ingredients[]`
- `steps[]`
- `why_this_works`
- `substitutions[]` (optional)
- `confidence_score` (internal or hidden from UI)

## Fallback Strategy

## If Recipe API Fails
- Attempt constrained AI-only generation from user ingredients
- Return explicit `provider_flags.api_unavailable = true`
- Mark confidence as reduced
- Limit count (e.g., top 1-3) to avoid overpromising

## If AI Fails
- Return Recipe API-only candidates with minimal transformation
- Omit `why_this_works`/substitutions or provide template fallback copy
- Set `provider_flags.ai_unavailable = true`

## If Both Fail
- Return `status = error` with actionable retry guidance
- Do not fabricate recommendations

## MVP Guarantees
- Validation and deterministic error handling always run
- At least one non-crashing fallback path exists for single-provider failure
- Saved recipe functionality works independently of generation telemetry

## Prompt and Output Shaping Guidance
- Use strict system instructions for JSON-only output
- Provide explicit schema and allowed value ranges
- Include practical constraints:
  - avoid exotic ingredients unless already provided
  - keep steps concise and realistic
  - prioritize recipes with highest ingredient overlap
- Enforce parser-level schema checks; reject and retry once on invalid format

## Practical Architecture Guidance
- Keep orchestration server-side to protect API keys
- Use provider adapters:
  - `recipeApiClient.getCandidates()`
  - `aiClient.enrichRecommendations()`
- Keep internal domain model stable even if provider changes
- Add timeout budget and circuit-breaker style fallback for each provider

## Observability Notes
Track per request:
- total generation duration
- API duration
- AI duration
- fallback mode used
- result count
- error class (if any)
