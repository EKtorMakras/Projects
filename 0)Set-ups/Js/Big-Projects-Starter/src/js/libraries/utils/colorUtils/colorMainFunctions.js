import chroma from "chroma-js";
import { log } from "@/plugins/roarr";
import { config } from "@/common/config";
import {
  validateCssVariable,
  getCssColorVariable,
  safelyProcessColor,
  resolveCssVariableColor,
  clearCssVariableCache,
} from "./colorHelperFunctions";

// ==================== Get Color ==================== //
/**
 * Get a color value from available CSS variables defined in the root element.
 *
 * @param {string} colorName - The name of the CSS color variable to retrieve, excluding the specified CSS color variables prefix.
 * @returns {string} - The CSS variable reference string (e.g., "var(--clr-primary)").
 *
 * @example
 * getColor("primary"); // Returns "var(--clr-primary)"
 */
function getColor(colorName) {
  const cssColor = validateCssVariable(colorName);
  if (!cssColor) return null;

  return `var(--${config.COLOR_VARIABLE_PREFIX}-${colorName})`;
}

/**
 * Retrieves a color value from available CSS variables and converts it to a HEX color string.
 *
 * @param {string} colorName - The name of the CSS color variable to retrieve, excluding the specified CSS color variables prefix.
 * @returns {string|null} - The HEX color string (e.g., "#331233"), or null if conversion fails.
 *
 * @example
 * getHexColor("primary"); // Returns the resolved color value, e.g., "#331233" if the CSS variable resolves to a valid color.
 */
function getHexColor(colorName) {
  const color = getCssColorVariable(colorName);
  if (!color) return null;

  return safelyProcessColor(
    color,
    (chromaColor) => chromaColor.hex(),
    `getHexColor: Failed to convert '${color}' to HEX.`
  );
}

/**
 * Retrieves a color value from available CSS variables and converts it to an RGB or RGBA color string.
 *
 * @param {string} colorName - The name of the CSS color variable to retrieve, excluding the specified CSS color variables prefix.
 * @returns {string|null} - The RGB or RGBA color string (e.g., "rgb(51, 18, 51)"), or null if conversion fails.
 *
 * @example
 * getRgbColor("primary"); // Returns the resolved color value, e.g., "rgb(51, 18, 51)" if the CSS variable resolves to a valid color.
 */
function getRgbColor(colorName) {
  const color = getCssColorVariable(colorName);
  if (!color) return null;

  return safelyProcessColor(
    color,
    (chromaColor) => chromaColor.css(),
    `getRgbColor: Failed to convert '${color}' to RGB.`
  );
}

// ==================== Color Manipulation ==================== //
/**
 * Lightens a given color by a specified step value.
 *
 * @param {string} color - The color to be lightened (supports any valid color format, e.g., HEX, RGB, HSL).
 * @param {number} step - The step by which to lighten the color. A value of 1 equals a moderate lightening effect. Values can be greater than 1 for more intense lightening.
 * @returns {string} - The adjusted color in HEX format.
 *
 * @example
 * lightenColor("#351335", 1); // Returns a lighter color, e.g., "#603b5f".
 * lightenColor("var(--clr-primary)", 1); // Returns a lighter color.
 */
function lightenColor(color, step) {
  color = resolveCssVariableColor(color);

  return safelyProcessColor(
    color,
    (chromaColor) => chromaColor.brighten(step).hex(),
    `lightenColor: Failed to lighten the color '${color}'.`
  );
}

/**
 * Darkens a given color by a specified step value.
 *
 * @param {string} color - The color to be darkened (supports any valid color format, e.g., HEX, RGB, HSL).
 * @param {number} step - The step by which to darken the color. A value of 1 equals a moderate darkening effect. Values can be greater than 1 for more intense darkening.
 * @returns {string} - The adjusted color in HEX format.
 *
 * @example

 * darkenColor("#351335", 1); // Returns a darker color, e.g., "#140010".
 * darkenColor("var(--clr-primary)", 1); // Returns a darker color.
 */
function darkenColor(color, step) {
  color = resolveCssVariableColor(color);

  return safelyProcessColor(
    color,
    (chromaColor) => chromaColor.darken(step).hex(),
    `darkenColor: Failed to darken the color '${color}'.`
  );
}

// ==================== Color Booleans ==================== //
/**
 * Determines whether a given color is dark or light based on its luminance.
 *
 * @param {string} color - The color in any valid format (e.g., HEX, RGB, HSL).
 * @param {number} [threshold=0.5] - The luminance threshold to determine darkness.
 * @returns {boolean|null} - Returns true if the color's luminance is less than or equal to the threshold, false otherwise.
 *
 * @example
 * isColorDark("#140010"); // Returns true if the color is dark.
 */
function isColorDark(color, threshold = 0.3) {
  color = resolveCssVariableColor(color);

  try {
    const luminance = chroma(color).luminance();
    return luminance <= threshold;
  } catch (error) {
    log.warn({ error }, `isColorDark: Failed to determine if color '${color}' is dark.`);
    return null;
  }
}

export {
  getColor,
  getHexColor,
  getRgbColor,
  getCssColorVariable,
  resolveCssVariableColor,
  clearCssVariableCache,
  lightenColor,
  darkenColor,
  isColorDark,
};
