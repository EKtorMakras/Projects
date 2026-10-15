# Vanilla large-project starter

Read @.claude/context/CODE_STYLE.md and README.md before editing.
This is vanilla JavaScript and SCSS with Vite, not a framework project.

Shared SCSS tools and JS utilities come from `@emakras/vanilla-kit` (GitHub tag dependency).
Its full API is @.claude/context/VANILLA_KIT_API.md; use only what it lists. After a kit upgrade, copy the new
`node_modules/@emakras/vanilla-kit/docs/API.md` there.
Fix or extend reusable behavior in the kit repository, not here.
The daily editing surface is src/scss/settings/ and src/scss/project/.
Load the kit only through `src/scss/settings` so its configuration applies everywhere.

Use pnpm check (lint, SCSS formatting, build). The starter has no tests: the kit tests itself. Do not run lint:fix as a read-only check.
One stylesheet (src/scss/style.scss) serves every page; build both HTML pages. Do not overwrite .env.local.
Write all docs, comments and UI text in English.
