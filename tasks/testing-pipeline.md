# Testing Pipeline

## Goal
- Build a serious, agent-runnable testing system that can validate the app end-to-end with minimal manual intervention.

## Principles
- Code-first automation before external test management.
- Deterministic local state and seeded fixtures before flaky UI setup.
- Agent should be able to run the full regression chain from one command.

## Current stack
- Unit/integration: `Vitest`
- DOM/component testing: `Testing Library`
- E2E: `Playwright`

## What "serious testing" means here
- One deterministic command chain that validates the repo from static checks to browser flow.
- Stable local fixtures that do not depend on live backend availability for frontend regression.
- Failure artifacts that an agent can inspect without asking a human to reproduce the issue first.
- Explicit phase ownership, so feature work and test work can move in parallel without degrading trust.

## Current commands
- `npm run lint`
- `npm run test:run`
- `npm run test:e2e`
- `npm run build`
- `npm run verify`

## Recommended test layers

### Layer 1. Static quality gate
- `eslint`
- `prettier check` when needed
- Type-level and import-order correctness
- Scope:
  - syntax and import drift
  - dead refs and unsafe edits
  - basic repo hygiene before expensive test runs

### Layer 2. Unit/integration
- domain models
- local persistence
- validation logic
- page-level smoke tests with mocked shell/router state
- Current targets:
  - auth/bootstrap helpers
  - demo social state
  - page render smoke for core routes
  - agent persona local model and handoff loop

### Layer 3. Route smoke / product integration
- key product routes render correctly
- key CTA flows remain connected
- local mocked product loops stay stable
- Recommended coverage:
  - `/feed`
  - `/matches`
  - `/profile`
  - `/settings`
  - `/agent-persona`
  - `/agents`

### Layer 4. E2E flows
- real browser
- local seeded state
- protected route access
- critical user journeys
- Current bootstrap model:
  - `hola_e2e_access_token` localStorage seed
  - `VITE_E2E_BOOTSTRAP=1` during build/preview for SSR guard bypass
  - localStorage seeding for demo social state
  - no dependency on live backend for MVP verification

## Initial serious e2e scope

### Flow A. Agent Persona MVP
1. seed auth + local demo state
2. open `/agent-persona`
3. edit persona
4. save persona
5. open `/agents`
6. open an encounter
7. validate chemistry summary + transcript
8. open human chat handoff

### Flow B. Core product smoke
1. open `/feed`
2. like a profile
3. open `/matches`
4. verify match list renders

### Flow C. Shell and route continuity
1. open protected app route
2. verify shell renders
3. move between major product surfaces
4. verify navigation and route-level state continuity

### Flow D. Profile and settings persistence
1. open `/profile/edit`
2. change a core field
3. save and return to `/profile`
4. verify updated profile state renders
5. open `/settings`
6. change discovery visibility
7. reset discovery filters
8. verify default persistence state

## Agent execution contract

### What an agent should do by default
1. run `npm run lint`
2. run `npm run test:run`
3. run `npm run test:e2e`
4. run `npm run build`
5. summarize failures by layer, not by raw terminal dump

### What an agent should inspect on failure
1. failing command
2. exact spec or file
3. whether failure is static, unit, route, or e2e
4. whether the issue is product logic, fixture drift, or environment/tooling
5. available artifacts:
   - Playwright trace
   - screenshot
   - HTML report

### When the agent should stop and ask
- When the flow requires live credentials or external services not represented locally.
- When backend behavior is under-specified and a frontend fixture would be misleading.
- When the only fix would weaken trust in the test rather than repair product behavior.

## Execution model for agents

### Default local verification
1. `npm run lint`
2. `npm run test:run`
3. `npm run test:e2e`
4. `npm run build`

### One-command gate
- `npm run verify`

## Fixture strategy
- Prefer localStorage seeding for MVP and demo flows.
- Keep auth/bootstrap fixtures explicit and documented.
- Avoid relying on live backend for frontend-only product validation.

### Seeded state currently used
- `hola_e2e_access_token`
- `hola_user_id`
- `hola_demo_social`

### Next fixture additions
- seeded chat thread state for handoff verification
- seeded profile/persona variants for compatibility edge cases
- shared helper utilities for Playwright state bootstrapping

## Reporting strategy

### Short term
- terminal output
- Playwright screenshots/traces on failure
- HTML report locally

### Medium term
- CI artifacts:
  - junit/xml or structured report
  - screenshots
  - traces
  - videos on failure
- GitHub Actions workflow should upload:
  - `playwright-report/`
  - `test-results/`
  - Playwright junit output

### Recommended artifact contract
- keep `playwright-report/` local and ignored
- keep `test-results/` local and ignored
- publish HTML report and trace bundle in CI for failed runs
- prefer machine-readable report output before external dashboards

## Test management stance

### About TestRail
- TestRail is useful for:
  - manual test case inventory
  - linking automated runs to product/QA process
  - release signoff
- TestRail is not the first thing to build.

### Recommended order
1. stable automated tests
2. stable seeded environments
3. CI reporting
4. only then optional TestRail integration

### If TestRail is added later
- map only stable e2e/business scenarios, not every low-level spec
- keep code as the source of executable truth
- sync result statuses from CI instead of manual updates
- use it for release visibility, not as the primary place where test logic lives

## Future phases

## Phase T1. Automation base
- Playwright config
- first smoke e2e
- `test:e2e` scripts
- `verify` command
- dev-only auth bootstrap for protected routes

## Phase T2. Product-critical e2e pack
- feed
- matches
- chats
- agent persona
- encounter detail
- shell/navigation continuity

## Phase T3. CI and artifacts
- PR automation
- screenshots/traces/videos on failure
- report publishing
- optional junit output for external tools
- isolated CI build support without a sibling local `../backend`

## Phase T4. Backend-integrated regression
- auth refresh lifecycle
- real API-backed flows
- websocket/presence/message updates
- contract coverage for persona/encounter endpoints

## Phase T5. Optional TestRail layer
- case mapping
- release tracking
- sync automated run statuses

## Current status
- `Phase T1` completed
- `Phase T2` completed
- `Phase T3` completed
- `Phase T4` not started
- `Phase T5` not started

## Recommended implementation order from here
1. move to `Phase T4` once backend-backed flows are ready for stable automation
2. keep the current product pack stable as new frontend/backend work lands
3. introduce contract and API-backed e2e coverage only after endpoint behavior is fixed enough to trust
