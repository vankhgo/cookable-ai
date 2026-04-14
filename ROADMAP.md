# Roadmap - Cookable AI

## Phase 0 - Planning and Alignment
### Goals
- Lock MVP scope and user journey
- Align product, UX, and technical decisions to design source-of-truth docs

### Deliverables
- Finalized PRD, feature spec, tech spec, and rules docs
- Initial Supabase schema and integration plan
- API + AI orchestration spec

### Included
- Documentation baseline
- Architecture and data model decisions
- Risk and dependency mapping

### Deferred
- Implementation of non-MVP expansion features

### Dependencies
- Approved design documents (`UI_UX_SPEC.md`, `SCREEN_INVENTORY.md`, `DESIGN_SYSTEM.md`)

### Exit Criteria
- Team alignment on scope, architecture, and implementation sequence

---

## Phase 1 - Input Flow + App Shell
### Goals
- Deliver usable app frame and ingredient-first entry experience

### Deliverables
- Next.js app shell with minimal primary navigation (`Home`, `Saved`)
- Input form: ingredients textarea, cuisine selector, servings control
- Validation and disabled/active CTA behavior

### Included
- Responsive layout foundations
- Form state management and input validation

### Deferred
- Real recommendation generation integration

### Dependencies
- Component tokens/patterns from design system
- UI screen definitions from screen inventory

### Exit Criteria
- Users can complete valid input flow and trigger generation intent

---

## Phase 2 - AI/API Result Generation Flow
### Goals
- Turn validated input into recommendation results reliably

### Deliverables
- Backend route/handler for generation orchestration
- Recipe API integration for structured candidates
- AI layer for ranking/adaptation/explanations/substitutions
- Loading/error/fallback states
- Results context summary bar with edit/regenerate actions

### Included
- Request/response contracts
- Observability basics (timing, failure classification)

### Deferred
- Personalization learning loops
### Dependencies
- Recipe API credentials
- AI provider credentials
- Stable form payload contract

### Exit Criteria
- End-to-end generation produces practical recipe cards for typical inputs

---

## Phase 3 - Recipe Detail + Saved Recipes
### Goals
- Move from recommendation browsing to repeatable utility

### Deliverables
- Recipe detail view with steps, time, ingredients, "Why this works"
- Save/unsave interaction
- Saved Recipes page backed by Supabase

### Included
- Auth-ready data model for saved recipes
- Persisted favorites and retrieval

### Deferred
- Advanced collection management (folders/tags)

### Dependencies
- Supabase table creation + RLS policy baseline
- Stable recipe identifier strategy

### Exit Criteria
- Users can save and revisit recipes across sessions

---

## Phase 4 - Polish and Portfolio Hardening
### Goals
- Increase reliability, UX polish, and demo readiness

### Deliverables
- UI polish aligned to design system
- Empty states and edge-case coverage
- Basic analytics hooks/events
- Testing pass for core flows

### Included
- Loading skeleton improvements
- Error copy refinement
- Mobile layout improvements
- Motion polish constrained to subtle hover/reveal/transition behavior

### Deferred
- Full-scale analytics warehouse

### Dependencies
- Core features complete (Phases 1-3)

### Exit Criteria
- Product is stable, coherent, and portfolio-ready

---

## Phase 5 - Future Expansion
### Goals
- Extend utility after MVP proves value

### Deliverables (Candidate)
- Dietary constraints
- Pantry memory
- Weekly planning
- Missing-ingredient shopping suggestions

### Included
- Discovery and prioritization experiments

### Deferred
- Social/community layer

### Dependencies
- MVP metrics and user feedback loops

### Exit Criteria
- Expansion priorities validated by usage and feedback data
