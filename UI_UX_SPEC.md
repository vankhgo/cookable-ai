# Cookable AI — UI / UX Spec

## 1. Product Summary

Cookable AI is an AI-powered, ingredient-first recipe recommendation app.
It helps users turn the ingredients they already have into realistic recipe suggestions.

The product is not a recipe blog, not a food marketplace, and not a chatbot-first interface.
It should behave like a smart kitchen companion that helps users move from available ingredients to a cookable meal with as little friction as possible.

Core product promise:

**Cook from what you already have.**

Secondary value proposition:

- reduce food waste
- reduce decision fatigue
- make home cooking feel easier
- surface practical recipes quickly

---

## 2. UX Principles

### 2.1 Core experience goals

The UX should feel:

- fast
- warm
- clear
- intelligent
- calm
- trustworthy
- practical

### 2.2 UX rules

1. **Ingredient input is the main event**  
   The most important action is entering available ingredients. This input should feel inviting and effortless.

2. **Results must be scannable in seconds**  
   Users should be able to understand recipe suggestions at a glance.

3. **Recipe detail must support action**  
   The detail page should help users cook, not overload them with content.

4. **AI should feel embedded, not chat-based**  
   The product should present AI through smart recommendation logic, not through a generic chatbot UI.

5. **Save flow should stay lightweight**  
   Saving recipes should be simple and non-disruptive.

---

## 3. Target Users

Primary users:

- home cooks
- busy users who want quick meal ideas
- users trying to use leftovers
- beginner to intermediate cooks
- users who want helpful structure without too much searching

The interface should feel approachable and consumer-friendly, not chef-professional.

---

## 4. Information Architecture

## Primary screens

1. Home / Input
2. Results
3. Recipe Detail
4. Saved Recipes

## Optional product states

- Empty input state
- Loading / AI generation state
- No strong match state
- Saved recipes empty state

---

## 5. Navigation Model

For MVP, keep navigation minimal.

Recommended primary navigation:

- Home
- Saved

Results and Recipe Detail can be part of the primary cooking flow rather than separate persistent nav items.

---

## 6. Core User Flow

1. User lands on Home / Input
2. User enters ingredients in a textarea
3. User selects cuisine
4. User selects servings
5. User taps **Generate Recipes**
6. System shows Results
7. User opens a recipe detail
8. User optionally saves the recipe
9. User revisits recipe later in Saved Recipes

---

## 7. Screen-Level UX Requirements

## 7.1 Home / Input Screen

### Purpose

Help users begin quickly with the least possible friction.

### Required elements

- page header / product intro
- main headline
- supporting copy
- ingredient textarea
- cuisine select
- servings select
- primary CTA: **Generate Recipes**
- optional small supporting feature notes

### UX requirements

- Ingredient textarea must have visual priority.
- Users should understand what to type without needing extra explanation.
- Cuisine and servings should feel secondary but still easy to interact with.
- The page should feel warm, uncluttered, and welcoming.
- Primary CTA should be obvious and high confidence.

### Suggested content behavior

- Placeholder example in textarea
- Small helper text under textarea
- Clear CTA label

---

## 7.2 Results Screen

### Purpose

Present recipe suggestions in a way that is fast to scan and easy to compare.

### Required elements

- top context summary
- list or grid of recipe cards
- ability to save a recipe
- ability to open recipe detail
- optional edit / regenerate action

### Recipe card contents

Each recipe card should show:

- recipe title
- short description
- cuisine
- cooking time
- servings
- short **Why this works** or **Why this fits** note
- save action
- view details action

### UX requirements

- Results should feel practical, not article-like.
- Cards should prioritize scan speed.
- Metadata should be visually compact and easy to parse.
- “Why this works” should build confidence in the recommendation.
- Results should feel like product output, not like search engine results.

---

## 7.3 Recipe Detail Screen

### Purpose

Help the user confidently cook the selected recipe.

### Required elements

