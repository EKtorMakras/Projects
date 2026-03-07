/**
 * Check if a value is defined (not null and not undefined)
 * @param {*} value - The value to check
 * @returns {boolean} - True if the value is defined, false otherwise
 */
export function isDefined(value) {
    return value !== null && value !== undefined;
}

/**
 * Checks if a value is a valid number (not null, undefined, or NaN)
 * Useful for filtering data before calculations
 *
 * @param {*} value - The value to check
 * @returns {boolean} True if value is a valid number
 *
 * @example
 * isValidNumber(42) // true
 * isValidNumber(0) // true
 * isValidNumber(null) // false
 * isValidNumber(undefined) // false
 * isValidNumber(NaN) // false
 * isValidNumber("text") // false
 */
export function isValidNumber(value) {
    return isDefined(value) && !isNaN(value);
}

export function isFalsyButNotZero(value) {
    return !value && value !== 0;
}

export function copyToClipboard(text) {
    try {
        navigator.clipboard.writeText(text);
    } catch (error) {
        console.error("Failed to copy to clipboard:", error);
    }
}
