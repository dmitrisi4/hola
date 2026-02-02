# Agent coding guide (keep code lint/format clean)

Use these constraints when writing or editing code in this repo so it passes ESLint/Prettier without extra fixes.

## Prettier (from .prettierrc)
- Semicolons required; double quotes (singleQuote: false).
- Trailing commas: all; printWidth: 100; tabWidth: 2; endOfLine: lf.
- Bracket spacing on, bracketSameLine: false, arrowParens: always.
- One attribute per line in JSX (singleAttributePerLine: true); proseWrap: always.

## ESLint (eslint.config.js)
- Base: @eslint/js recommended + typescript-eslint recommended (non type-aware).
- React: `react` plugin, hooks recommended; `react/react-in-jsx-scope` and `jsx-uses-react` off.
- HMR: `react-refresh/only-export-components` warn (allowConstantExport: true).
- Unused vars: `@typescript-eslint/no-unused-vars` warn; ignore `_`-prefixed args/vars/rest siblings.
- Console: warn; only `console.warn`/`console.error` allowed.
- Import rules:
  - Enforced order with blank lines between groups: builtin, external, internal, parent/sibling/index, type; alphabetize asc, case-insensitive.
  - Object imports/exports with 2+ props must break into multiple lines.
  - Max line length warn at 100 (strings/templates/comments ignored).
  - Restricted imports: `moment` (and `moment/*`) banned — use `date-fns`.
  - Resolver understands TS + `@/*` alias from tsconfig.
- Globals/env: ES2023 modules; browser + node globals are available.

## Project notes (package.json)
- Scripts: `lint` = eslint ., `lint:fix` = eslint . --fix, `format`/`format:check` with Prettier, `dev` via Vite (port 3000).
- React 19, TanStack Router/Query stack; prefer date-fns over moment.

## How to write
- Order imports per rule; add blank lines between groups.
- Avoid impure calls (Date.now, Math.random) directly in render; compute in handlers/effects.
- Use double quotes, semicolons, 2-space indent; keep lines ≤100 chars.
- No console except warn/error; avoid moment.
