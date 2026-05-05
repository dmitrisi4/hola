# Hola Agent Guide

This is the canonical instruction file for repository agents.
If you are reading `CLAUDE.md`, `CODEX.md`, or `GEMINI.md`, follow this file.

## Product state
- Frontend app for a dating/social product.
- Current frontend pipeline `Phase 0` to `Phase 10` is complete.
- Design system and UI kit are established in `src/modules/ui-kit`.
- Feed redesign direction is documented in `tasks/feed-redesign-direction.md`.
- The completed frontend pipeline is documented in `tasks/frontend-fixes-pipeline.md`.
- The next delivery track is documented in `tasks/next-product-pipeline.md`.
- Agent-persona concept docs are:
  - `tasks/agent-persona-social-layer.md`
  - `tasks/agent-persona-implementation-pipeline.md`
- Testing pipeline doc:
  - `tasks/testing-pipeline.md`
- CI workflow:
  - `.github/workflows/frontend-ci.yml`

## Stack
- TanStack Start + React 19
- TanStack Router v1
- TanStack Query v5
- Vite 7
- Vitest + Testing Library
- CSS Modules
- Zod v4

## Source of truth
- UI kit and shared patterns: `src/modules/ui-kit`
- App shell and providers: `src/app`
- Product routes: `src/routes`
- Page entrypoints: `src/pages`
- Domain state and mock/demo flows: `src/entities`
- Current frontend planning/docs: `tasks/*.md`

## Working rules
- Do not edit `src/routeTree.gen.ts` manually.
- Prefer extending `src/modules/ui-kit` or its showcase before inventing page-local patterns.
- Keep pages thin. Domain and reusable UI logic should live in `entities`, `features`, `widgets`, or `modules/ui-kit`.
- Use CSS Modules. Do not introduce Tailwind or ad hoc styling systems.
- Preserve semantic theme tokens from `src/shared/styles/main.css`.
- Emotional accent is reserved for `like`, `match`, and momentum moments, not generic chrome.
- Before changing product direction, read:
  - `tasks/agent-persona-social-layer.md` for AI-driven social mechanics
  - `tasks/design-system-direction.md`
  - `tasks/design-tokens-v1.md`
  - `tasks/feed-redesign-direction.md`

## Validation checklist
- `npm run lint`
- `npm run test:run`
- `npm run test:e2e`
- `npm run build`
- `npm run verify`

Note:
- `npm run build` triggers backend type generation in `../backend`.

## Current next pipeline
- Move from polished demo frontend toward real integration and production readiness.
- Priorities:
  1. backend/API integration
  2. auth/session hardening
  3. real data replacing mocks
  4. chat/presence/signaling preparation
  5. broader test coverage

Read `tasks/next-product-pipeline.md` before starting new feature work.

## Agent-run testing
- Preferred test stack:
  - `Vitest` for unit/integration
  - `Playwright` for e2e
- E2E should use seeded local state where possible instead of fragile manual setup.
- For guarded routes in local e2e, localStorage seeding plus `VITE_E2E_BOOTSTRAP=1` in the Playwright build/preview path is acceptable.
- Keep first e2e flows focused on product-critical loops, not visual exhaustiveness.
- Frontend CI uses committed backend type snapshots in `types/backend` when a sibling `../backend` checkout is unavailable.
