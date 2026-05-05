# Next Product Pipeline

## Why a new pipeline
- Frontend polish pipeline `Phase 0` to `Phase 10` is complete.
- The app now has a coherent visual system, local demo product flow, and a canonical UI kit.
- The next workstream should move the project from polished demo to integrated product.

## Current baseline
- `npm run lint` passes
- `npm run test:run` passes
- `npm run build` passes after backend type generation
- Design system, feed direction, and showcase references are documented

## Parallel exploratory track
- `Agent Persona Social Layer`
- Concept doc: `tasks/agent-persona-social-layer.md`
- MVP path: `tasks/agent-persona-implementation-pipeline.md`
- Expanded roadmap: `tasks/agent-prechat-roadmap.md`
- Recommended approach:
  1. validate the frontend-only prototype
  2. test whether the mechanic feels delightful and understandable
  3. only then move into backend orchestration and LLM cost/safety work

## Phase A. API and session foundation

### Goal
- Replace local/demo auth flow assumptions with real backend-backed session behavior.

### Tasks
1. Wire HTTP auth to real backend contracts.
2. Confirm refresh/session lifecycle in app bootstrap.
3. Standardize unauthorized, expired-session, and logout behavior.
4. Add tests around auth bootstrap and session transitions.

## Phase B. Real data rollout

### Goal
- Replace mock product data with backend-driven models where contracts already exist.

### Tasks
1. Replace mock feed data with API-backed discovery data.
2. Replace local profile reads with backend profile source of truth.
3. Replace mock chat list and thread state with real message data where possible.
4. Keep local fallback/mocks only where backend endpoints do not exist yet.

## Phase C. Realtime and messaging readiness

### Goal
- Prepare the app for realtime messaging, presence, and signaling.

### Tasks
1. Introduce websocket/session attach flow.
2. Add presence and inbox subscriptions.
3. Prepare chat thread updates for realtime events.
4. Reserve clear boundaries for signaling and future WebRTC flows.

## Phase D. Reliability and production hardening

### Goal
- Reduce demo-only assumptions and make the app safer to evolve.

### Tasks
1. Expand route-level and feature-level smoke coverage.
2. Add error, empty, and loading states where backend data will arrive asynchronously.
3. Add offline/network-failure handling for key routes.
4. Audit persistence boundaries for localStorage-based state.

## Phase E. Documentation and agent maintenance

### Goal
- Keep the repo navigable for both engineers and coding agents.

### Tasks
1. Update `AGENTS.md` whenever architecture or workflow changes materially.
2. Keep `CLAUDE.md`, `CODEX.md`, and `GEMINI.md` as thin entrypoints to `AGENTS.md`.
3. Update `tasks/*.md` when a pipeline phase changes status or scope.
4. Promote reusable product patterns into `src/modules/ui-kit/showcase`.

## Working rules for the next pipeline
- Prefer real contracts over new mocks.
- Keep theme and UI kit consistency intact while integrating backend behavior.
- Do not collapse page logic into giant route files; preserve boundaries across `entities`, `features`, `widgets`, and `modules/ui-kit`.
- Validate each meaningful milestone with:
  - `npm run lint`
  - `npm run test:run`
  - `npm run build`
