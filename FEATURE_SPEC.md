# Feature Specification - Cookable AI

## 1) Ingredient Input Textarea
### Description
Primary freeform text input for users to enter ingredients they currently have.

### User Goal
Quickly provide available ingredients without strict formatting.

### Fields / Controls
- `ingredients_textarea` (required)
- Placeholder examples (e.g., "eggs, spinach, onion, rice")

### Behavior
- Accept comma-separated or line-separated input
- Trim whitespace
- Normalize casing for backend payload
- CTA remains disabled until minimum valid input reached

### Acceptance Criteria
- User can submit with at least 2 meaningful ingredients
- Empty/invalid input shows inline validation message
- Input retains value if request fails

### Edge Cases
- Duplicate ingredients
- Excess punctuation
- Very long input (>1000 chars)

---

## 2) Cuisine Selection
### Description
Required control for desired cuisine profile.

### User Goal
Bias recommendations toward preferred style/flavor profile.

### Fields / Controls
- `cuisine` select (e.g., Any, Italian, Asian, Mexican, Indian, etc.)

### Behavior
- Defaults to `Any` if unspecified
- Sent as structured field in generation request

### Acceptance Criteria
- Selected cuisine visible in UI state
- Generation payload includes cuisine value

### Edge Cases
- Unsupported cuisine value returned from client tampering (server validates)

---

## 3) Servings Selection
### Description
Numeric selector defining target serving size.

### User Goal
Receive quantities that match household needs.

### Fields / Controls
- `servings` stepper/select (min 1, max 12 for MVP)

### Behavior
- Defaults to 2 servings
- AI adjusts ingredient amounts and instructions accordingly

### Acceptance Criteria
- Invalid values blocked client-side and server-side
- Displayed values are consistent across result cards and detail view

### Edge Cases
- Non-integer values from malformed request
- Very large value requests clipped/rejected

---

## 4) Generate Recipes CTA
### Description
Primary action button initiating recommendation generation.

### User Goal
Trigger recipe recommendations from current inputs.

### Fields / Controls
- `Generate Recipes` button

### Behavior
- Disabled when required inputs invalid
- On click: start async generation state
- Prevent duplicate submissions while pending
- Visual treatment uses high-emphasis primary style (deep brown fill, high-contrast text)

### Acceptance Criteria
- One request per click while idle
- Button shows pending state text/spinner during generation

### Edge Cases
- Rapid repeated clicks
- Network timeout

---

## 5) Recipe Results
### Description
Results section listing recommended recipes derived from API+AI pipeline.

### User Goal
Compare practical options and choose a recipe quickly.

### Fields / Controls
- Top context summary bar (input summary + cuisine + servings)
- Results list/grid
- Edit input / Regenerate action
- Optional sort hint (best fit first)

### Behavior
- Show top N recommendations (MVP: 3-6)
- Include fit explanation snippets and key metadata
- Reveal fallback guidance when no strong match
- Keep output compact and product-like (not article/search style)

### Acceptance Criteria
- At least one result shown on successful match flow
- Results ordered by relevance/confidence

### Edge Cases
- Partial results when one provider fails

---

## 6) Recipe Cards
### Description
Compact cards representing each recommendation.

### User Goal
Scan options quickly before opening details.

### Fields / Controls
- Title
- Short description
- Cuisine
- Estimated cook time
- Servings
- "Why this works" short snippet
- Save action
- Open detail action

### Behavior
- Card click opens detail
- Save toggle updates persistent state (auth-aware)

### Acceptance Criteria
- Card data matches backend response
- Save state reflects persisted truth after refresh

### Edge Cases
- Missing image/time metadata from API

---

## 7) Recipe Detail
### Description
Expanded view with full cooking instructions and rationale.

### User Goal
Cook confidently without leaving the app.

### Fields / Controls
- Title
- Short summary
- Cuisine
- Full ingredient list
- Step-by-step instructions
- Time estimate
- Servings
- "Why this works"
- Substitution notes
- Save/unsave

### Behavior
- Loads from selected recommendation payload (plus hydrate if needed)
- Keeps output practical and concise

### Acceptance Criteria
- Users can complete recipe from detail view content
- Substitution notes appear only when relevant

### Edge Cases
- Missing instructions fields from API source

---

## 8) Save Recipe Flow
### Description
Persist recipe to user favorites in Supabase.

### User Goal
Keep useful recipes for future cooking.

### Fields / Controls
- Save icon/button on cards and detail

### Behavior
- Requires authenticated user (or defers until auth strategy defined)
- Upsert by user_id + recipe_key
- Immediate optimistic UI with rollback on failure
- Save affordance should be lightweight bookmark-style and must not overpower the primary cooking actions

### Acceptance Criteria
- Saved recipe appears in Saved Recipes page
- Duplicate save attempts do not create duplicates

### Edge Cases
- Save attempted while offline
- User session expires mid-action

---

## 9) Saved Recipes Page
### Description
Dedicated view of previously saved recipes.

### User Goal
Revisit trusted meals quickly.

### Fields / Controls
- Saved recipe list/cards
- Remove/unsave action
- Reopen action
- Empty state guidance

### Behavior
- Query user-scoped saved records from Supabase
- Sort by most recently saved

### Acceptance Criteria
- Persisted records render correctly on reload
- Empty state shown when none saved

### Edge Cases
- Large saved list pagination (deferred; MVP can cap initial count)

---

## 10) Loading / Generation State
### Description
System feedback while recommendations are being generated.

### User Goal
Understand that request is in progress and avoid duplicate actions.

### Fields / Controls
- CTA pending state
- Optional skeleton cards/progress copy

### Behavior
- Enter pending on submit
- Exit pending on success/failure/timeout
- Loading copy should stay calm and practical (e.g., "Reviewing your ingredients...", "Matching recipes to your kitchen...")

### Acceptance Criteria
- No duplicate concurrent generation from same form state
- Clear transition to results or error state

### Edge Cases
- Slow third-party API causing extended wait

---

## 11) No Strong Match Fallback State
### Description
Fallback when system cannot confidently recommend a high-fit recipe.

### User Goal
Stay unblocked and receive actionable next steps.

### Fields / Controls
- Fallback panel with suggestions
- Optional "Try again" CTA

### Behavior
- Explain mismatch briefly (e.g., ingredient-cuisine conflict)
- Suggest modifications: add 1-2 staples, switch cuisine to `Any`, reduce constraints
- Present flexible suggestions as a useful fallback, not an error page

### Acceptance Criteria
- User is given at least one concrete next action
- System avoids fabricated low-confidence recipes presented as high-confidence

### Edge Cases
- Both API and AI unavailable

---

## 12) Validation Behavior
### Description
Input and request validation across client and server boundaries.

### User Goal
Receive clear, fast correction guidance before generation.

### Fields / Controls
- Inline field-level messages
- Top-level form error area for server-side failures

### Behavior
- Client validation for immediate feedback
- Server validation as source of truth
- Sanitize text input and enforce enum/range constraints
- Missing-ingredients validation copy should be clear and gentle (e.g., "Please enter at least a few ingredients to get recipe suggestions.")

### Acceptance Criteria
- Invalid submissions are blocked before provider calls
- User-facing error copy is actionable and non-technical

### Edge Cases
- Malformed payload via manual API calls
