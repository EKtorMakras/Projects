// ======================= To Proper Case ======================= //
/**
 * Converts a string to proper case (capitalizes the first letter, lowercases the rest).
 *
 * @param {string} str - The string to convert.
 * @returns {string} - The converted string in proper case.
 *
 * @throws {Error} If the input is not a string.
 *
 * @example
 * toProperCase("hello"); // "Hello"
 * toProperCase("WORLD"); // "World"
 * toProperCase(""); // ""
 */
export function toProperCase(str) {
  if (typeof str !== "string") {
    throw new Error("toProperCase: Input must be a string.");
  }

  if (str.length === 0) {
    return str; // Return an empty string
  }

  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

// ======================= Clean Uppercase Text ======================= //
/**
 * Normalizes a string by removing diacritic marks (accents) from uppercase text.
 *
 * @param {string} text - The input string to clean.
 * @returns {string} - The normalized string without diacritics.
 *
 * @example
 * cleanUppercaseText("ÉLÉPHANT"); // "ELEPHANT"
 */
export function cleanUppercaseText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC");
}

// ======================= Truncate String ======================= //
/**
 * Truncates a string to a maximum length and appends an ellipsis if needed.
 *
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum allowed length.
 * @param {string} [suffix="..."] - The suffix to append after truncation.
 * @returns {string} - The truncated string.
 *
 * @throws {Error} If inputs are invalid.
 *
 * @example
 * truncateString("This is a long sentence", 10); // "This is..."
 */
export function truncateString(str, maxLength, suffix = "...") {
  if (typeof str !== "string") {
    throw new Error("truncateString: First argument must be a string.");
  }
  if (typeof maxLength !== "number" || isNaN(maxLength)) {
    throw new Error("truncateString: maxLength must be a valid number.");
  }

  return str.length > maxLength ? str.slice(0, maxLength - suffix.length) + suffix : str;
}
