# Nuxt 4 Vuetify Template

Nuxt 4 starter with Vuetify 4, ECharts, SCSS theming and a shared breakpoints source of truth.

## Requirements

Node >= 24 (see `.nvmrc`), pnpm >= 10.

## Setup

```sh
pnpm install
cp .env.example .env
pnpm dev
```

| Command                             | What it does                        |
| ----------------------------------- | ----------------------------------- |
| `pnpm dev`                          | Dev server on http://localhost:3000 |
| `pnpm build` / `pnpm preview`       | Production build / preview          |
| `pnpm generate`                     | Static generation                   |
| `pnpm lint` / `pnpm lint:fix`       | ESLint                              |
| `pnpm format` / `pnpm format:check` | Prettier                            |

See `CLAUDE.md` for the architecture, conventions and tooling details.
