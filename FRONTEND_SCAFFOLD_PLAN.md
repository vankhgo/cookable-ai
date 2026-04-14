# Frontend Scaffold Plan - Cookable AI

## Objective
Define a practical implementation scaffold aligned with the ingredient-first flow and approved design direction.

## Route Structure (Next.js)
- `/` Home (input + generation + results flow)
- `/saved` Saved recipes list
- `/recipe/[id]` Recipe detail route (if not using in-place panel/modal)
- `/api/recommendations` Server endpoint for generation
- `/api/saved` Save/unsave/list endpoint (or server action equivalent)

Navigation model:
- Primary nav should remain minimal: `Home`, `Saved`
- Results and Recipe Detail remain part of the cooking flow

## Component Boundaries
### Page-Level
- `HomePageShell`
- `SavedRecipesPage`
- `RecipeDetailPage` (optional dedicated route)

### Feature Components
- `IngredientInputForm`
- `CuisineSelect`
- `ServingsSelector`
- `GenerateRecipesButton`
- `RecommendationResults`
- `ResultsContextSummaryBar`
- `RecipeCard`
- `RecipeDetailView`
- `MetadataChip`
- `HighlightBlock`
- `StepListItem`
- `SaveRecipeButton`
- `NoStrongMatchState`
- `GenerationLoadingState`

### Shared UI Components
- `SectionHeader`
- `EmptyState`
- `ErrorState`
- `LoadingSkeleton`
- shadcn/ui primitives (`Button`, `Input`, `Textarea`, `Select`, `Card`, `Badge`)

## Input Flow Organization
- Feature folder: `features/ingredients`
- Responsibilities:
  - form schema
  - normalization helpers
  - submit handler integration
  - inline validation UX

## Recipe Results + Detail Organization
- Feature folder: `features/recommendations`
- Responsibilities:
  - result mapping from API contract
  - card rendering
  - detail panel/page rendering
  - fallback state decisions

## Saved Recipes Organization
- Feature folder: `features/saved`
- Responsibilities:
  - save/unsave mutation hooks
  - saved list query hook
  - empty/error/loading states

## Hooks Organization
- `useRecommendationGenerator`
- `useSavedRecipes`
- `useSaveRecipeToggle`
- `useRecommendationStateMachine` (optional for explicit UI state transitions)

## Service Layer Organization
- `services/recommendations.ts` (frontend caller to `/api/recommendations`)
- `services/saved-recipes.ts` (frontend caller for persistence actions)
- `services/mappers.ts` (normalize server response to view models)

## Design Token Mapping (Tailwind)
- Map semantic tokens from `DESIGN_SYSTEM.md` into CSS variables:
  - primary CTA brown `#5B3A29`
  - warm surfaces `#FAF6F1`, `#FFFDF9`
  - border chips `#E7D8C9`, `#B08968`
  - primary text `#2E211B`
- Enforce radius scale: inputs/buttons `18-24px`, cards `24-30px`

## Suggested Folder Layout
- `app/`
- `components/`
- `features/ingredients/`
- `features/recommendations/`
- `features/saved/`
- `services/`
- `lib/types/`
- `lib/validation/`

## Implementation Order
1. App shell + route placeholders
2. Ingredient form + validation
3. Generation endpoint integration and loading state
4. Results list + recipe cards
5. Recipe detail view
6. Save/unsave integration
7. Saved recipes page
8. No-strong-match/error polish
9. Responsive refinements + accessibility pass
