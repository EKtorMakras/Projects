/**
 * Converts a single item or an array of items into an array.
 * @param {string | Array<string>} input
 * @returns {Array<string>}
 */
export function toArray(input) {
    return typeof input === "string" ? [input] : input;
}

/**
 * Assigns the index of each object in an array to a specified property
 * @param {Array<Object>} array - Array of objects to reindex
 * @param {string} orderProperty - The property name to set with the index value
 * @returns {Array<Object>|null} - The reindexed array or null if invalid input
 */
export function assignIndexToProperty(array, orderProperty) {
    if (!Array.isArray(array)) {
        console.warn("assignIndexToProperty: Expected an array, got", typeof array);
        return null;
    }

    if (!orderProperty || typeof orderProperty !== "string") {
        console.warn("assignIndexToProperty: Expected a valid property name string, got", typeof orderProperty);
        return null;
    }

    array.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
            item[orderProperty] = index;
        }
    });

    return array;
}

/**
 * Insert an item at a specific index in an array
 * @param {Array} array - The array to modify
 * @param {number} index - The index at which to insert the item
 * @param {*} item - The item to insert
 * @returns {Array|null} - The modified array or null if invalid input
 */
export function insertAt(array, index, item) {
    if (!Array.isArray(array)) {
        console.warn("insertAt: Expected an array, got", typeof array);
        return null;
    }

    array.splice(index, 0, item);

    return array;
}

/**
 * Insert an item after a specific element in an array
 * @param {Array} array - The array to modify
 * @param {*} referenceItem - The element after which to insert
 * @param {*} newItem - The item to insert
 * @returns {Array|null} - The modified array or null if invalid input
 */
export function insertAfter(array, referenceItem, newItem) {
    if (!Array.isArray(array)) {
        console.warn("insertAfter: Expected an array, got", typeof array);
        return null;
    }

    const index = array.indexOf(referenceItem);

    if (index !== -1) {
        array.splice(index + 1, 0, newItem);
    }

    return array;
}

/**
 * Recursively counts items in a nested structure.
 * @param {Object|Array} root - The root object or array to start from.
 * @param {Function} getChildren - Function(item): Array. Returns children to recurse into.
 * @param {Function} getCount - Function(item): Number. Returns the count for this item.
 * @returns {Number} The total count.
 */
export function recursiveCount(root, getChildren, getCount) {
    if (Array.isArray(root)) {
        return root.reduce((sum, item) => sum + recursiveCount(item, getChildren, getCount), 0);
    }

    let count = getCount(root) || 0;
    const children = getChildren(root) || [];

    for (const child of children) {
        count += recursiveCount(child, getChildren, getCount);
    }

    return count;
}

/**
 * Converts an array of key-value objects to a single object
 * @param {Array<{key: string, value: any}>} propertiesArray - Array of objects with key and value properties
 * @param {Function} [isValidValue] - Optional callback to test if a value should be included. Defaults to always true (includes all values)
 * @returns {Object|null} - Object with keys and values from the array or null if invalid input
 */
export function arrayToObject(propertiesArray, isValidValue = () => true) {
    if (!Array.isArray(propertiesArray)) {
        console.warn("arrayToObject: Expected an array, got", typeof propertiesArray);
        return null;
    }

    return propertiesArray.reduce((obj, item) => {
        // Only add if key exists and value passes the validation test
        if (item.key && isValidValue(item.value)) {
            obj[item.key] = item.value;
        }
        return obj;
    }, {});
}

/**
 * Checks for duplicate keys in an array of key-value objects
 * @param {Array<{key: string, value: any}>} propertiesArray - Array of objects with key and value properties
 * @returns {Array<string>} - Array of duplicate key names
 */
export function findDuplicateKeys(propertiesArray) {
    if (!Array.isArray(propertiesArray)) {
        console.warn("findDuplicateKeys: Expected an array, got", typeof propertiesArray);
        return [];
    }

    const keyCount = {};
    const duplicates = [];

    propertiesArray.forEach((item) => {
        if (item.key && item.key.trim() !== "") {
            const key = item.key.trim();
            keyCount[key] = (keyCount[key] || 0) + 1;

            if (keyCount[key] === 2) {
                duplicates.push(key);
            }
        }
    });

    return duplicates;
}

/**
 * Returns the first element(s) of an array.
 * @param {Array} arr - The input array.
 * @param {number} [n=1] - The number of elements to return from the start.
 * @returns {*} - A single element if n is 1, otherwise an array of the first n elements.
 * @example
 * firstArray([1, 2, 3]); // Returns 1
 * firstArray([1, 2, 3], 2); // Returns [1, 2]
 */
export function firstArray(arr, n = 1) {
    if (!Array.isArray(arr)) {
        console.warn("firstArray: Expected an array, got", typeof arr);
        return n === 1 ? undefined : [];
    }

    if (n === 1) return arr[0];
    return arr.slice(0, n);
}

/**
 * Returns the last element(s) of an array.
 * @param {Array} arr - The input array.
 * @param {number} [n=1] - The number of elements to return from the end.
 * @returns {*} - A single element if n is 1, otherwise an array of the last n elements.
 * @example
 * lastArray([1, 2, 3]); // Returns 3
 * lastArray([1, 2, 3], 2); // Returns [2, 3]
 */
export function lastArray(arr, n = 1) {
    if (!Array.isArray(arr)) {
        console.warn("lastArray: Expected an array, got", typeof arr);
        return n === 1 ? undefined : [];
    }

    if (n === 1) return arr[arr.length - 1];
    return arr.slice(-n);
}

