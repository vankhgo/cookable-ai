# Technical Specification - Cookable AI

## Architecture Overview
Cookable AI uses a Next.js TypeScript frontend with a server-side orchestration layer that combines structured Recipe API data and AI refinement before returning recommendation payloads to the UI.

High-level flow:
1. Client submits `ingredients + cuisine + servings`
2. Next.js server route validates request
3. Recipe API fetches candidate recipes/metadata
4. AI layer interprets ingredients, ranks/adapts candidates, generates rationale/substitutions
5. Unified response returned to frontend
6. User can save recipes to Supabase

## Stack
- Next.js (app routing + server handlers)
- TypeScript (strict typing across client/server contracts)
- Tailwind CSS (design token implementation)
- shadcn/ui (accessible UI primitives)
- Supabase (persistence + auth-ready user scoping)
- Recipe API (structured recipe baseline)
- AI provider (recommendation intelligence)

## Rationale
### Next.js
- Supports full-stack delivery in one codebase
- Server routes simplify secure API key handling
- Strong fit for portfolio-quality, production-like app architecture

### shadcn/ui + Tailwind
- Enables fast, consistent implementation of design system direction
- Easy composition of accessible controls and responsive layouts

### Supabase
- Minimal backend overhead for persisted user data
- Postgres + RLS model aligns with consumer app favorites use case

## App Structure (Proposed)
- `app/` routes, layout, and server endpoints
- `features/ingredients/` input flow UI + validation helpers
- `features/recommendations/` results/cards/detail adapters
- `features/saved/` favorites UI + data hooks
- `services/recipe-api/` provider client and mapping
- `services/ai/` prompt/output shaping and parsing
- `services/supabase/` persistence operations
- `lib/validation/` zod schemas for request/response contracts
- `lib/types/` shared domain types

## Routing Strategy
- `/` Home: ingredient input + recommendations flow
- `/saved` Saved Recipes
- `/recipe/[id]` optional dedicated detail route (or modal/sheet pattern based on design docs)
- `/api/recommendations` generation orchestration endpoint
- `/api/saved` save/unsave/list handlers (or server actions)

Navigation rule:
- Primary persistent navigation should stay minimal (`Home`, `Saved`).
- Results and Recipe Detail are flow screens, not required persistent nav tabs.

## Component Organization
- Shared primitives from `components/ui/*`
- Domain components grouped by feature:
  - `IngredientInputForm`
  - `ResultsContextSummaryBar`
  - `CuisineSelect`
  - `ServingsControl`
  - `GenerateButton`
  - `RecipeCard`
  - `RecipeDetailPanel`
  - `MetadataChip`
  - `HighlightBlock`
  - `StepListItem`
  - `FallbackState`
  - `SavedRecipeList`

## Design System Implementation Constraints
- Use semantic Tailwind tokens mapped to `DESIGN_SYSTEM.md` palette:
  - Primary CTA background: `#5B3A29`
  - Page/background surfaces: `#FAF6F1`, `#FFFDF9`
  - Borders/chips: `#E7D8C9`, `#B08968`
  - Body text: `#2E211B`
- Preserve soft geometry and warmth:
  - Inputs/buttons radius: ~18px to 24px
  - Cards radius: ~24px to 30px
- Keep motion subtle:
  - small hover lift, soft reveal, smooth transitions
  - avoid aggressive animation and chatbot-like effects

## State Management Approach
- Local component state for form controls and display toggles
- Server state via React Query/SWR or route-loader pattern for generation + saved records
- Keep global state minimal; prefer feature-local hooks

## Form Handling Approach
- `react-hook-form` + zod resolver (recommended)
- Controlled/semicontrolled components aligned with shadcn patterns
- Submit lock while generation is pending

## Validation Strategy
- Client: immediate UX validation (required fields, range checks)
- Server: strict schema validation as source-of-truth
- Sanitization:
  - Normalize ingredient text
  - Enforce cuisine enum
  - Enforce servings bounds (1-12 MVP)

## AI Integration Strategy
- AI is used as embedded recommendation intelligence, not chat interface
- Responsibilities:
  - Parse ingredient text into usable ingredient concepts
  - Rank or adapt recipe candidates for fit
  - Generate concise "Why this works"
  - Suggest substitutions only where needed
  - Adjust quantities/instructions for servings
- Use structured output schema (JSON) to reduce hallucination risk

## Recipe API Integration Strategy
- Recipe API provides structured baseline:
  - candidate recipes
  - metadata (time, category, optional image)
  - canonical ingredient/instruction fields where available
- API output is normalized into internal candidate model before AI refinement

## Supabase Integration Strategy
- Persist user saved recipes (`saved_recipes`)
- Optional logging table for generation requests (`recommendation_requests`) to improve diagnostics
- RLS policies enforce user-scoped data access

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `RECIPE_API_BASE_URL`
- `RECIPE_API_KEY`
- `AI_API_KEY`
- `AI_MODEL`

## Loading / Error / Fallback Behavior
- Loading: disable submit + show progress skeleton
- Loading copy style should be calm and practical (e.g., "Reviewing your ingredients...")
- Error: actionable message with retry
- No-strong-match: guided fallback actions instead of low-confidence output
- Partial provider failure:
  - If AI fails, return API-only baseline with reduced enrichment flags
  - If API fails, optionally generate constrained AI suggestions with clear confidence downgrade

## Responsiveness Guidance
- Mobile-first layout for input and recipe cards
- Sticky primary CTA behavior where appropriate
- Recipe detail should remain readable with clear step spacing and touch-friendly controls

## Future Extensibility
- Add dietary filters with minimal contract changes
- Add pantry memory without changing core generation path
- Add analytics instrumentation for recommendation quality tuning
- Add provider abstraction to swap Recipe API or AI model vendors
