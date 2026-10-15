# Migration to @emakras/vanilla-kit

The embedded SCSS library (`src/scss/library/`), the JavaScript utilities (`src/js/libraries/utils/`)
and the generated `css/` output were removed. Both now come from `@emakras/vanilla-kit`.

- No utility classes are generated anymore. The app shell (header, sidebar, footer) and the hero are
  ordinary project styles written with kit mixins, so the markup uses semantic class names only.
- `settings/` holds the kit configuration; brand and theme colors moved to `project/base/_theme.scss`.
- The old `settings/_colors`, `_themes` and `_tokens` partials were folded into those two files.
- No starter tests: the kit tests itself, and `pnpm build` compiles every stylesheet. Tests that pinned the
  example settings (primary color, breakpoints) broke on every project's own values.
- The showcase was rebuilt to demonstrate the kit: tokens, colors, buttons, layout, typography,
  decoration, social icons, media queries and the JS utilities.
