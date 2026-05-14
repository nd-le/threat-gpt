---
name: threat-gpt-codebase
description: Threat GPT codebase conventions — layout under src/, TypeScript, ESLint, Next.js App Router patterns. Use when adding or refactoring features, routes, shared code, or config in this repository.
---

# Threat GPT — codebase conventions

## Layout (`src/`)

| Path | Role |
|------|------|
| `src/app/` | App Router only: routes, root `layout.tsx`, `page.tsx`, `fonts.ts`, `providers.tsx`, `globals.css`. Keep route files thin; import from `@/features/*`, `@/lib/*`, `@/components/*`. |
| `src/features/<name>/` | Domain feature: colocate `components/`, hooks, server actions, types. Expose a **barrel** `index.ts` with the feature’s public API only. |
| `src/lib/` | Cross-cutting **non-UI** helpers and config (e.g. `site-metadata.ts`). No feature-specific business logic. |
| `src/components/` | Shared **presentational** building blocks with no single-feature ownership. |

Cal.com–style mapping (single package): `app` ≈ `apps/web/app`, `features` ≈ `packages/features`, `lib` ≈ `packages/lib`, `components` ≈ `apps/web/components`.

## TypeScript

- **`strict`** is on; avoid `any` unless there is a narrow escape hatch and a short comment why.
- **`@/` imports** from `tsconfig.json` paths (`@/features/...`, `@/lib/...`). No file extensions on TS/TSX imports.

## React / Next.js

- Default **Server Components**. Add **`"use client"`** only for hooks, browser APIs, or client-only libraries; put client boundaries in small modules (e.g. `providers.tsx` when it grows).
- **Named exports** from features via barrels; `import/prefer-default-export` is off, but avoid `export default` from feature modules unless Next requires it (e.g. `page.tsx`, `layout.tsx`).
- **Components**: prefer **arrow** functions; `src/app/**/*` enforces arrow for named/unnamed components per ESLint.

## ESLint (this repo)

- Base stack: **`eslint-config-next`** then **`eslint-config-airbnb-base`** (see `eslint.config.mjs`). Do not add `eslint-config-airbnb-typescript` — it conflicts with Next 16’s TypeScript ESLint stack.
- **`src/**`**: double-quoted strings; `import/extensions` off; **`camelcase` off** (Next/third-party identifiers).
- **Config roots** (`eslint.config.mjs`, `*.config.*`, `postcss.config.mjs`): relaxed `quotes` and `import/no-extraneous-dependencies`.

## Tooling

- **`npm run check`** runs **Turborepo** `lint` then `build` (`turbo.json`). Use before PRs; CI uses the same script.

## Changes

- New product surface → **new `src/features/<name>/`** + wire **`src/app/...`**.
- Shared helpers/config → **`src/lib/`**; shared dumb UI → **`src/components/`**.
