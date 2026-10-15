import fs from "node:fs";
import path from "node:path";
import { breakpoints } from "../app/config/breakpoints";

/**
 * Writes `app/assets/scss/_breakpoints.scss` from `app/config/breakpoints.ts`.
 *
 * Invoked from `nuxt.config.ts` so the generated file is up-to-date every
 * time Nuxt evaluates its config — i.e. before Vite's Sass pipeline runs.
 * Keeps Vuetify's SASS `$grid-breakpoints` and the runtime
 * `display.thresholds` in lockstep with the TS source of truth.
 *
 * The SCSS file is safe to commit: regenerating yields the same contents,
 * so it won't drift in version control.
 */
const OUTPUT_PATH = "app/assets/scss/_breakpoints.scss";

export function generateBreakpointsScss(): void {
    const entries = Object.entries(breakpoints)
        .map(([key, value]) => `    ${key}: ${value === 0 ? 0 : `${value}px`}`)
        .join(",\n");

    const content =
        "// AUTO-GENERATED — do not edit.\n" +
        "// Source of truth: app/config/breakpoints.ts\n\n" +
        `$breakpoints: (\n${entries},\n);\n`;

    const outputPath = path.resolve(OUTPUT_PATH);
    const existing = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : null;

    if (existing === content) return;

    fs.writeFileSync(outputPath, content);
}
