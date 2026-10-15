/**
 * Check if a value is defined (not null and not undefined)
 * @param {*} value - The value to check
 * @returns {boolean} - True if the value is defined, false otherwise
 */
export function isDefined(value) {
    return value !== null && value !== undefined;
}

/**
 * Check if a value is empty (null, undefined, or empty string)
 * @param {*} value - The value to check
 * @returns {boolean} - True if the value is empty, false otherwise
 */
export function isEmptyValue(value) {
    return value === null || value === undefined || value === "";
}

/**
 * Checks if the code is running in a browser environment (client-side).
 * @returns {boolean} - True if running in browser, false if SSR or Node.js.
 */
export function isBrowser() {
    return typeof window !== "undefined" && typeof document !== "undefined";
}

/**
 * Returns true if value is a finite number (not null, undefined, or NaN).
 * @param {*} value
 * @returns {boolean}
 */
export function isValidNumber(value) {
    return isDefined(value) && !isNaN(value);
}
