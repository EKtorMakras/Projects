import { log } from "@/plugins/roarr";
import { config } from "@/common/config";

// ==================== Variables ==================== //
const cssVariableCache = {};

const PATTERNS = {
  RGB: {
    regex: /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i,
    description: "Matches RGB or RGBA strings like 'rgb(255, 255, 255)' or 'rgba(255, 255, 255, 0.5)'",
  },
  HEX: {
    regex: /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/,
    description: "Matches HEX strings like '#fff', '#ffffff', '#12345678'",
  },
  HEX_SHORT: {
    regex: /^[a-fA-F0-9]{3,4}$/,
    description: "Matches shorthand HEX strings like 'fff' or 'abcd'",
  },
  HSL: {
    regex: /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(0|1|0?\.\d+))?\s*\)$/i,
    description: "Matches HSL or HSLA strings like 'hsl(240, 100%, 50%)' or 'hsla(240, 100%, 50%, 0.5)'",
  },
};

const mode = { lighten: 1, darken: -1 };

// General
/**
 * Get a color value from available CSS variables defined in the root element.
 *
 * @param {string} colorName - The name of the CSS color variable to retrieve, excluding the specified css color variables" prefix.
 * @returns {string} - The color value in the rgba format.
 */
export function getColor(colorName) {
  const cssColor = validateCssVariable(colorName);
  if (!cssColor) return null;

  const color = `var(--${config.COLOR_VARIABLE_PREFIX}-${colorName})`;
  return color;
}

/**
 * Retrieves a color value from available CSS variables and converts it to a HEX color string.
 *
 * @param {string} colorName - The name of the CSS color variable to retrieve, excluding the specified CSS color variables prefix.
 * @returns {string} - The HEX color string. This will be in the format "#rrggbb" for RGB input or "#rrggbbaa" for RGBA input. If the alpha channel is 1 or not specified, it will not be included in the output. If the conversion fails, it returns null.
 */
export function getHexColor(colorName) {
  const cssColor = validateCssVariable(colorName);
  if (!cssColor) return null;

  const rgb = convertColorToRgb(cssColor);

  if (!rgb) {
    log.warn(`getHexColor: Failed to convert '${cssColor}' to RGB.`);
    return null;
  }

  const hex = rgbToHex(rgb);
  if (!hex) {
    log.warn(`getHexColor: Failed to convert RGB to HEX for color ${cssColor}.`);
    return null;
  }

  return hex;
}

/**
 * Retrieves a color value from available CSS variables and converts it to an RGB or RGBA color string.
 *
 * @param {string} colorName - The name of the CSS color variable to retrieve, excluding the specified CSS color variables prefix.
 * @returns {string|null} - The RGB or RGBA color string. If the conversion fails, it returns null.
 */
export function getRgbColor(colorName) {
  const cssColor = validateCssVariable(colorName);
  if (!cssColor) return null;

  const rgb = convertColorToRgb(cssColor);

  if (!rgb) {
    log.warn(`getRgbColor: Failed to convert '${cssColor}' to RGB.`);
  }

  return rgb;
}

/**
 * Retrieves the value of a CSS variable from the root element using a cached lookup for increased performance.
 *
 * @param {string} colorName - The name of the CSS color variable to retrieve, excluding the specified css color variables prefix.
 * @returns {string} - The value of the specified CSS variable as a string.
 */
