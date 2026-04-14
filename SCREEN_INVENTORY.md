# Cookable AI — Screen Inventory

## 1. Purpose

This document lists the core screens, states, and major UI blocks required for the Cookable AI MVP.
It is intended to help designers and developers align on scope before implementation.

---

## 2. MVP Screen List

### Primary screens

1. Home / Input
2. Results
3. Recipe Detail
4. Saved Recipes

### Supporting states / views

5. Loading / Generating Recipes
6. Empty Saved Recipes
7. No Strong Match / Flexible Suggestions
8. Form Validation / Missing Input Feedback

---

## 3. Screen Breakdown

## 3.1 Home / Input

### Goal
Allow users to quickly enter ingredients and request recipe suggestions.

### Core blocks

1. Header / brand area
   - product name
   - short product value statement

2. Intro / hero copy
   - primary headline
   - supporting paragraph

3. Main input card
   - ingredient textarea
   - cuisine select
   - servings select
   - Generate Recipes CTA

4. Optional supporting highlights
   - ingredient-first benefit
   - AI-powered recommendation benefit
   - save-for-later benefit

### Required interactions

- type ingredients
- choose cuisine
- choose servings
- tap Generate Recipes

### Required states

- default empty state
- filled state
- validation state when ingredients are missing
- loading transition into Results

### Notes

This is the highest-priority screen in the product.
The ingredient textarea should be the main visual focus.

---

## 3.2 Results

### Goal
Show recipe suggestions that fit the user’s ingredients, cuisine, and serving size.

### Core blocks

1. Top summary / context bar
   - input summary
   - cuisine
   - servings
   - optional edit or regenerate action

2. Section heading
   - recommendation title
   - short supporting explanation

3. Recipe results grid/list
   - recipe cards

### Recipe card contents

- title
- short description
- cooking time
- cuisine
- servings
- why this works / why this fits snippet
- save action
- view details action

### Required interactions

- open recipe detail
- save recipe
- regenerate or edit input

### Required states

- standard populated results
- loading / skeleton state
- no strong match state

### Notes

Recipe results must be scannable and feel like product output, not content browsing.

---

## 3.3 Recipe Detail

### Goal
Help users understand and cook a chosen recipe with confidence.

### Core blocks

1. Header block
   - recipe title
   - short summary
   - save action

2. Metadata row
   - cuisine
   - cooking time
   - servings

3. Why this works block
   - explanation of why the recipe fits current ingredients / preferences

4. Ingredients section
   - structured ingredient list

5. Steps section
   - numbered cooking steps

6. Substitution notes section
   - optional replacements
   - flexible adjustments

7. Action area
   - save
   - go back
   - generate more ideas (optional)

### Required interactions

- save recipe
- go back to results
- read through ingredients and steps

### Required states

- default populated state
- long-content mobile state

### Notes

This screen should be calmer than Results and optimized for readability.

---

## 3.4 Saved Recipes

### Goal
Provide quick access to user-saved recipes.

### Core blocks

1. Page header
   - title
   - supporting text

2. Saved recipe list / cards
   - recipe title
   - cuisine
   - cooking time
   - servings
   - reopen action

### Required interactions

- open saved recipe
- view saved collection

### Required states

- populated saved state
- empty saved state

### Notes

This screen should feel lightweight and personal, not like a database.

---

## 3.5 Loading / Generating Recipes

### Goal
Communicate that the system is preparing relevant recipe suggestions.

### Core blocks

1. Loading headline or helper copy
2. Skeleton or placeholder recipe cards
3. Optional subtle animated status indicator

### Suggested copy

- Reviewing your ingredients...
- Matching recipes to your kitchen...
- Generating practical ideas...

### Notes

Loading should feel calm and intelligent, not robotic or over-animated.

---

## 3.6 Empty Saved Recipes

### Goal
Encourage users to save recipes for later.

### Core blocks

1. Empty state illustration or icon
2. Empty state title
3. Supporting text
4. Return-to-home CTA

### Suggested copy

- You have not saved any recipes yet.
- Save the recipes you would like to cook again.

---

## 3.7 No Strong Match / Flexible Suggestions

### Goal
Provide helpful fallback recommendations when ingredient fit is weak.

### Core blocks

1. Explanation banner or message
2. Flexible recipe suggestions
3. Optional input edit CTA

### Suggested copy

- We could not find a perfect direct match, but here are a few flexible ideas using most of your ingredients.

### Notes

This should not feel like an error page.
It should still feel useful.

---

## 3.8 Form Validation / Missing Input Feedback

### Goal
Prevent empty or invalid submissions without creating friction.

### Primary validation case

- user tries to generate recipes without entering ingredients

### Required feedback

- inline message near textarea
- clear but gentle wording

### Suggested copy

- Please enter at least a few ingredients to get recipe suggestions.

---

## 4. Component Inventory by Screen

## Home / Input

- heading
- paragraph
- textarea
- select
- button
- feature highlight card or bullet group

## Results

- context summary bar
- recipe cards
- metadata chips
- save button
- view details button

## Recipe Detail

- detail header
- metadata chips
- highlight block
- ingredient list items
- numbered step blocks
- substitution notes block
- save action

## Saved Recipes

- saved list card
- reopen button
- empty state card

## Shared states

- loading skeletons
- empty state messaging
- validation feedback

---

## 5. Screen Priority Order

### Highest priority

1. Home / Input
2. Results
3. Recipe Detail
4. Saved Recipes

### Secondary priority

5. Loading state
6. No strong match state
7. Empty saved state
8. Validation feedback

---

## 6. Recommended Development Order

To help implementation move efficiently, build in this order:

### Phase 1
- Home / Input
- shared form components
- CTA behavior

### Phase 2
- Results
- recipe card component
- metadata chips
- save interaction shell

### Phase 3
- Recipe Detail
- ingredient list section
- steps section
- substitution section

### Phase 4
- Saved Recipes
- empty saved state

### Phase 5
- loading state
- no-match state
- validation feedback
- motion polish

---

## 7. Responsive Inventory Notes

### Mobile

Required adaptations:
- single-column layout
- stacked form inputs
- single-column recipe cards
- detail sections in clear vertical order

### Desktop

Recommended adaptations:
- split home layout if helpful
- multi-column results grid
- split detail layout where readability improves

---

## 8. Scope Guardrails

Do not expand MVP screen inventory into:

- recipe community pages
- shopping cart flows
- grocery ordering
- social profiles
- chef dashboards
- conversational AI chat screens

MVP should stay focused on the ingredient-to-recipe journey.

---

## 9. Final Inventory Summary

Cookable AI MVP needs:

- 4 main screens
- 4 supporting states
- a small, reusable component system
- clear recipe recommendation flow
- lightweight save behavior

If implemented correctly, this screen set will cover the core user journey from:

**ingredients on hand**
→ **useful recipe suggestions**
→ **confident cooking**
→ **saved favorites**
