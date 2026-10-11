# Vanilla project starter

Vanilla JavaScript + SCSS, built with Vite. Shared SCSS tools and JS utilities come from
[`@emakras/vanilla-kit`](https://github.com/EKtorMakras/vanilla-kit), installed from a GitHub tag.

## Where to work

| Task                                               | File or folder                                      |
| -------------------------------------------------- | --------------------------------------------------- |
| Configure the kit (breakpoints, container, focus…) | `src/scss/settings/_index.scss`                     |
| Palettes (brand, Tailwind hues, status overrides)  | `src/scss/settings/_colors.scss`                    |
| Themes light/dark/sepia (per-theme palettes)       | `src/scss/settings/_themes.scss`                    |
| Theme names and switching                          | `src/js/libraries/darkMode.js`                      |
| The kit's API (every export)                       | `.claude/context/VANILLA_KIT_API.md`                |
| Font stacks (body, heading, mono)                  | `src/scss/settings/_fonts.scss`                     |
| Button sizes                                       | `src/scss/settings/_components.scss`                |
| Cascade layer order                                | `src/scss/style.scss`                               |
| Fonts (self-hosted, metric overrides), typography  | `src/scss/project/base/`                            |
| App shell: header, sidebar, footer                 | `src/scss/project/layout/`                          |
| Your own components                                | `src/scss/project/components/`                      |
| Page styles                                        | `src/scss/project/pages/`                           |
| Kit examples                                       | `showcase.html`, `src/scss/project/pages/showcase/` |
| Aliases (`@`, `~`, `*`, `@fonts`, `@kit`)          | `vite.config.js`                                    |

## Run and check

Install with `pnpm install --frozen-lockfile`, then use `pnpm dev`, `pnpm build` and `pnpm preview`.
Vite builds both `index.html` and `showcase.html`; visit `/showcase.html` for the kit examples.
`pnpm check` runs the SCSS tests, lint, SCSS formatting and a production build.

## Using the kit

Every SCSS file loads the kit through the project settings, never directly:

```scss
@use "settings" as kit; // src/scss is a Sass load path, so this works from any folder

.checkout-button {
  @include kit.btn(primary-500, $size: lg);
  min-width: 12rem;
}

.products {
  @include kit.grid(16rem, kit.space(6), $max-columns: 4);
}
```

- `settings/_index.scss` forwards the kit with the project's overrides (`@forward … with (…)`), like
  Vuetify settings. It must be the first place the kit is loaded.
- Importing the kit emits no CSS. `kit.reset` runs in `style.scss`; tokens, palettes and themes are emitted once by `kit.theme` in `project/base/_theme.scss`.
- Mixins take color names (`kit.card($background: card)`, `kit.btn(primary)`); plain properties use
  `kit.color(surface)`. Unknown names are a compile error.
- Map settings (breakpoints, button sizes, fonts…) merge into the kit's defaults: list only what changes.
- Each `project/` folder is a cascade layer (`reset, base, layout, components, pages`), so later folders win without `!important`.
- Brand colors are Sass values: the kit builds `--clr-primary-50…950` and readable `--clr-primary-*-fg`
  text colors from one base color.
- JavaScript utilities come from the same package: `import { getItemLs, formatDate } from "@emakras/vanilla-kit"`.

See the kit's README for the full API.

## Updating the kit

```sh
pnpm add "github:EKtorMakras/vanilla-kit#v0.3.0"
```

Pick the tag to upgrade to, then run `pnpm check` and open the showcase.
