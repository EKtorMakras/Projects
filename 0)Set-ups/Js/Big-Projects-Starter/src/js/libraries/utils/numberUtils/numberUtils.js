// ======================= Is Number ======================= //
/**
 * Checks if a value is a valid, finite number.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - True if it's a valid number, false otherwise.
 *
 * @example
 * isNumber(5); // true
 * isNumber("5"); // false
 * isNumber(NaN); // false
 */
export function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

// ======================= Pad To 2 Digits ======================= //
/**
 * Pads a number with a leading zero if it's less than 10.
 *
 * @param {number} num - The number to pad.
 * @returns {string} - A string representation of the number, always 2 digits.
 *
 * @example
 * padTo2Digits(5); // "05"
 * padTo2Digits(12); // "12"
 */
export function padTo2Digits(num) {
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("padTo2Digits: Input must be a number.");
  }

  return num.toString().padStart(2, "0");
}

// ======================= Format Decimals ======================= //
/**
 * Formats a number with a fixed number of decimal places if it's not an integer.
 *
 * @param {number} num - The number to format.
 * @param {number} [digits=2] - The number of decimal places to keep.
 * @returns {string} - Formatted number as a string.
 *
 * @example
 * formatDecimals(5.6789); // "5.68"
 * formatDecimals(3); // "3"
 */
export function formatDecimals(num, digits = 2) {
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("formatDecimals: Input must be a number.");
  }

  if (Number.isInteger(num)) {
    // Check if the number is an integer (no decimal part)
    return num.toString(); // Return the integer as a string
  } else {
    return num.toFixed(digits); // Format with corresponding decimal places
  }
}

// ======================= Random Number Between ======================= //
/**
 * Returns a random integer between the specified min and max values (inclusive).
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - A random integer between min and max.
 *
 * @example
 * randomNumberBetween(1, 10); // e.g., 4
 */
export function randomNumberBetween(min, max) {
  if (typeof min !== "number" || isNaN(min) || typeof max !== "number" || isNaN(max)) {
    throw new Error("randomNumberBetween: Both arguments must be numbers.");
  }

  if (min > max) {
    throw new Error(
      "randomNumberBetween: The first argument (min) must be less than or equal to the second argument (max)."
    );
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ======================= Number Is Even ======================= //
/**
 * Checks if a number is even.
 *
 * @param {number} number - The number to check.
 * @returns {boolean} - True if the number is even, false otherwise.
 *
 * @example
 * numberIsEven(4); // true
 * numberIsEven(5); // false
 */
export function numberIsEven(number) {
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("numberIsEven: Input must be a number.");
  }

  return number % 2 === 0;
}

// ======================= Get Average ======================= //
/**
 * Calculates the average of the provided numbers.
 *
 * @param {...number} nums - The numbers to average.
 * @returns {number} - The average value.
 *
 * @example
 * getAverage(2, 4, 6); // 4
 */
export function getAverage(...nums) {
  if (nums.length === 0) {
    throw new Error("getAverage: At least one number must be provided.");
  }

  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
}

// ======================= Format Number ======================= //
/**
 * Formats a number using a specific notation and locale.
 *
 * @param {number} number - The number to format.
 * @param {string} notation - The formatting style ("compact" or "scientific").
 * @param {string} locale - The locale code (e.g. "en", "fr", "el").
 * @returns {string} - The formatted number string.
 *
 * @example
 * formatNumber(1000, "compact", "en"); // "1K"
 */
export function formatNumber(number, notation, locale) {
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("formatNumber: Input must be a number.");
  }

  if (typeof notation !== "string" || (notation !== "compact" && notation !== "scientific")) {
    throw new Error("formatNumber: Notation must be either 'compact' or 'scientific'.");
  }

  if (typeof locale !== "string") {
    throw new Error("formatNumber: Locale must be a string representing a valid locale.");
  }

  const NUMBER_FORMATTER = new Intl.NumberFormat(locale, {
    notation,
  });

  return NUMBER_FORMATTER.format(number);
}

// ======================= Clamp Number ======================= //
/**
 * Restricts a number to be within a specified range.
 *
 * @param {number} value - The number to clamp.
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @returns {number} - The clamped number.
 *
 * @example
 * clampNumber(15, 0, 10); // 10
 */
export function clampNumber(value, min, max) {
  if ([value, min, max].some((n) => typeof n !== "number" || isNaN(n))) {
    throw new Error("clampNumber: All arguments must be valid numbers.");
  }

  return Math.max(min, Math.min(max, value));
}

// ======================= Format Currency ======================= //
/**
 * Formats a number as a localized currency string.
 *
 * @param {number} number - The amount to format.
 * @param {string} [currency="USD"] - The currency code (e.g., "USD", "EUR").
 * @param {string} [locale="en-US"] - The locale to format with.
 * @returns {string} - The formatted currency string.
 *
 * @example
 * formatCurrency(1234.56); // "$1,234.56"
 */
export function formatCurrency(number, currency = "USD", locale = "en-US") {
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("formatCurrency: Input must be a number.");
  }

  if (typeof currency !== "string") {
    throw new Error("formatCurrency: Currency must be a string representing a valid currency code.");
  }

  if (typeof locale !== "string") {
    throw new Error("formatCurrency: Locale must be a string representing a valid locale.");
  }

  const CURRENCY_FORMATTER = new Intl.NumberFormat(locale, {
    currency: currency,
    style: "currency",
  });

  return CURRENCY_FORMATTER.format(number);
}
