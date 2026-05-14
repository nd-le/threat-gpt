# Contributing

Thank you for helping improve Threat GPT. This document describes how we work in this repository.

## Getting started

1. Install [Node.js](https://nodejs.org/) (LTS **20** or newer recommended; CI uses 20).
2. Clone the repository and install dependencies:

   ```bash
   npm ci
   ```

3. Run the app locally:

   ```bash
   npm run dev
   ```

4. Before opening a pull request, run:

   ```bash
   npm run check
   ```

   (`check` runs **Turborepo** `lint` + `build`, matching how Cal.com wires pipelines in `turbo.json` — here it is a single app, ready to grow into workspaces later.)

## Project layout (Cal.com–inspired, single app)

[Cal.com](https://github.com/calcom/cal.com) uses **Turborepo**: deployable **`apps/*`** (e.g. `apps/web` for Next) and shared **`packages/*`** (`packages/features`, `packages/ui`, `packages/lib`, …). We mirror that **inside one Next app** so paths stay familiar if we later split into workspaces.

| Path | Cal.com analogue | Purpose |
|------|------------------|--------|
| `src/app/` | `apps/web/app/` | App Router routes, root layout, `fonts.ts`, `providers.tsx`, global CSS only. Keep route files thin. |
| `src/features/<name>/` | `packages/features/<name>/` | Domain feature: components, hooks, server actions, types; barrel `index.ts` for the feature’s public API. |
| `src/lib/` | `packages/lib` (and shared config) | Cross-feature utilities, config, pure helpers — **no** feature-specific UI. |
| `src/components/` | `apps/web/components` | Reusable presentational pieces not owned by a single feature. |

New product areas → new folder under `src/features/`. Wire routes from `src/app/` by importing the feature barrel.

## Code style

- **TypeScript** with `strict` mode.
- **ESLint**: `eslint-config-next` + **`eslint-config-airbnb-base`** (see `eslint.config.mjs` — we skip `eslint-config-airbnb-typescript` because it lags Next 16’s `@typescript-eslint` stack).
- Prefer **arrow function** components where ESLint enforces them.
- Path alias: `@/…` from `tsconfig.json`.

## Pull requests

- Keep changes focused; describe **what** and **why**.
- Fix new lint issues; avoid broad rule disables without discussion.
- Update `README.md` when behavior or top-level layout changes meaningfully.

## License

By contributing, you agree your contributions are licensed under the project license (`LICENSE`).
