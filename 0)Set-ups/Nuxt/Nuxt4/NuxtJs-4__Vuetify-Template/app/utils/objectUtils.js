/**
 * Read a nested value from an object using a dot-separated path.
 * Returns undefined if any segment in the path is null or missing.
 *
 * @param {Object} obj
 * @param {string} path - e.g. "water_district.id"
 * @returns {*}
 */
export function getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
}

/**
 * Check if a value is a plain object (not null, array, Date, RegExp, or other built-in objects)
 * @param {*} value - The value to check
 * @returns {boolean} - True if value is a plain object literal
 */
export function isPlainObject(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    // Exclude arrays, dates, regexes, and other built-in objects
    if (Array.isArray(value) || value instanceof Date || value instanceof RegExp) {
        return false;
    }

    // Check if it's a plain object by verifying its prototype
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a nested object that needs mapping
 * @param {*} value - The field value
 * @returns {boolean} - True if value is an object (not null, not array)
 */
export function isNestedObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
