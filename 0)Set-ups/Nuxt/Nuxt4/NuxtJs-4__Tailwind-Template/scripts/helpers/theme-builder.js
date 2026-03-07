/**
 * =========================================================
 * THEME CSS BUILDER
 *
 * Functions for building CSS strings from design tokens.
 * =========================================================
 */

import {
    hexToOklch,
    getForegroundColor,
    generateShades,
} from "./color-utils.js";

/**
 * Generates base theme CSS for @theme block
 */
export function generateBaseThemeCss(colorTokens) {
    let css = "";
    const { shadeSteps, palette, flat, foreground } = colorTokens;

    // Palette colors with shades
    if (palette) {
        for (const [name, baseColor] of Object.entries(palette)) {
            const shades = generateShades(baseColor, shadeSteps);
            for (const [step, color] of Object.entries(shades)) {
                const comment = step === "500" ? ` /* ${baseColor} */` : "";
                css += `    --color-${name}-${step}: ${hexToOklch(color)};${comment}\n`;

                const fgColor = getForegroundColor(
                    color,
                    foreground.light,
                    foreground.dark,
                );
                css += `    --color-${name}-${step}-fg: ${hexToOklch(fgColor)};\n`;
            }
        }
        css += "\n";
    }

    // Flat colors (no shades)
    if (flat) {
        for (const [name, color] of Object.entries(flat)) {
            css += `    --color-${name}: ${hexToOklch(color)}; /* ${color} */\n`;

            const fgColor = getForegroundColor(
                color,
                foreground.light,
                foreground.dark,
            );
            css += `    --color-${name}-fg: ${hexToOklch(fgColor)};\n`;
        }
        css += "\n";
    }

    return css;
}

/**
 * Generates theme-specific overrides
 */
export function generateThemeOverrides(colorTokens, themeTokens) {
    let css = "";
    const { shadeSteps, foreground } = colorTokens;
    const { palette, flat, ...semanticTokens } = themeTokens;

    // Palette overrides
    if (palette) {
        for (const [name, baseColor] of Object.entries(palette)) {
            const shades = generateShades(baseColor, shadeSteps);
            for (const [step, color] of Object.entries(shades)) {
                const comment = step === "500" ? ` /* ${baseColor} */` : "";
                css += `    --color-${name}-${step}: ${hexToOklch(color)};${comment}\n`;

                const fgColor = getForegroundColor(
                    color,
                    foreground.light,
                    foreground.dark,
                );
                css += `    --color-${name}-${step}-fg: ${hexToOklch(fgColor)};\n`;
            }
        }
        css += "\n";
    }

    // Flat color overrides
    if (flat) {
        for (const [name, color] of Object.entries(flat)) {
            css += `    --color-${name}: ${hexToOklch(color)}; /* ${color} */\n`;

            const fgColor = getForegroundColor(
                color,
                foreground.light,
                foreground.dark,
            );
            css += `    --color-${name}-fg: ${hexToOklch(fgColor)};\n`;
        }
        css += "\n";
    }

    // Semantic token overrides
    for (const [key, hex] of Object.entries(semanticTokens)) {
        const comment = key.endsWith("-fg") ? "" : ` /* ${hex} */`;
        css += `    --color-${key}: ${hexToOklch(hex)};${comment}\n`;
    }

    return css;
}

/**
 * Generates opacity CSS variables
 */
export function generateOpacityCss(opacities) {
    let css = "";
    for (const [name, value] of Object.entries(opacities)) {
        css += `    --opacity-${name}: ${value};\n`;
    }
    return css;
}
