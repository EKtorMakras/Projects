import chroma from "chroma-js";
import { log } from "@/plugins/roarr";
import { config } from "@/common/config";
import { patterns, cssVariableCache } from "./colorConstants";

// ================================ CSS Variable Helpers =============================== //
/**
 * Checks if a string is a CSS variable reference.
 *
 * @param {string} color - The color string to check.
 * @returns {boolean} - Returns true if the string is a CSS variable reference, false otherwise.
 *
 * @example
 * isCssVariable("var(--clr-primary-500)"); // Returns true
 * isCssVariable("#331233"); // Returns false
 */
function isCssVariable(color) {
  return typeof color === "string" && patterns.CSS_VARIABLE_REFERENCE.test(color);
}

/**
 * Retrieves the value of a CSS variable from the root element using a cached lookup for increased performance.
 *
 * @param {string} colorName - The name of the CSS color variable to retrieve, excluding the specified CSS color variables prefix.
 * @returns {string|null} - The value of the specified CSS variable as a string, or null if not found.
 *
 * @example
 * getCssColorVariable("primary-500"); // Returns the resolved color value, e.g., "hsl(300, 48%, 14%)" if defined.
 */
function getCssColorVariable(colorName) {
  if (!colorName) {
    log.warn(`getCssColorVariable: Invalid color name '${colorName}'`);
    return null;
  }

  if (cssVariableCache[colorName]) {
    return cssVariableCache[colorName];
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${config.COLOR_VARIABLE_PREFIX}-${colorName}`)
    .trim();

  if (!value) {
    log.warn(`getCssColorVariable: CSS variable --${config.COLOR_VARIABLE_PREFIX}-${colorName} is not defined.`);
  }

  cssVariableCache[colorName] = value;

  return value;
}

/**
 * Extracts the value part of a CSS variable, such as "primary-500" from "var(--clr-primary-500)".
 * This function also verifies if the input is a valid CSS variable using `isCssVariable`.
 *
 * @param {string} color - The CSS variable reference to extract from.
 * @returns {string|null} - The extracted value part of the CSS variable or null if the input is invalid.
 *
 * @example
 * extractCssVariableValue("var(--clr-primary-500)"); // Returns "primary-500"
 * extractCssVariableValue("#331233"); // Returns null and logs a warning
 */
function extractCssVariableValue(color) {
  if (!isCssVariable(color)) {
    log.warn(`extractCssVariableValue: The input '${color}' is not a valid CSS variable.`);
    return null;
  }

  const variableNameMatch = color.match(patterns.CSS_VARIABLE_NAME);
  if (variableNameMatch && variableNameMatch[1]) {
    return variableNameMatch[1];
  }

  log.warn(`extractCssVariableValue: Failed to extract CSS variable value from '${color}'.`);
  return null;
}

/**
 * Validates and retrieves the value of a CSS color variable.
 *
 * @param {string} colorName - The name of the CSS variable (excluding the prefix).
 * @returns {string|null} - The CSS variable value if defined; otherwise, null.
 *
 * @example
 * validateCssVariable("primary-500"); // Returns the color value if it exists, or null.
 */
function validateCssVariable(colorName) {
  const cssColor = getCssColorVariable(colorName);

  if (!cssColor) {
    log.warn(`validateCssVariable: CSS variable --${config.COLOR_VARIABLE_PREFIX}-${colorName} is not defined.`);
    return null;
  }

  return cssColor;
}

/**
 * Resolves the value of a CSS variable if the given color is a CSS variable reference.
 *
 * @param {string} color - The color to resolve, which could be a CSS variable or a direct color value.
 * @returns {string} - The resolved color value, or the original color if it's not a CSS variable.
 *
 * @example
 * resolveCssVariableColor("var(--clr-primary-500)"); // Returns the resolved color value, e.g., "#331233".
 */
function resolveCssVariableColor(color) {
  if (isCssVariable(color)) {
    const variableName = extractCssVariableValue(color);

    if (!variableName) {
      log.warn(`resolveCssVariableColor: Could not extract variable name from '${color}'`);
      return color;
    }

    return getCssColorVariable(variableName) ?? color;
  }

  return color;
}

/**
 * Clears the CSS variable cache.
 *
 * Call this function after changing themes to ensure updated CSS variables are used.
 *
 * @example
 * loadTheme('dark');
 * clearCssVariableCache();
 */
function clearCssVariableCache() {
  Object.keys(cssVariableCache).forEach((key) => delete cssVariableCache[key]);
}

// ================================ General =============================== //
/**
 * Safely processes a color value using a provided function, with error handling.
 *
 * @param {string} color - The color to process (supports any valid color format, e.g., HEX, RGB, HSL).
 * @param {Function} processFn - The function to apply to the color, which receives a Chroma.js color object.
 * @param {string} errorMsg - The error message to log if the processing fails.
 * @returns {string|null} - The result of the processing function, or null if an error occurs.
 *
 * @example
 * safelyProcessColor("#331233", (chromaColor) => chromaColor.darken(1).hex(), "Failed to darken color");
 *  Returns a darker color in HEX format, or null if an error occurs.
 */
function safelyProcessColor(color, processFn, errorMsg) {
  try {
    return processFn(chroma(color));
  } catch (error) {
    log.warn({ error }, errorMsg);
    return null;
  }
}

export {
  getCssColorVariable,
  extractCssVariableValue,
  validateCssVariable,
  safelyProcessColor,
  resolveCssVariableColor,
  clearCssVariableCache,
};
