import chroma from "chroma-js";
import { isBrowser } from "@/utils/generalUtils";

/**
 * Composable for color utilities
 * Provides helper functions for working with Vuetify theme colors
 */
export function useColor() {
    /**
     * Get a color value from Vuetify's CSS variables defined in the root element.
     *
     * @param {string} colorName - The name of the Vuetify CSS color variable to retrieve, excluding the "--v-theme-" prefix.
     * @param {number} [opacity=1] - The opacity level for the color, ranging from 0 (fully transparent) to 1 (fully opaque).
     * @returns {string} - The color value in the rgba format with the specified opacity.
     */
    function getColor(colorName, opacity = 1) {
        return `rgba(var(--v-theme-${colorName}), ${opacity})`;
    }

    /**
     * Retrieves a CSS variable value from the root element.
     *
     * @param {string} variableName - The name of the CSS variable (excluding the prefix).
     * @param {string} [prefix="--v-theme"] - The prefix for the variable. Defaults to Vuetify theme variables.
     * @returns {string|null} - The value of the CSS variable, or null if it doesn't exist.
     */
    function getCssColorVar(variableName, prefix = "--v-theme") {
        if (!isBrowser()) {
            return null;
        }

        const value = getComputedStyle(document.documentElement)
            .getPropertyValue(`${prefix}-${variableName}`)
            .trim();

        return value || null;
    }

    /**
     * Get HEX from a Vuetify theme color variable name.
     *
     * @param {string} colorName - The CSS variable name (e.g. "primary", "secondary").
     * @param {Object} [opts] - Options object.
     * @param {boolean} [opts.sixDigit=true] - If true, strip alpha and return #RRGGBB.
     * @param {string} [opts.fallback="#999999"] - Fallback HEX if colorName missing/invalid.
     * @param {number} [opts.opacity=1] - Opacity for RGBA conversion (0-1).
     * @returns {string} HEX color string.
     */
    function getHexColor(colorName, opts = {}) {
        const { sixDigit = true, fallback = "#999999", opacity = 1 } = opts;

        const rgb = getCssColorVar(colorName); // expects "r, g, b"

        if (!rgb) return fallback;

        return (
            convertColorToHex(`rgba(${rgb}, ${opacity})`, { sixDigit }) ||
            fallback
        );
    }

    /**
     * Safely create a chroma color object.
     *
     * @param {string} color - Any valid CSS color string.
     * @param {string} [ctx=""] - Context label for clearer warnings.
     * @returns {import("chroma-js").Color|null}
     */
    function safeChroma(color, ctx = "") {
        if (!chroma.valid(color)) {
            console.warn(`${ctx} Invalid color '${color}'.`);
            return null;
        }

        try {
            return chroma(color);
        } catch (error) {
            console.warn(`${ctx} Failed to parse color '${color}'.`, error);
            return null;
        }
    }

    /**
     * Convert RGB(A) or HEX to HEX.
     *
     * @param {string} color - HEX or RGB/RGBA color string.
     * @param {{sixDigit?: boolean}} [opts] - If true, drop alpha → return "#rrggbb".
     * @returns {string|null} HEX string or null if invalid.
     */
    function convertColorToHex(color, { sixDigit = false } = {}) {
        const colorInstance = safeChroma(color, "convertColorToHex:");
        if (!colorInstance) return null;

        if (sixDigit === true) {
            return colorInstance.hex("rgb");
        }

        return colorInstance.hex();
    }

    /**
     * Converts a given color to its RGB or RGBA format.
     *
     * @param {string} color - The color string to convert.
     * @returns {string|null} - Returns the color in RGB/RGBA format or null if invalid.
     */
    function convertColorToRgb(color) {
        const colorInstance = safeChroma(color, "convertColorToRgb:");
        if (!colorInstance) return null;

        return colorInstance.css();
    }

    /**
     * Adjusts the alpha value of a given color.
     *
     * @param {string} color - The color in HEX, RGB, or RGBA format.
     * @param {number} alpha - The alpha value to apply (0 to 1).
     * @returns {string|null} - The resulting color in RGBA format or null if the input is invalid.
     */
    function adjustAlpha(color, alpha) {
        if (typeof alpha !== "number" || alpha < 0 || alpha > 1) {
            console.warn(
                `adjustAlpha: The alpha value ${alpha} is not valid. It should be between 0 and 1.`,
            );
            return null;
        }

        const colorInstance = safeChroma(color, "adjustAlpha:");
        if (!colorInstance) return null;

        return colorInstance.alpha(alpha).css();
    }

    /**
     * Lightens a given color by a specified percentage.
     *
     * @param {string} color - The color to be lightened.
     * @param {number} percent - The percentage by which to lighten the color (0..100).
     * @returns {string} - The adjusted color in rgb/rgba format.
     */
    function lightenColor(color, percent) {
        if (typeof percent !== "number" || percent < 0 || percent > 100) {
            console.warn(
                `lightenColor: The percentage argument ${percent} is not valid. Please provide a number between 0 and 100.`,
            );
            return color;
        }

        const colorInstance = safeChroma(color, "lightenColor:");
        if (!colorInstance) return color;

        const mixRatio = percent / 100;
        return colorInstance.tint(mixRatio, "rgb").css();
    }

    /**
     * Darkens a given color by a specified percentage.
     *
     * @param {string} color - The color to be darkened.
     * @param {number} percent - The percentage by which to darken the color (0..100).
     * @returns {string} - The adjusted color in rgb/rgba format.
     */
    function darkenColor(color, percent) {
        if (typeof percent !== "number" || percent < 0 || percent > 100) {
            console.warn(
                `darkenColor: The percentage argument ${percent} is not valid. Please provide a number between 0 and 100.`,
            );
            return color;
        }

        const colorInstance = safeChroma(color, "darkenColor:");
        if (!colorInstance) return color;

        const mixRatio = percent / 100;
        return colorInstance.shade(mixRatio, "rgb").css();
    }

    return {
        getColor,
        getHexColor,
        getCssColorVar,
        convertColorToHex,
        convertColorToRgb,
        adjustAlpha,
        lightenColor,
        darkenColor,
    };
}
