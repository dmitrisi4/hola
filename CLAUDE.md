## Quick Start

When the user asks to run the frontend from this directory, do not re-investigate the project. Use these commands directly.

1. Ensure the backend in `../backend` is available first.
2. Start the frontend dev server:
   `npm run dev`

## Notes

- Project root for frontend runtime: this directory.
- Main dev command: `npm run dev`
- Dev server port is fixed by the script: `http://localhost:3000`
- `predev` runs `scripts/ensure-backend-types.mjs`, which executes `npm --prefix ../backend run gen:types` before Vite starts.
- If backend type generation is the only blocker for an isolated frontend boot, `VITE_E2E_BOOTSTRAP=1 npm run dev` can use committed snapshots when present, but the default path is plain `npm run dev`.
