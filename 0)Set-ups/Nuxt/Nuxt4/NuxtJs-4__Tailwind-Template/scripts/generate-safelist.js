/**
 * =========================================================
 * TAILWIND @source GENERATOR
 *
 * Generates @source inline() directives from tokens.js
 * Ensures all design tokens generate Tailwind utilities
 * =========================================================
 */

import tokens from "../app/design-system/tokens.js";

/**
 * Generate @source inline() directives for Tailwind v4
 */
export function generateSourceDirectives() {
    const { colors } = tokens;
    const colorNames = Object.keys(colors.palette);
    const flatColorNames = colors.flat ? Object.keys(colors.flat) : [];
    const shadeSteps = colors.shadeSteps;

    // Get semantic color names from light theme (excluding palette and flat)
    const {
        palette: _,
        flat: __,
        ...lightSemanticColors
    } = colors.themes.light;
    const semanticColorNames = Object.keys(lightSemanticColors).filter(
        (key) => !key.endsWith("-fg"),
    );

    const utilities =
        "bg,text,border,ring,divide,outline,shadow,decoration,accent,caret,fill,stroke";
    let directives = "";

    // Palette colors with shades
    if (colorNames.length > 0) {
        const colors = colorNames.join(",");
        const shades = shadeSteps.join(",");
        directives += `/* palette colors + shades + -fg */\n`;
        directives += `@source inline("{${utilities}}-{${colors}}-{${shades}}{,-fg}");\n\n`;
    }

    // Flat colors
    if (flatColorNames.length > 0) {
        const colors = flatColorNames.join(",");
        directives += `/* flat colors */\n`;
        directives += `@source inline("{${utilities}}-{${colors}}{,-fg}");\n\n`;
    }

    // Semantic colors
    if (semanticColorNames.length > 0) {
        const colors = semanticColorNames.join(",");
        directives += `/* semantic */\n`;
        directives += `@source inline("{${utilities}}-{${colors}}{,-fg}");\n\n`;
    }

    return directives;
}
