/**
 * Returns the value if it is an array, otherwise returns an empty array.
 * Useful for safely extracting array payloads from API responses.
 * @param {*} value
 * @returns {Array}
 */
export function ensureArray(value) {
    return Array.isArray(value) ? value : [];
}

/**
 * Checks whether the input is a non-empty array.
 * @param {*} arr - The value to check.
 * @returns {boolean} - Returns true if arr is an array with at least one element.
 */
export function arrayIsNotEmpty(arr) {
    return Array.isArray(arr) && arr.length > 0;
}
