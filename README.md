# Threat GPT

Open-source **Next.js** starter for an **AI-assisted security review** product: structured findings, review workflows, and room to grow scanners and UI as self-contained features.

[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)

> Replace `OWNER/REPO` in the badge URL after you publish the GitHub repository.

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS** v4
- **Turborepo** (`turbo.json`) — same idea as [Cal.com’s monorepo](https://handbook.cal.com/engineering/codebase/monorepo-turborepo): pipeline for `lint` and `build`. This repo is currently **one** Next app; the layout below maps Cal’s `apps/web` + `packages/*` into `src/` so we can adopt `apps/` / `packages/` workspaces later without renaming concepts.
- **ESLint 9** (flat config): [`eslint-config-next`](https://nextjs.org/docs/app/api-reference/config/eslint) + [**Airbnb base**](https://github.com/airbnb/javascript). See `eslint.config.mjs` and `CONTRIBUTING.md`.

## Repository layout

Inspired by [calcom/cal.com](https://github.com/calcom/cal.com) (`apps/web`, `packages/features`, `packages/ui`, `packages/lib`), scaled to a **single package**:

```
src/
  app/                 # Next App Router — routes, layout, fonts, providers, globals
  features/            # Domain modules (like packages/features)
  lib/                 # Shared config & helpers (like packages/lib)
  components/          # Reusable UI not tied to one feature (like apps/web/components)
```

Add new behavior under `src/features/<name>/` and compose from `src/app/`.

## Scripts

| Command          | Description                          |
|------------------|--------------------------------------|
| `npm run dev`    | Local dev server                     |
| `npm run build`  | Production build                     |
| `npm run start`  | Run production build                 |
| `npm run lint`   | ESLint                               |
| `npm run check`  | `turbo run lint build` (CI uses this)|

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Code of conduct

See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Security

See [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE)

The `package.json` field `"private": true` only blocks **npm publish**; it does not affect open-sourcing on GitHub.
