# Product Requirements Document (PRD) - Cookable AI

## Overview
Cookable AI is a consumer-facing cooking companion that recommends realistic meals based on ingredients users already have. The core experience is ingredient-first and recommendation-driven: users provide available ingredients, preferred cuisine, and servings, then receive AI-assisted recipe suggestions with actionable details.

## Problem Statement
Most home cooking tools assume users start with a desired dish. In reality, many users start with constraints: limited ingredients, limited time, and uncertainty about what is practical. This leads to wasted food, decision fatigue, and fallback to takeout.

Cookable AI solves this by converting available ingredients into practical, high-confidence meal options.

## User Pain Points
- "I have ingredients but don’t know what to make."
- Recipe search expects exact dish intent instead of current pantry context.
- Too many low-fit results create decision paralysis.
- Recipes often require missing ingredients without clear substitutions.
- Adapting servings manually is error-prone.

## Target Users
- Busy home cooks (students, professionals, parents)
- Budget-conscious users trying to reduce waste
- Beginner/intermediate cooks who need practical guidance
- Mobile-first users deciding meals in real time

## UX Direction (From Source-of-Truth Design Docs)
- UX tone must remain warm, calm, practical, and trustworthy.
- Ingredient input is the highest-priority interaction.
- Results must be scannable in seconds.
- Recipe Detail must optimize for cooking action, not content density.
- AI must be embedded in product output, not presented as chat.

## Information Architecture (MVP)
### Primary Screens
- Home / Input
- Results
- Recipe Detail
- Saved Recipes

### Supporting States
- Empty input state
- Loading / generating state
- No strong match / flexible suggestions state
- Empty saved recipes state

## Navigation Model (MVP)
- Primary navigation stays minimal: `Home`, `Saved`.
- Results and Recipe Detail are part of the core cooking flow, not persistent top-level nav.

## Jobs To Be Done
- When I have random ingredients, help me quickly decide what to cook.
- When I choose a cuisine mood, tailor options to that preference.
- When cooking for specific people, adapt recipe quantity to servings.
- When ingredients are missing, provide realistic substitutions.
- When I find a good recipe, let me save it for later reuse.

## Product Goals
- Deliver useful recipe recommendations from on-hand ingredients in <60 seconds for typical requests.
- Make each recommendation understandable and trustworthy via "Why this works".
- Provide enough detail to move from decision to cooking without leaving the product.
- Maintain a warm, modern, premium-but-approachable UX aligned with design docs.

## Non-Goals
- Becoming a recipe blog/content network
- Building marketplace or delivery workflows
- Building a chatbot-first product
- Supporting enterprise/admin-heavy workflows

## Core Use Cases
1. Quick dinner decision from pantry ingredients
2. Cuisine-constrained meal discovery
3. Serving-adjusted recipe generation for household size
4. Saving and revisiting favorite recipes
5. Recovering from weak-match scenarios with alternatives

## User Stories
- As a user, I can paste/type ingredients so I don’t need perfect formatting.
- As a user, I can select cuisine so results match my meal intent.
- As a user, I can set servings so quantities are useful immediately.
- As a user, I can generate recommendations and see results quickly.
- As a user, I can open a recipe and follow steps end-to-end.
- As a user, I can understand why a recipe was suggested.
- As a user, I can save recipes and access them later.
- As a user, I receive useful fallback guidance if no strong match exists.

## MVP Scope
### In Scope
- Input form: ingredients, cuisine, servings
- Generation pipeline: Recipe API baseline + AI refinement
- Recipe results list + detail view
- Save/unsave favorites with Supabase persistence
- Saved Recipes screen
- Core validation/loading/error/fallback states

### Out of Scope
- Shopping list automation
- Meal scheduling/calendar
- Social graph and sharing feed
- Ratings/reviews ecosystem
- Full nutrition optimization engine

## Success Metrics
### Product Metrics
- Recommendation generation success rate
- Time to first meaningful recommendation
- Recipe detail open rate from results
- Save rate from recipe detail/cards
- Return usage of Saved Recipes

### Quality Metrics
- % recommendations judged relevant (qualitative testing)
- % sessions hitting no-strong-match fallback
- API/AI failure recovery rate

### UX Metrics
- Input completion rate
- Form-to-results conversion rate
- Drop-off rate in loading/error states

## Risks
- Inconsistent Recipe API quality across cuisines
- AI output drift (overly complex or impractical suggestions)
- Slow response times due to multi-provider orchestration
- Weak fallback handling reduces trust
- Over-personalization complexity beyond MVP scope

## Future Evolution
- Pantry memory and ingredient history
- Dietary preference filters (vegetarian, halal, gluten-free)
- Meal prep mode and weekly planning
- Grocery suggestion add-on for missing items
- Personal taste learning from saved/ignored recipes
