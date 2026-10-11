# Small projects starter

A single page with Vite, SCSS and vanilla JavaScript, for quick projects. Shared SCSS tools and JS
utilities come from [`@emakras/vanilla-kit`](https://github.com/EKtorMakras/vanilla-kit).
For an app shell (header, sidebar, footer), a showcase and tests, use `Big-Projects-Starter`.

| Task                                 | File                                 |
| ------------------------------------ | ------------------------------------ |
| Configure the kit                    | `src/scss/_settings.scss`            |
| Palette and light/dark theme colors  | `src/scss/_colors.scss`              |
| Base typography (reset: `kit.reset`) | `src/scss/_base.scss`                |
| Page styles                          | `src/scss/_page.scss`                |
| Cascade layer order                  | `src/scss/style.scss`                |
| Theme toggle                         | `src/js/theme.js`                    |
| The kit's API (every export)         | `.claude/context/VANILLA_KIT_API.md` |

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
```

Load the kit in every SCSS file with `@use "settings" as kit;` so the configuration applies everywhere.
Mixins take color names (`kit.btn(primary)`, `kit.surface($background: surface)`); plain properties use
`kit.color(surface)`. Unknown names are a compile error. Map settings merge into the kit's defaults, and
`@kit` (vite.config.js) is short for `@emakras/vanilla-kit/scss`, e.g. `@use "@kit/palettes/tailwind"`.
JavaScript utilities: `import { formatDate, getItemLs } from "@emakras/vanilla-kit";`.
