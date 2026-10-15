# CLAUDE.md — Nuxt 4 Pure Template

Nuxt 4 starter with SCSS and no UI framework.

## Quick reference

```bash
pnpm install
pnpm dev          # :3000
pnpm build
pnpm lint         # eslint . (code quality only)
pnpm format       # prettier . --write
```

Node >= 22, pnpm >= 10.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Nuxt 4 (Vue 3.5, Vue Router 5) |
| State | Pinia 4 (`@pinia/nuxt`) |
| UI | Plain SCSS (`app/assets/scss/`) |
| i18n | vue-i18n 11 (`en`, `el`) |
| Dates | Day.js (`$dayjs` plugin) |
| Lint/format | ESLint 10 (`@nuxt/eslint`) + Prettier 3 |

## Environment variables

See `.env.example`.

- `NUXT_API_URL` — backend base URL, exposed via `runtimeConfig.public.apiUrl` and the `$api` plugin
- `NUXT_PUBLIC_SITE_URL` — public site URL (SEO)

## API layer

`app/plugins/api.ts` provides `$api` (`get/post/put/patch/delete`) on top of `$fetch`. `composables/api/useApi.js` wraps it with status tracking; `modules/api/helpers/withAsync.js` returns a consistent `{ response, error }`.

```js
const { $api } = useNuxtApp();
const data = await $api.get("/endpoint");
```

## Structure

```
app/
  assets/        # styles
  components/    # base/, layout/ — auto-imported, folder = name prefix
  composables/   # api/useApi, useDateUtils, useNotifications, useNumber, useString, ...
  layouts/       # default, empty
  locales/       # en.js, el.js
  middleware/    # auth.ts (TypeScript allowed only in plugins/ and middleware/)
  modules/       # api helpers
  pages/
  plugins/       # api.ts, dayjs.ts, i18n.ts
  stores/        # useAuthStore, useLocaleStore
  utils/
```

## Conventions

- Formatting belongs to Prettier; ESLint only covers code quality — do not re-add stylistic ESLint rules.
- JavaScript by default; `.ts` only in `plugins/` and `middleware/`.
- Do not manually import components from `components/` (auto-imported).
- No `typeof window` checks — use `import.meta.client` / `import.meta.server`; persist via `useCookie()` rather than `localStorage`.
- No hard-coded UI text — add keys to both `locales/en.js` and `locales/el.js`.
- Full coding principles: `.github/copilot-instructions.md`. Skills: `.claude/skills/`.
