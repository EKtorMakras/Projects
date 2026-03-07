import { randomNumberBetween } from "../numberUtils/numberUtils";

// ======================= Array First ======================= //
/**
 * Returns the first element(s) of an array.
 *
 * @param {Array} arr - The input array.
 * @param {number} [n=1] - The number of elements to return from the start.
 * @returns {*} - A single element if n is 1, otherwise an array of the first n elements.
 *
 * @example
 * arrFirst([1, 2, 3]); // Returns 1
 * arrFirst([1, 2, 3], 2); // Returns [1, 2]
 */
export function arrFirst(arr, n = 1) {
  // Directly return the first element if n is 1
  if (n === 1) return arr[0];
  // Use slice to get the first n elements efficiently
  return arr.slice(0, n);
}

// ======================= Array Last ======================= //
/**
 * Returns the last element(s) of an array.
 *
 * @param {Array} arr - The input array.
 * @param {number} [n=1] - The number of elements to return from the end.
 * @returns {*} - A single element if n is 1, otherwise an array of the last n elements.
 *
 * @example
 * arrLast([1, 2, 3]); // Returns 3
 * arrLast([1, 2, 3], 2); // Returns [2, 3]
 */
export function arrLast(arr, n = 1) {
  // Directly return the last element if n is 1
  if (n === 1) return arr[arr.length - 1];
  // Use slice with a negative start index to get the last n elements efficiently
  return arr.slice(-n);
}

// ======================= Array Random ======================= //
/**
 * Returns a random element from an array.
 *
 * @param {Array} arr - The input array.
 * @returns {*} - A randomly selected element from the array.
 *
 * @example
 * arrRandom([1, 2, 3]); // Might return 2
 */
export function arrRandom(arr) {
  return arr[randomNumberBetween(0, arr.length - 1)];
}

// ======================= Array Unique Object Values ======================= //
/**
 * Extracts unique values from an array of objects based on a given key.
 *
 * @param {Array<Object>} arr - The input array of objects.
 * @param {string} value - The key to extract unique values from.
 * @returns {Array} - An array containing the unique values for the specified key.
 *
 * @example
 * arrGetUniqueObjectValues(
 *   [{ id: 1 }, { id: 2 }, { id: 1 }],
 *   'id'
 * ); // Returns [1, 2]
 */
export function arrGetUniqueObjectValues(arr, value) {
  return [
    ...new Set(
      arr.map((item) => {
        return item[value];
      })
    ),
  ];
}

// ======================= Array Group By ======================= //
/**
 * Groups an array of objects by a specified key.
 *
 * @param {Array<Object>} arr - The input array of objects.
 * @param {string} key - The key to group objects by.
 * @returns {Object} - An object where each key is a value from the specified key, and each value is an array of objects with that key.
 *
 * @example
 * arrGroupBy([{type: 'a'}, {type: 'b'}, {type: 'a'}], 'type');
 * Returns { a: [{type: 'a'}, {type: 'a'}], b: [{type: 'b'}] }
 */
export function arrGroupBy(arr, key) {
  return arr.reduce((group, element) => {
    const keyValue = element[key];

    return {
      ...group,
      [keyValue]: [...(group[keyValue] ?? []), element],
    };
  }, {});
}

// ======================= Array Is Not Empty ======================= //
/**
 * Checks whether the input is a non-empty array.
 *
 * @param {*} arr - The value to check.
 * @returns {boolean} - Returns true if arr is an array with at least one element.
 *
 * @example
 * arrIsNotEmpty([1, 2, 3]); // Returns true
 * arrIsNotEmpty([]); // Returns false
 */
export function arrIsNotEmpty(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

// ======================= Array Shuffle ======================= //
/**
 * Randomly shuffles the elements of an array.
 *
 * @param {Array} arr - The array to shuffle.
 * @returns {Array} - A new array with the elements shuffled.
 *
 * @example
 * arrShuffle([1, 2, 3, 4]); // Returns something like [3, 1, 4, 2]
 */
export function arrShuffle(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomNumberBetween(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ======================= Array Min Max By Key ======================= //
/**
 * Finds the minimum and maximum values in an array of objects for a given key.
 *
 * @param {Array<Object>} arr - The input array of objects.
 * @param {string} key - The key whose values are to be compared.
 * @returns {{ min: *, max: * }} - An object with min and max values for the given key.
 *
 * @example
 * arrFindMinMaxByKey([{value: 3}, {value: 1}, {value: 5}], 'value');
 * Returns { min: 1, max: 5 }
 */
export function arrFindMinMaxByKey(arr, key) {
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

// ======================= Array Chunk ======================= //
/**
 * Splits an array into chunks of a specified size.
 *
 * @param {Array} arr - The array to split.
 * @param {number} size - The desired size of each chunk (must be a positive integer).
 * @returns {Array[]} - Returns an array of arrays, where each inner array is a chunk of the original array.
 *
 * @example
 * arrChunk([1, 2, 3, 4, 5], 2); // Returns [[1, 2], [3, 4], [5]]
 */
export function arrChunk(arr, size) {
  if (!Array.isArray(arr) || size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// ======================= Array Compact ======================= //
/**
 * Removes all falsy values from an array.
 *
 * @param {Array} arr - The input array.
 * @returns {Array} - A new array without falsey values.
 *
 * @example
 * arrCompact([0, 1, false, 2, '', 3]); // Returns [1, 2, 3]
 */
export function arrCompact(arr) {
  return arr.filter(Boolean);
}

// ======================= Array Flatten ======================= //
/**
 * Flattens a nested array one level deep.
 *
 * @param {Array} arr - The input array (may contain nested arrays).
 * @returns {Array} - A new flattened array.
 *
 * @example
 * arrFlatten([1, [2, 3], [4]]); // Returns [1, 2, 3, 4]
 */
export function arrFlatten(arr) {
  return arr.reduce((flat, toFlatten) => flat.concat(toFlatten), []);
}
