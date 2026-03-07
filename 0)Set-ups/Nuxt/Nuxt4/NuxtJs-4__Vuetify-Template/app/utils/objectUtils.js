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
 * Check if a nested property KEY exists in an object (not just if it has a value)
 * @param {Object} obj - The object to check
 * @param {string} path - Dot-separated path (e.g., "station.name")
 * @returns {boolean} - True if the key path exists (even if value is null/undefined)
 */
export function hasNestedPropertyKey(obj, path) {
    if (!isPlainObject(obj)) {
        console.warn("hasNestedPropertyKey: Expected a plain object, got", typeof obj);
        return false;
    }

    const keys = path.split(".");
    let current = obj;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        // Check if key exists in object (even if value is null/undefined)
        if (current && key in current) {
            current = current[key];
        } else {
            return false;
        }
    }
    return true;
}

/**
 * Check if a field key should be included based on its existence in the data object
 * @param {Object} obj - The data object to check
 * @param {string} fieldKey - The field key to check
 * @param {Object} options - Special case options
 * @param {string[]} options.compositeFields - Fields that are composed of other fields
 * @returns {boolean} - True if the field should be included
 */
export function shouldIncludeField(obj, fieldKey, options = {}) {
    if (!isPlainObject(obj)) {
        console.warn("shouldIncludeField: Expected a plain object, got", typeof obj);
        return false;
    }

    const { compositeFields = {} } = options;

    // Check if this is a composite field (made from other fields)
    if (compositeFields[fieldKey]) {
        const componentKeys = compositeFields[fieldKey];
        return componentKeys.some((key) => key in obj);
    }

    // Check nested properties
    if (fieldKey.includes(".")) {
        return hasNestedPropertyKey(obj, fieldKey);
    }

    // Check direct properties - key must exist (value can be null)
    return fieldKey in obj;
}

/**
 * Determine if a value is a nested object that needs mapping
 * @param {*} value - The field value
 * @returns {boolean} - True if value is an object (not null, not array)
 */
export function isNestedObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Finds the first key in an object where the value matches the provided value
 * @param {Object} object - The object to search in
 * @param {*} value - The value to search for
 * @returns {string|null} - The key of the found value or null if not found
 */
export function findKeyByValue(object, value) {
    if (!isPlainObject(object)) {
        console.warn("findKeyByValue: Expected a plain object, got", typeof object);
        return null;
    }

    const key = Object.keys(object).find((key) => object[key] === value);
    return key || null;
}

/**
 * Finds the first empty key in an object (where value is null or undefined)
 * @param {Object} object - The object to search in
 * @returns {string|null} - The first key with null/undefined value or null if not found
 */
export function findEmptyKey(object) {
    if (!isPlainObject(object)) {
        console.warn("findEmptyKey: Expected a plain object, got", typeof object);
        return null;
    }

    const key = Object.keys(object).find((key) => object[key] === null || object[key] === undefined);
    return key || null;
}

/**
 * Creates a new object with the same keys but with values transformed by the provided function
 * @param {Object} object - The object to transform
 * @param {Function} transformFn - Function that transforms each value
 * @returns {Object|null} - A new object with transformed values or null if invalid input
 */
export function mapValues(object, transformFn) {
    if (!isPlainObject(object)) {
        console.warn("mapValues: Expected a plain object, got", typeof object);
        return null;
    }

    if (typeof transformFn !== "function") {
        console.warn("mapValues: Expected a function as second parameter, got", typeof transformFn);
        return null;
    }

    return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transformFn(value, key)]));
}

/**
 * Recursively checks if an object is "empty" (all values are falsy except 0)
 * @param {Object} obj - The object to check
 * @returns {boolean} - True if the object has no meaningful values, false otherwise
 */
export function isEmptyObject(obj) {
    // Handle null, undefined
    if (obj === null || obj === undefined) {
        return true;
    }

    // Arrays are invalid input for this function
    if (Array.isArray(obj)) {
        console.warn("isEmptyObject: Arrays are not supported. Use a dedicated array helper function instead.");
        return false;
    }

    // Non-plain objects (primitives, dates, etc.) are invalid input
    if (!isPlainObject(obj)) {
        console.warn("isEmptyObject: Expected a plain object, got", typeof obj);
        return false;
    }

    // Handle objects
    const keys = Object.keys(obj);

    // Empty object is considered empty
    if (keys.length === 0) {
        return true;
    }

    // Object is empty if all values are empty (recursive check)
    return keys.every((key) => {
        const value = obj[key];

        // For nested objects, recurse
        if (isPlainObject(value)) {
            return isEmptyObject(value);
        }

        // For primitive values, check if falsy but not zero
        return !value && value !== 0;
    });
}
