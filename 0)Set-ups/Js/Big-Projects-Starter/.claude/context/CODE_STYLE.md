# Vanilla starter code style

Write ordinary SCSS in project/base, project/layout, project/components and project/pages.
Load the kit with `@use "settings" as kit` (src/scss is a Sass load path); never `@use` the kit itself directly
(`@kit`), or the project configuration is skipped; `@kit/palettes/…` is fine. Export new partials from the nearest `_index.scss`.

Configure the kit in settings/\_index.scss with `@forward … with (…)`; large maps live in their own
settings files (\_colors, \_themes, \_components) and are registered there. Map settings merge into the kit's
defaults: list only what changes (`null` removes a key). Pass colors to mixins by name and keyword
(`kit.card($background: card)`); use `kit.color(name)` for plain properties; never hard-code `var(--clr-…)`.

Each project folder is a cascade layer declared once in style.scss. Keep every project style inside its
folder's layer; unlayered CSS beats all layers.

Nest each class family under its block with `&`: `.footer { &-content {…} &-links {…} }` and
`.alert { &--error {…} }` compile to the same flat classes, without extra specificity. Nest descendant
selectors (`pre`, `a`) only to scope them to their block. Keep unrelated blocks as separate rules.

Use CSS custom properties for runtime theme values (`var(--clr-*)`) and kit tokens (`kit.space()`,
`kit.radius()`, `kit.shadow()`…) instead of raw numbers. Use a mixin when it adds behavior; write
ordinary CSS next to it for one-off declarations.

Link page stylesheets in the HTML `<head>` (`<link rel="stylesheet" href="./src/scss/…">`), never
`import` them from JavaScript: imported CSS is injected after the script runs, so the dev server shows
an unstyled flash on every page load.

Keep JavaScript modules scoped to their page/component and import utilities from
`@emakras/vanilla-kit`. Use textContent for plain text and handle optional DOM elements and rejected
promises explicitly.

Files with private helpers put them first under `// ======== Private ======== //`, followed by
`// ======== Public ======== //`. Two spaces, double quotes, semicolons and the local Prettier
configuration apply. Report separately whether browser visuals were actually checked.
