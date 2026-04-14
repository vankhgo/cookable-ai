# Cookable AI Implementation TODO

## Setup
- [ ] Review and freeze `UI_UX_SPEC.md`, `SCREEN_INVENTORY.md`, `DESIGN_SYSTEM.md` as source-of-truth
- [ ] Configure `.env.local` with Supabase, Recipe API, and AI keys
- [ ] Verify local run (`npm run dev`) and build (`npm run build`)

## App Shell
- [ ] Implement base layout and navigation structure per screen inventory
- [ ] Keep primary nav minimal (`Home`, `Saved`), keep Results/Detail in flow
- [ ] Add reusable page sections and spacing system from design system
- [ ] Add global typography/color tokens in Tailwind config/globals

## Ingredient Input Flow
- [ ] Build ingredient textarea with helper text and validation messages
- [ ] Implement cuisine selector with supported options + `Any`
- [ ] Implement servings selector with MVP bounds
- [ ] Wire `Generate Recipes` CTA enable/disable logic

## Recipe Generation Flow
- [ ] Implement `/api/recommendations` request contract
- [ ] Add client submit handler and request state management
- [ ] Build Results context summary bar (ingredients/cuisine/servings + edit/regenerate)
- [ ] Render recommendation list from response model
- [ ] Add result ordering and confidence-aware display rules

## Recipe Detail
- [ ] Build recipe detail UI (title, short summary, cuisine, ingredients, steps, cook time, servings)
- [ ] Add "Why this works" and substitutions sections
- [ ] Ensure card-to-detail data consistency

## Save Recipe Flow
- [ ] Add save/unsave action on recipe cards
- [ ] Add save/unsave action on recipe detail
- [ ] Implement optimistic UI with failure rollback

## Supabase Setup
- [ ] Create `saved_recipes` table with constraints/indexes
- [ ] Enable RLS and create user-scoped policies
- [ ] (Optional) Create `recommendation_requests` table for diagnostics

## Recipe API Integration
- [ ] Implement provider client and response normalization
- [ ] Add timeout/error handling for provider calls
- [ ] Add metadata mapping (time, image, category)

## AI Integration
- [ ] Implement AI adapter with strict structured output schema
- [ ] Add prompt constraints for practical, ingredient-first output
- [ ] Implement retry-on-invalid-JSON handling
- [ ] Add fallback behavior for AI outages

## Loading and Fallback States
- [ ] Add generation loading UI and duplicate-submit prevention
- [ ] Add calm loading copy ("Reviewing your ingredients...", "Matching recipes to your kitchen...")
- [ ] Implement no-strong-match fallback panel with practical actions
- [ ] Implement user-friendly error states for API/AI failures

## UI Polish
- [ ] Apply design-system color tokens (Deep Brown/Cream/Warm White) to core surfaces and CTAs
- [ ] Apply radius system (inputs/buttons 18-24px, cards 24-30px)
- [ ] Refine mobile spacing and touch targets
- [ ] Add skeleton/empty states for results and saved pages
- [ ] Validate accessibility basics (labels, focus order, contrast)

## Testing
- [ ] Unit test validation and normalization logic
- [ ] Integration test generation endpoint success/failure paths
- [ ] Integration test save/unsave and saved list retrieval
- [ ] Run lint/build and manual QA on key screens

## Portfolio Readiness
- [ ] Capture product screenshots/gif of core flow
- [ ] Finalize README with architecture diagram and feature narrative
- [ ] Add implementation notes and trade-off discussion
- [ ] Prepare short demo script (input -> results -> save -> revisit)
