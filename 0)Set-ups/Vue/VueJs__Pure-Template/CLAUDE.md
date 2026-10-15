# CLAUDE.md — Vue 3 Pure Template

Vue 3 + Vite starter with SCSS and no UI framework.

## Quick reference

```bash
pnpm install
pnpm dev          # :3000
pnpm build
pnpm lint         # eslint . (quality only)
pnpm format       # prettier . --write
```

Node >= 24, pnpm >= 10.

## Stack

| Layer | Tech |
| --- | --- |
| UI | Plain SCSS (`src/assets/scss/`), MDI icons |
| Framework | Vue 3.5 (`<script setup>`, Composition API, JavaScript only) |
| Build | Vite 8 |
| Routing | Vue Router 5 |
| State | Pinia 4 |
| i18n | vue-i18n 11 (`en`, `el`) |
| HTTP | axios (`src/api/`) |
| Lint/format | ESLint 10 flat config + Prettier 3 |

## Structure

```
src/
  api/          # axios instance, endpoints, withAsync helper
  assets/       # styles
  common/       # config.js (CONFIG.app_title, CONFIG.main_api)
  components/   # base/ (BaseXxx) + feature components
  composables/  # useTitle, useNotifications, useDate, ...
  layouts/      # LayoutDefault
  locales/      # en.js, el.js
  plugins/      # i18n, dayjs
  router/       # index.js (auth guard + page titles), routes.js
  stores/       # Pinia stores (useXxxStore.js)
  views/        # route-level pages
```

## Conventions

- Formatting belongs to Prettier; ESLint only covers code quality — do not re-add stylistic ESLint rules.
- `@` alias → `src`, `~` → project root.
- Page titles come from `route.meta.title` via `useTitle()`; the app name lives in `CONFIG.app_title`.
- Env vars are `VITE_*`; see `.env.example`.
- General coding principles: see `.github/copilot-instructions.md` (clarity first, flat structure, no magic values, separation of concerns).
