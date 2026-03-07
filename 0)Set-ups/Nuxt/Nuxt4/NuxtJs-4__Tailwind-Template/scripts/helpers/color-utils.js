/**
 * =========================================================
 * COLOR UTILITIES
 *
 * Utilities for color conversion, contrast calculation,
 * and shade generation.
 * =========================================================
 */

import chroma from "chroma-js";

/**
 * Converts hex to OKLCH format for Tailwind v4
 * Example: #038cb3 → oklch(0.54 0.14 208)
 */
export function hexToOklch(hex) {
    const color = chroma(hex);
    const [l, c, h] = color.oklch();
    return `oklch(${l.toFixed(2)} ${c.toFixed(2)} ${isNaN(h) ? 0 : Math.round(h)})`;
}

/**
 * Determines optimal foreground color (light or dark) based on contrast
 */
export function getForegroundColor(bgHex, lightHex = "#f8fafc", darkHex = "#0f172a") {
    const bg = chroma(bgHex);
    const light = chroma(lightHex);
    const dark = chroma(darkHex);

    const contrastWithLight = chroma.contrast(bg, light);
    const contrastWithDark = chroma.contrast(bg, dark);

    return contrastWithLight >= contrastWithDark ? lightHex : darkHex;
}

/**
 * Generates shade palette from base color
 */
export function generateShades(baseColor, shadeSteps) {
    const shades = {};

    for (const step of shadeSteps) {
        let color;

        if (step === 500) {
            color = baseColor;
        } else if (step < 500) {
            const factor = (500 - step) / 500;
            color = chroma(baseColor)
                .brighten(factor * 2)
                .hex();
        } else {
            const factor = (step - 500) / 500;
            color = chroma(baseColor)
                .darken(factor * 2)
                .hex();
        }

        shades[step] = color;
    }

    return shades;
}
