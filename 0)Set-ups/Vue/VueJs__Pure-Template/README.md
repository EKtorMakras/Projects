# Vue 3 Pure Template

Vue 3 + Vite starter with SCSS and no UI framework.

## Features

- Vue 3 (`<script setup>`), Vue Router, Pinia, vue-i18n (en/el), axios API layer with `withAsync`
- Day.js, notifications composable, light/dark theme store
- ESLint + Prettier, `.editorconfig`, VSCode settings

## Requirements

Node >= 24 (see `.nvmrc`), pnpm >= 10.

## Project setup

```sh
pnpm install
cp .env.example .env
```

| Command                             | What it does                   |
| ----------------------------------- | ------------------------------ |
| `pnpm dev`                          | Dev server on port 3000        |
| `pnpm build`                        | Production build               |
| `pnpm preview`                      | Preview the production build   |
| `pnpm lint` / `pnpm lint:fix`       | ESLint (code quality only)     |
| `pnpm format` / `pnpm format:check` | Prettier (owns all formatting) |

## Bootstrapping a new project

- Set `package.json#name`, `CONFIG.app_title` in `src/common/config.js` and the `<title>` in `index.html`.
- Replace `public/favicon.ico`.
- Set `VITE_API_URL` in `.env`.

## Tooling

- **ESLint 10** flat config (`eslint.config.mjs`) with `eslint-plugin-vue`, `eslint-plugin-jsonc` and `eslint-config-prettier` applied last.
- **Prettier** (`prettier.config.mjs`): 4 spaces, double quotes, `printWidth` 120, one attribute per line.
- **Aliases**: `@` → `src`, `~` → project root.
- **Recommended IDE**: VSCode + Volar; extensions are listed in `.vscode/extensions.json`.