function getCssColorVariable(colorName) {
  if (cssVariableCache[colorName]) {
    return cssVariableCache[colorName];
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${config.COLOR_VARIABLE_PREFIX}-${colorName}`)
    .trim();

  cssVariableCache[colorName] = value;

  return value;
}

// ==================== Lighten / Darken Color ==================== //
/**
 * Lightens a given color by a specified percentage.
 *
 * @param {string} color - The color to be lightened, in HEX, RGB, or RGBA format.
 * @param {number} percent - The percentage by which to lighten the color, ranging from 0 to 100.
 * @returns {string} - The adjusted color, either in RGB/RGBA or HEX format.
 */
export function lightenColor(color, percent) {
  return adjustColor(color, percent, mode.lighten);
}

/**
 * Darkens a given color by a specified percentage.
 *
 * @param {string} color - The color to be darkened, in HEX, RGB, or RGBA format.
 * @param {number} percent - The percentage by which to darken the color, ranging from 0 to 100.
 * @returns {string} - The adjusted color, either in RGB/RGBA or HEX format.
 */
export function darkenColor(color, percent) {
  return adjustColor(color, percent, mode.darken);
}

// ==================== Conversions ==================== //
/**
 * Converts an RGB or RGBA color string to a HEX color string.
 *
 * @param {string} rgb - The RGB or RGBA color string to convert. The format is "rgb(r, g, b)" or "rgba(r, g, b, a)".
 * @returns {string} - The HEX color string. This will be in the format "#rrggbb" for RGB input or "#rrggbbaa" for RGBA input.
 */
export function rgbToHex(rgb) {
  rgb = rgb.toLowerCase();

  // Check if the input is a string and has a valid format
  if (!isValidRgb(rgb)) {
    log.warn(`rgbToHex: The input ${rgb} is not a valid RGB or RGBA string.`);
    return null;
  }

  // Determine the separator used in the input string (either a comma or a space)
  let sep = rgb.indexOf(",") > -1 ? "," : " ";

  // Check if the input string is an RGBA color
  let isRgba = rgb.indexOf("rgba") > -1;

  // Remove the "rgb(" or "rgba(" prefix and the ")" suffix, and split the string into an array of values
  rgb = rgb
    .substring(isRgba ? 5 : 4)
    .split(")")[0]
    .split(sep);

  // Convert the red, green, and blue values to hexadecimal
  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  // If the input string is an RGBA color, convert the alpha value to hexadecimal
  let a = isRgba ? Math.round(+rgb[3] * 255).toString(16) : null;

  // If any of the hexadecimal values are only one digit, prepend a zero
  r = r.padStart(2, "0");
  g = g.padStart(2, "0");
  b = b.padStart(2, "0");
  if (a) a = a.padStart(2, "0");

  // Always include the alpha component if RGBA, even if it is "ff" (fully opaque)
  return "#" + r + g + b + (isRgba ? a : "");
}

/**
 * Converts a HEX color string to an RGBA color string.
 *
 * @param {string} hex - The HEX color string to convert. The format is "#rrggbb" or "#rrggbbaa".
 * @returns {string|null} - The RGBA color string in the format "rgba(r, g, b, a)". If the conversion fails, returns null.
 */
export function hexToRgb(hex) {
  if (!isValidHex(hex)) {
    log.warn(`hexToRgb: The input ${hex} is not a valid hexadecimal color.`);
    return null;
  }

  hex = hex.toLowerCase();

  // Handle shorthand HEX notation (3 or 4 characters)
  hex = expandShorthandHex(hex);

  // Separate the color components
  const hasAlpha = hex.length === 8;
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const a = hasAlpha ? parseInt(hex.substr(6, 2), 16) / 255 : 1;

  // Check if the parsed values are valid
  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
    log.warn(`hexToRgb: Failed to parse the color components from the input ${hex}.`);
    return null;
  }

  // Construct the final RGBA color string using the helper
  let rgbaColor = constructRgbaString(r, g, b, a);

  return rgbaColor;
}

/**
 * Converts an HSL or HSLA color string to an RGBA color string.
 *
 * @param {string} hsl - The HSL or HSLA color string to convert.
 * @returns {string|null} - The RGBA color string in the format "rgba(r, g, b, a)". If parsing fails, returns null.
 */
function hslToRgba(hsl) {
  if (!isValidHsl(hsl)) {
    log.warn(`hslToRgba: The input '${hsl}' is not a valid HSL or HSLA string.`);
    return null;
  }

  const match = hsl.match(PATTERNS.HSL.regex);

  let h = parseInt(match[1], 10);
  let s = parseInt(match[2], 10) / 100;
  let l = parseInt(match[3], 10) / 100;
  let a = match[4] !== undefined ? parseFloat(match[4]) : 1;

  h = (h % 360) / 360; // Normalize to a value between 0 and 1
  let r, g, b;

  if (s === 0) {
    // Achromatic case (gray)
    r = g = b = l;
  } else {
    const hueToRgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  // Scale RGB values from 0-1 range to 0-255 and round them
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return constructRgbaString(r, g, b, a);
}

function convertColorToRgb(color) {
  const colorType = getColorType(color);

  switch (colorType) {
    case "rgb":
      return color;
    case "hex":
      return hexToRgb(color);
    case "hsl":
      return hslToRgba(color);
    default:
      log.warn(`convertColorToRgb: The color '${color}' is not a valid format.`);
      return null;
  }
}

// ==================== Booleans ==================== //
/**
 * Determines whether a given color is dark or light based on its luminance.
 *
 * @param {string} color - The color in HEX or RGB/RGBA format.
 * @param {number} [threshold=0.5] - The luminance threshold to determine darkness. Defaults to 0.5.
 * @returns {boolean} - Returns true if the color's luminance is less than or equal to the threshold (dark), false otherwise (light).
 */
export function isColorDark(color, threshold = 0.5) {
  color = color.toLowerCase();

  if (isCssVariable(color)) {
    const variableName = extractCssVariableValue(color);
    color = getCssColorVariable(variableName) ?? color;
  }

  const rgb = convertColorToRgb(color);

  if (!rgb) {
    log.warn(`isColorDark: The color '${color}' is not a valid HEX, RGB, or HSL string.`);
    return null;
  }

  const { r, g, b } = parseRgbString(rgb);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance <= threshold;
}

/**
 * Validates whether a string is a valid RGB or RGBA color string with components in the correct range.
 *
 * @param {string} rgb - The RGB or RGBA color string to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
export function isValidRgb(rgb) {
  if (typeof rgb !== "string") return false;
  const match = rgb.match(PATTERNS.RGB.regex);
  if (!match) return false;

  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  const a = match[4] !== undefined ? Number(match[4]) : 1;

  // Check if RGB components are within 0-255 and alpha is within 0-1
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1;
}

/**
 * Validates whether a string is a valid HEX color string, including shorthand formats.
 *
 * @param {string} hex - The HEX color string to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
export function isValidHex(hex) {
  if (typeof hex !== "string") return false;
  return PATTERNS.HEX.regex.test(hex);
}

/**
 * Validates whether a string is a valid HSL or HSLA color string.
 *
 * @param {string} color - The HSL or HSLA color string to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function isValidHsl(color) {
  return typeof color === "string" && PATTERNS.HSL.regex.test(color);
}

// ===============  Helpers =============== //
/**
 * Parses an RGB or RGBA color string and returns its individual components.
 *
 * @param {string} rgbString - The RGB or RGBA color string to parse.
 * @returns {Object|null} - An object containing the red, green, blue, and alpha components. If parsing fails, returns null.
 */
function parseRgbString(rgbString) {
  // Check if the argument is a string
  if (typeof rgbString !== "string") {
    log.warn(`parseRgbString: The input ${rgbString} is not a valid string.`);
    return null;
  }

  // Match the RGB(A) values in the string
  const rgbaValues = rgbString.match(/[\d.]+/g);

  // Check if the values are valid
  if (!rgbaValues || rgbaValues.length < 3) {
    log.warn(`parseRgbString: The input ${rgbString} does not contain valid RGB or RGBA values.`);
    return null;
  }

  // Parse the red, green, blue, and optional alpha components
  const r = parseInt(rgbaValues[0]);
  const g = parseInt(rgbaValues[1]);
  const b = parseInt(rgbaValues[2]);
  const a = rgbaValues[3] !== undefined ? parseFloat(rgbaValues[3]) : 1;

  // Check if the parsed values are valid
  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
    log.warn(`parseRgbString: Failed to parse the color components from the input ${rgbString}.`);
    return null;
  }

  return { r, g, b, a };
}

/**
 * Adjusts the lightness or darkness of a given color by a specified percentage.
 *
 * @param {string} color - The color to adjust, in HEX, RGB, or RGBA format.
 * @param {number} percent - The percentage by which to adjust the color, ranging from 0 to 100.
 * @param {number} modeMultiplier - The multiplier for the adjustment, either +1 for lightening or -1 for darkening.
 * @returns {string} - The adjusted color, either in RGB/RGBA or HEX format.
 */
function adjustColor(color, percent, modeMultiplier) {
  if (typeof percent !== "number" || percent < 0 || percent > 100) {
    log.warn(`adjustColor: Invalid percentage value '${percent}'. It should be a number between 0 and 100.`);
    percent = Math.max(0, Math.min(percent, 100));
  }

  color = color.toLowerCase();

  if (isCssVariable(color)) {
    const variableName = extractCssVariableValue(color);
    color = getCssColorVariable(variableName) ?? color;
  }

  if (isValidHsl(color)) {
    color = hslToRgba(color);
  }

  const adjustmentAmount = (percent / 100) * modeMultiplier;
  const rgba = getColorComponents(color);

  if (!rgba) return color;

  let { r, g, b, a } = rgba;

  r = adjustComponent(r, adjustmentAmount);
  g = adjustComponent(g, adjustmentAmount);
  b = adjustComponent(b, adjustmentAmount);

  return constructRgbaString(r, g, b, a);
}

/**
 * Expands a shorthand HEX color string to its full form.
 *
 * @param {string} hex - The shorthand HEX color string (e.g., "fff" or "abcd").
 * @returns {string} - The expanded HEX color string (e.g., "ffffff" or "aabbccdd").
 */
function expandShorthandHex(hex) {
  const hexWithoutHash = removeHashFromColorString(hex);

  if (!PATTERNS.HEX_SHORT.regex.test(hexWithoutHash)) {
    log.warn(`expandShorthandHex: The input ${hex} is not a valid shorthand hex color.`);
    return hex;
  }

  const expandedHex = hexWithoutHash
    .split("")
    .map((ch) => ch + ch)
    .join("");
  return `#${expandedHex}`;
}

/**
 * Removes the leading '#' from a HEX color string if present.
 *
 * @param {string} color - The HEX color string.
 * @returns {string} - The HEX color string without the leading '#'.
 */
function removeHashFromColorString(color) {
  return color.startsWith("#") ? color.slice(1) : color;
}

/**
 * Constructs an RGB or RGBA color string from individual components.
 *
 * @param {number} r - Red component (0-255).
 * @param {number} g - Green component (0-255).
 * @param {number} b - Blue component (0-255).
 * @param {number} [a=1] - Alpha component (0-1).
 * @returns {string} - The constructed RGB or RGBA color string.
 */
function constructRgbaString(r, g, b, a = 1) {
  if (a === 1) {
    return `rgb(${r}, ${g}, ${b})`;
  }
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Validates and retrieves the value of a CSS color variable.
 *
 * @param {string} colorName - The name of the CSS variable (excluding the prefix).
 * @returns {string|null} - The CSS variable value if defined; otherwise, null.
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
 * Extracts RGB or RGBA components from a given color.
 *
 * @param {string} color - The color to extract components from, in HEX, HSL, RGB, or RGBA format.
 * @returns {Object|null} - An object containing the red, green, blue, and alpha components, or null if the color is invalid.
 */
function getColorComponents(color) {
  const rgbString = convertColorToRgb(color);

  if (!rgbString) {
    log.warn(`getColorComponents: The color '${color}' is not a valid format.`);
    return null;
  }

  return parseRgbString(rgbString);
}

/**
 * Adjusts a color component value based on the specified adjustment amount.
 *
 * @param {number} value - The color component value to adjust (0-255).
 * @param {number} adjustmentAmount - The amount by which to adjust the value. Positive for lighten, negative for darken.
 * @returns {number} - The adjusted color component value.
 */
function adjustComponent(value, adjustmentAmount) {
  return Math.min(255, Math.max(0, Math.round(value + adjustmentAmount * (255 - value))));
}

/**
 * Checks if a string is a CSS variable reference.
 *
 * @param {string} color - The color string to check.
 * @returns {boolean} - Returns true if the string is a CSS variable reference, false otherwise.
 */
function isCssVariable(color) {
  return color.startsWith("var(--");
}

/**
 * Extracts the value part of a CSS variable, such as "primary" from "var(--clr-primary)".
 * This function also verifies if the input is a valid CSS variable using `isCssVariable`.
 *
 * @param {string} color - The CSS variable reference to extract from.
 * @returns {string|null} - The extracted value part of the CSS variable or null if the input is invalid.
 */
function extractCssVariableValue(color) {
  if (!isCssVariable(color)) {
    log.warn(`extractCssVariableValue: The input '${color}' is not a valid CSS variable.`);
    return null;
  }

  const regex = new RegExp(`var\\(--${config.COLOR_VARIABLE_PREFIX}-([\\w-]+)\\)`);

  const variableNameMatch = color.match(regex);
  if (variableNameMatch && variableNameMatch[1]) {
    return variableNameMatch[1];
  }

  log.warn(`extractCssVariableValue: Failed to extract CSS variable value from '${color}'.`);
  return null;
}

/**
 * Determines the type of the given color string.
 *
 * @param {string} color - The color string to evaluate.
 * @returns {string} - Returns 'hex', 'rgb', 'hsl', or 'invalid' based on the format.
 */
function getColorType(color) {
  for (const [type, { regex }] of Object.entries(PATTERNS)) {
    if (regex.test(color)) {
      return type.toLowerCase();
    }
  }
  return "invalid";
}
