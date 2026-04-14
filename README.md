# Cookable AI

Cookable AI is an ingredient-first, AI-powered recipe recommendation app that helps people decide what to cook using what they already have at home. Users enter available ingredients, choose a cuisine and servings, and get practical recipe suggestions with clear steps, timing, substitutions, and a short explanation of why each option fits.

## Problem Summary
Home cooks often face a daily gap between available ingredients and a confident meal decision. Existing recipe products usually start from a dish search, long-form content, or browsing feeds, which creates friction when the real question is: "What can I cook right now?"

## Why Ingredient-First Matters
- Starts from the user’s real kitchen constraints, not ideal shopping lists
- Reduces food waste by prioritizing on-hand ingredients
- Reduces decision fatigue by narrowing options quickly
- Delivers useful recommendations faster than generic recipe browsing

## Key Features
- Ingredient input via freeform textarea
- Cuisine preference and servings selection
- AI-assisted recipe recommendation generation
- Supabase Auth (Google sign-in preferred, magic link fallback)
- Per-user daily generation quota (default 5/day)
- Recipe cards with short description, cuisine, cooking time, servings, and "Why this works"
- Recipe detail view with steps, ingredient list, and "Why this works"
- Optional substitution suggestions
- Save favorite recipes to Supabase-backed user profile
- Fallback behavior when strong matches are unavailable

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- External Recipe API
- AI integration (embedded product intelligence)

## Document Index
### Existing Design Source of Truth
- `UI_UX_SPEC.md`
- `SCREEN_INVENTORY.md`
- `DESIGN_SYSTEM.md`

### Product + Delivery Docs
- `PRD.md`
- `ROADMAP.md`
- `FEATURE_SPEC.md`
- `TECH_SPEC.md`
- `CURRENT_PRODUCT_RULES.md`
- `BACKEND_HANDOFF.md`
- `SUPABASE_SCHEMA.md`
- `API_AI_SPEC.md`
- `FRONTEND_SCAFFOLD_PLAN.md`
- `TODO.md`

## MVP Scope
- Ingredient input + cuisine + servings capture
- Recommendation generation flow (Recipe API + AI layer)
- Results list with recipe cards
- Recipe detail page/view
- Save/unsave favorites
- Saved recipes page
- Core loading, validation, error, and no-strong-match states
- Responsive experience for mobile and desktop

## Out of Scope (MVP)
- Social features (comments, follows, sharing feeds)
- Grocery delivery/cart integrations
- Meal planning calendar
- Nutrition/medical diet compliance engine
- Voice interface
- Conversational chatbot mode
- Creator/blog content publishing workflows

## Local Setup (Summary)
1. Install dependencies: `npm install`
2. Copy env file: `cp .env.example .env.local`
3. Add required keys for Supabase, Recipe API, and AI provider
4. Run SQL setup in Supabase: `supabase/sql/2026-04-14-auth-quota-setup.sql`
5. In Supabase Auth, enable Google provider (preferred) and keep email magic link enabled as fallback
6. Add redirect URL: `http://localhost:3000/auth/callback`
7. Run app: `npm run dev`
8. Build check: `npm run build`

See `TECH_SPEC.md` and `SUPABASE_SCHEMA.md` for environment and schema details.

## Why This Project Is Interesting
Cookable AI sits at a practical intersection of UX, AI orchestration, and product strategy: it uses AI as embedded decision intelligence in a constrained consumer workflow, not as open-ended chat. That makes it a strong case study in building useful, trustworthy AI features around real user context.