/**
 * Returns a random element from an array.
 * @param {Array} arr - The input array.
 * @returns {*} - A randomly selected element from the array.
 * @example
 * randomArray([1, 2, 3]); // Might return 2
 */
export function randomArray(arr) {
    if (!Array.isArray(arr)) {
        console.warn("randomArray: Expected an array, got", typeof arr);
        return undefined;
    }

    if (arr.length === 0) return undefined;

    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

/**
 * Extracts unique values from an array of objects based on a given key.
 * @param {Array<Object>} arr - The input array of objects.
 * @param {string} key - The key to extract unique values from.
 * @returns {Array} - An array containing the unique values for the specified key.
 * @example
 * getUniqueObjectValues([{ id: 1 }, { id: 2 }, { id: 1 }], 'id'); // Returns [1, 2]
 */
export function getUniqueObjectValues(arr, key) {
    if (!Array.isArray(arr)) {
        console.warn("getUniqueObjectValues: Expected an array, got", typeof arr);
        return [];
    }

    return [...new Set(arr.map((item) => item[key]))];
}

/**
 * Groups an array of objects by a specified key.
 * @param {Array<Object>} arr - The input array of objects.
 * @param {string} key - The key to group objects by.
 * @returns {Object|null} - An object where each key is a value from the specified key, and each value is an array of objects with that key.
 * @example
 * groupByArray([{type: 'a'}, {type: 'b'}, {type: 'a'}], 'type');
 * - Returns { a: [{type: 'a'}, {type: 'a'}], b: [{type: 'b'}] }
 */
export function groupByArray(arr, key) {
    if (!Array.isArray(arr)) {
        console.warn("groupByArray: Expected an array, got", typeof arr);
        return null;
    }

    return arr.reduce((group, element) => {
        const keyValue = element[key];
        return {
            ...group,
            [keyValue]: [...(group[keyValue] ?? []), element],
        };
    }, {});
}

/**
 * Checks whether the input is a non-empty array.
 * @param {*} arr - The value to check.
 * @returns {boolean} - Returns true if arr is an array with at least one element.
 * @example
 * isNotEmpty([1, 2, 3]); // Returns true
 * isNotEmpty([]); // Returns false
 */
export function isNotEmpty(arr) {
    return Array.isArray(arr) && arr.length > 0;
}

/**
 * Randomly shuffles the elements of an array.
 * @param {Array} arr - The array to shuffle.
 * @returns {Array} - A new array with the elements shuffled.
 * @example
 * shuffleArray([1, 2, 3, 4]); // Returns something like [3, 1, 4, 2]
 */
export function shuffleArray(arr) {
    if (!Array.isArray(arr)) {
        console.warn("shuffleArray: Expected an array, got", typeof arr);
        return [];
    }

    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * Finds the minimum and maximum values in an array of objects for a given key.
 * @param {Array<Object>} arr - The input array of objects.
 * @param {string} key - The key whose values are to be compared.
 * @returns {{ min: *, max: * }} - An object with min and max values for the given key.
 * @example
 * findMinMaxByKey([{value: 3}, {value: 1}, {value: 5}], 'value');
 * - Returns { min: 1, max: 5 }
 */
export function findMinMaxByKey(arr, key) {
    if (!Array.isArray(arr)) {
        console.warn("findMinMaxByKey: Expected an array, got", typeof arr);
        return { min: undefined, max: undefined };
    }

    if (arr.length === 0) {
        return { min: undefined, max: undefined };
    }

    let min = arr[0][key];
    let max = arr[0][key];

    arr.forEach((element) => {
        const value = element[key];
        if (value < min) min = value;
        if (value > max) max = value;
    });

    return { min, max };
}

/**
 * Splits an array into chunks of a specified size.
 * @param {Array} arr - The array to split.
 * @param {number} size - The desired size of each chunk (must be a positive integer).
 * @returns {Array[]} - Returns an array of arrays, where each inner array is a chunk of the original array.
 * @example
 * chunkArray([1, 2, 3, 4, 5], 2); // Returns [[1, 2], [3, 4], [5]]
 */
export function chunkArray(arr, size) {
    if (!Array.isArray(arr)) {
        console.warn("chunkArray: Expected an array, got", typeof arr);
        return [];
    }

    if (size <= 0) {
        console.warn("chunkArray: Size must be a positive integer, got", size);
        return [];
    }

    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

/**
 * Removes all falsy values from an array.
 * @param {Array} arr - The input array.
 * @returns {Array} - A new array without falsy values.
 * @example
 * compactArray([0, 1, false, 2, '', 3]); // Returns [1, 2, 3]
 */
export function compactArray(arr) {
    if (!Array.isArray(arr)) {
        console.warn("compactArray: Expected an array, got", typeof arr);
        return [];
    }

    return arr.filter(Boolean);
}

/**
 * Flattens a nested array one level deep.
 * @param {Array} arr - The input array (may contain nested arrays).
 * @returns {Array} - A new flattened array.
 * @example
 * flattenArray([1, [2, 3], [4]]); // Returns [1, 2, 3, 4]
 */
export function flattenArray(arr) {
    if (!Array.isArray(arr)) {
        console.warn("flattenArray: Expected an array, got", typeof arr);
        return [];
    }

    return arr.reduce((flat, toFlatten) => flat.concat(toFlatten), []);
}
