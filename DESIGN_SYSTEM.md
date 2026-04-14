# Cookable AI — Design System

## 1. Design System Goal

This design system defines the visual and component language for Cookable AI.
It should help the product feel:

- warm
- modern
- clean
- intelligent
- inviting
- premium, but approachable

The system should support a cooking product with strong kitchen warmth while remaining minimal and implementation-friendly.

---

## 2. Brand / Product Mood

Cookable AI should feel like a blend of:

- a calm kitchen companion
- a modern consumer app
- an ingredient-first smart recommendation product

It should not feel like:

- an admin dashboard
- a recipe blog
- a food marketplace
- a delivery app
- a chatbot shell

---

## 3. Color System

## 3.1 Core palette

### Primary
- Deep Brown: `#5B3A29`
- Cocoa Brown: `#6F4A36`

### Secondary
- Light Brown: `#B08968`
- Warm Taupe: `#A98B73`

### Background / Surface
- Cream: `#FAF6F1`
- Warm Off-white: `#F5EFE7`
- Soft Sand: `#E9DED2`
- Warm White: `#FFFDF9`

### Accent
- Sage Accent: `#8FA27A`
- Muted Terracotta: `#C97B63`

### Text
- Primary Text: `#2E211B`
- Secondary Text: `#6B5B52`
- Muted Text: `#8A7668`
- Light Text on dark surfaces: `#FFF9F4`

### Border
- Light Border: `#E7D8C9`
- Secondary Border: `#D8C8B7`

---

## 3.2 Color usage rules

### Use Deep Brown for

- primary CTA buttons
- major emphasis actions
- numeric badges when emphasis is needed
- dark product cards or premium highlight areas

### Use Cream / Warm White for

- page backgrounds
- main cards
- recipe surfaces
- high-readability content blocks

### Use Light Brown / Taupe for

- borders
- pill backgrounds
- subtle metadata highlights
- section dividers

### Use Sage / Terracotta sparingly for

- supportive accents
- smart fit / substitution emphasis
- highlights that should feel organic

### Avoid

- bright saturated red/orange
- cool blue-heavy UI
- too many accent colors competing at once

---

## 4. Typography

## 4.1 Typography principles

Typography should feel:

- clean
- warm
- readable
- modern
- calm

Avoid:

- decorative script fonts
- overly futuristic geometric styling
- overly editorial food-magazine styling

## 4.2 Type hierarchy

### H1
Use for hero or key page headline.

Characteristics:
- strong weight
- tight tracking
- premium feel
- clear 2-line layout when appropriate

### H2
Use for screen section titles.

Characteristics:
- clear hierarchy
- calmer than H1
- easy to scan

### H3
Use for card titles and subsection titles.

Characteristics:
- compact
- strong enough for scanning

### Body
Use for instructions, descriptions, steps.

Characteristics:
- readable
- moderate line height
- neutral and non-technical tone

### Helper text
Use for form guidance and secondary explanations.

Characteristics:
- lighter weight
- soft contrast
- not too faint

---

## 5. Layout Rules

## 5.1 Spacing principles

Use generous spacing to preserve calm.

Priorities:
- strong grouping around input areas
- comfortable breathing room between sections
- easy scan rhythm within recipe cards
- clean separation between overview and details

## 5.2 Shape language

The product should use soft geometry.

Recommended radius range:
- small elements: 12px to 16px
- inputs / buttons: 18px to 24px
- cards: 24px to 30px
- feature / hero emphasis blocks: 30px to 34px

Avoid sharp or rigid corners.

---

## 5.3 Shadows

Shadows should be soft and restrained.

Use shadows to create:
- warmth
- layering
- premium consumer product feel

Avoid:
- hard, dark, dramatic shadows
- overly flat UI with no layering

---

## 6. Core Components

## 6.1 Buttons

### Primary button
Use for:
- Generate Recipes
- View details
- other forward / confirm actions

Style:
- deep brown background
- light text
- rounded corners
- soft hover darkening
- medium to large height

### Secondary button
Use for:
- alternate navigation
- reopen recipe
- secondary actions

Style:
- warm white or cream surface
- brown border or text emphasis
- rounded corners
- subtle hover fill

### Ghost button
Use for:
- lightweight save / secondary inline actions

Style:
- minimal background
- text-led emphasis
- subtle hover state

---

## 6.2 Textarea

This is the most important form component in the product.

Use for:
- ingredient entry

Style requirements:
- large rounded shape
- generous padding
- warm white background
- soft border
- readable placeholder
- strong but gentle focus state
- comfortable typing space

Behavior guidelines:
- placeholder should be an example ingredient list
- optional helper text below
- should feel like a friendly invitation, not a technical field

---

## 6.3 Select

Use for:
- cuisine
- servings

