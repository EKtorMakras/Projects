/**
 * Breakpoints — single source of truth.
 *
 * Consumed by:
 *   - `nuxt.config.ts` → `vuetifyOptions.display.thresholds` (runtime, for
 *     `useDisplay()`).
 *   - `app/assets/scss/_breakpoints.scss` → auto-generated from this file at
 *     Nuxt startup; drives Vuetify's SASS `$grid-breakpoints` and our own
 *     `breakpoint-up/down` mixins.
 *
 * Editing this file is the only way to change breakpoints — never edit the
 * generated SCSS by hand (it gets overwritten on next `nuxt dev`/`build`).
 *
 * `xs/sm/md/lg/xl/xxl` mirror Vuetify defaults; anything else (e.g. `sidebar`)
 * is project-specific.
 */
export const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560,
} as const;

export type BreakpointName = keyof typeof breakpoints;
