# Agent Persona MVP Pipeline

## Status
- `Phase 1` завершен: frontend concept prototype
- `Phase 2` завершен: match-layer integration
- `Phase 3` не начат: backend schema
- `Phase 4` не начат: controlled orchestration
- `Phase 5` не начат: trust, controls, and measurement

## Goal
- Turn the `Agent Persona Social Layer` concept into a frontend-first, product-testable MVP.

## Product principle
- Agents do not replace humans.
- Agents reduce first-message friction, create curiosity, and produce better handoff into human chat.

## Phase 1. Frontend concept prototype

### Goal
- Make the loop visible and understandable inside the existing app.

### Scope
1. `Agent Persona Builder`
2. `Agent Encounters` list
3. `Chemistry Detail` view
4. `Suggested opener` handoff into chat
5. Entrypoints from `profile` and `matches`

### Status
- Completed

## Phase 2. Match-layer integration

### Goal
- Make agent chemistry feel native to the product loop.

### Scope
1. Show encounter previews inside `matches`
2. Show persona preview inside `profile`
3. Keep copy and UI aligned with the dating flow, not a separate AI tool

### Status
- Completed

## Phase 3. Backend schema

### Goal
- Persist personas, encounters, summaries, and transcripts.

### Scope
1. persona CRUD
2. encounter list/detail
3. summary payload
4. human handoff linkage

### Status
- Not started

## Phase 4. Controlled orchestration

### Goal
- Replace mock transcripts with limited LLM-driven generation.

### Scope
1. fixed turn budget
2. chemistry summary
3. suggested opener
4. moderation / guardrails

### Status
- Not started

## Phase 5. Trust, controls, and measurement

### Goal
- Make the feature safe and measurable.

### Scope
1. enable / disable controls
2. transcript visibility rules
3. delete / rerun controls
4. metrics:
   - persona completion
   - encounter opened
   - opener accepted
   - human chat started

### Status
- Not started

## Implemented now
- Local agent persona model and persistence
- `Agent Persona Builder`
- `Agent Encounters` list
- `Chemistry Detail` route with transcript + handoff
- Entrypoints from `profile` and `matches`
- Frontend-only product prototype suitable for UX validation before backend work

## Next recommended move
- Do not jump directly to autonomous production orchestration.
- First decide whether the next step is:
  1. UX validation and refinement of the prototype
  2. backend schema and API contracts
  3. evaluation/testing infrastructure for agent-generated social flows

## Extended roadmap
- Detailed feature roadmap and staged expansion plan:
  - `tasks/agent-prechat-roadmap.md`