Style requirements:
- rounded corners
- warm white background
- clean border
- compact but comfortable height
- easy-to-read label

---

## 6.4 Input

Use for:
- future filters
- search
- optional smaller structured fields

Style requirements:
- visually aligned with select and textarea
- consistent border and radius language
- soft focus treatment

---

## 6.5 Recipe Card

Recipe card is a core product component.

### Required content zones

1. Title
2. Short description or fit summary
3. Metadata row
4. Why this works block
5. Actions row

### Style requirements

- warm light surface
- rounded corners
- subtle shadow
- clear visual hierarchy
- not too dense
- not blog-like

### Metadata items
Can include:
- cuisine
- cooking time
- servings

These should use pill or chip treatments.

---

## 6.6 Metadata Chip / Pill

Use for:
- cuisine
- time
- servings
- status markers

Style requirements:
- small rounded pill
- light brown / cream background
- brown text
- quiet but readable

Avoid visually loud tags.

---

## 6.7 Save Action

Use for:
- saving recipes

Recommended treatment:
- bookmark icon
- optional short label
- quiet placement in card header or action row

Save should feel easy, but not compete with the main cooking flow.

---

## 6.8 Highlight Block

Use for:
- Why this works
- Smart substitution
- recipe confidence notes

Style requirements:
- softer tinted block
- visually distinct from default card background
- compact heading
- readable explanation text

Recommended tones:
- warm sand
- light terracotta tint
- sage tint in moderation

---

## 6.9 Step List Item

Use for:
- cooking instructions

Style requirements:
- numbered structure
- strong spacing
- short readable lines
- optional soft background for each step
- number badge should be visually anchored

This component must support practical cooking use, not just reading.

---

## 7. Page Templates

## 7.1 Home / Input Template

Recommended layout:
- headline and intro
- main form card
- optional supporting explanatory cards or bullets

The ingredient textarea must be the visual focal point.

## 7.2 Results Template

Recommended layout:
- top input summary
- recipe results grid/list

Desktop:
- 2 or 3 column recipe layout

Mobile:
- 1 column

## 7.3 Recipe Detail Template

Recommended layout:
- top overview card
- ingredients section
- steps section
- substitutions section

Desktop can use split layout.
Mobile should stack sections.

## 7.4 Saved Template

Recommended layout:
- simple page intro
- card or list-based saved collection
- empty state if needed

---

## 8. Motion Guidelines

Motion should remain subtle and supportive.

Allowed:
- card hover lift
- soft fade in
- small content reveal
- smooth CTA transitions

Avoid:
- aggressive spring motion
- exaggerated bouncing
- over-animated AI effects
- distracting transitions

---

## 9. States

## 9.1 Hover state

Use:
- slightly elevated card
- subtle background shift
- stronger shadow by a small amount

## 9.2 Focus state

Use:
- visible but soft ring
- consistent across inputs and buttons
- accessible contrast

## 9.3 Disabled state

Use:
- reduced contrast
- preserved readability
- no confusing half-active styling

## 9.4 Loading state

Should feel calm and helpful.

Potential patterns:
- skeleton cards
- shimmer blocks
- simple warm-toned placeholders
- short helper copy

---

## 10. Empty States

Empty states should feel encouraging, not empty in a cold way.

### Empty input
- invite the user to enter ingredients

### Empty saved
- explain that saved recipes will appear here

### No direct match
- offer flexible suggestions instead of hard failure

---

## 11. Iconography

Icons should feel light, simple, and modern.

Recommended usage areas:
- cooking time
- save
- recipe category markers
- section highlights

Rules:
- use icons sparingly
- keep stroke weight visually balanced
- avoid overly playful food emojis as core UI

---

## 12. Content Tone Rules

Product copy should be:

- clear
- helpful
- calm
- warm
- concise
- practical

Avoid copy that is:

- robotic
- overexplaining
- too chef-expert
- too corporate
- too casual / gimmicky

---

## 13. Accessibility Guidance

- Ensure color contrast for brown-on-light surfaces is sufficient.
- Inputs and selects must have labels.
- Buttons must remain legible on warm backgrounds.
- Do not rely on color alone for meaning.
- Metadata chips must remain readable on mobile.
- Step numbers should remain visible and distinct.

---

## 14. Implementation Notes

This design system should be feasible in:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

Recommended implementation strategy:
- define semantic color tokens
- reuse shared card/button/input styles
- create recipe-focused reusable components early
- keep surfaces and spacing consistent across screens

---

## 15. Core Design System Summary

Cookable AI should visually feel like:

- a warm kitchen
- a modern product
- a premium but approachable consumer app
- an intelligent recipe assistant without chatbot UI

If the design system is working correctly, the product should feel:

- warmer than Runwise
- more culinary than performance-oriented
- minimal, but not cold
- polished, but not luxury-heavy
- practical, but still elegant