- recipe title
- short summary
- cuisine
- cooking time
- servings
- save action
- Why this works section
- ingredients section
- steps section
- substitution notes section

### UX requirements

- The hierarchy must separate overview, ingredients, and steps clearly.
- Step content must be easy to read while cooking.
- Avoid long, dense paragraphs.
- Substitutions should feel helpful and optional.
- This screen should feel calmer and more focused than Results.

---

## 7.4 Saved Recipes Screen

### Purpose

Provide lightweight access to previously saved recipes.

### Required elements

- page title
- saved recipe list or card list
- recipe title
- cuisine
- cooking time
- servings
- reopen action

### UX requirements

- This page should feel like a personal collection.
- Quick scan should be prioritized over deep metadata.
- Empty state must encourage saving without feeling punitive.

---

## 8. AI UX Behavior

AI should appear through product intelligence, not through conversational UI.

### Valid AI surfaces

- smart recipe recommendations
- why this fits / why this works explanations
- serving-aware adjustments
- substitution suggestions
- loading copy

### Avoid

- chat bubbles
- assistant conversation layout
- long AI explanation blocks
- generic bot identity UI

---

## 9. Interaction Patterns

### Primary CTA

- High emphasis
- Brown-filled button
- Used for “Generate Recipes” and major forward actions

### Secondary CTA

- Outline or soft-filled treatment
- Used for reopen, edit, save alternatives, etc.

### Save action

- Bookmark-style action preferred
- Should not visually overpower core flow

### Motion

Allowed:

- subtle card hover lift
- gentle content reveal
- smooth state transitions
- soft button hover feedback

Avoid:

- flashy animation
- large movement
- playful motion that breaks calm product tone

---

## 10. Empty, Loading, and Edge States

## 10.1 Empty input state

Goal: encourage first action.

Suggested tone:

- “Start with a few ingredients you already have.”

## 10.2 Loading / generation state

Goal: show intelligence without feeling robotic.

Suggested loading copy:

- “Reviewing your ingredients...”
- “Matching recipes to your kitchen...”
- “Generating practical ideas...”

## 10.3 No strong match state

Goal: preserve usefulness instead of failing hard.

Suggested tone:

- “We could not find a perfect direct match, but here are a few flexible ideas using most of your ingredients.”

## 10.4 Saved empty state

Suggested tone:

- “You have not saved any recipes yet. Save the ones you would like to cook again.”

---

## 11. Accessibility and Usability Notes

- Form controls must have labels.
- CTA buttons must maintain strong contrast.
- Metadata chips must remain readable.
- Step content on Recipe Detail should use comfortable line lengths.
- All interactive elements should have clear hover and focus states.
- Mobile layouts must preserve readability and spacing.

---

## 12. Responsive Behavior

### Mobile

- Home form stacks vertically
- Results cards become single-column
- Recipe detail sections stack in reading order
- Saved list becomes compact vertical list

### Tablet

- Two-column layouts where useful
- Results grid can become 2-up

### Desktop

- Home can use split layout
- Results can use 3-column card grid if content density allows
- Recipe detail can use overview left / content right pattern

---

## 13. Success Criteria

The UX is successful when users feel:

- “This is easy to use.”
- “I quickly understand what I can cook.”
- “These suggestions feel trustworthy.”
- “This feels smarter than a normal recipe site.”
- “Saving useful recipes is effortless.”

---

## 14. MVP Scope Reminder

In MVP, focus on:

- ingredient input
- cuisine selection
- servings selection
- recipe recommendations
- recipe detail
- saved recipes

Do not overbuild:

- social systems
- chat-style AI
- grocery marketplace features
- content-heavy blog experiences
- advanced chef tooling

---

## 15. Implementation Intent

This specification is intended to guide front-end development in a modern product stack using:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- recipe API integration
- AI recommendation logic

The implementation should preserve warmth, clarity, and practicality across the full product flow.
