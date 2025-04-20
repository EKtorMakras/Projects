// ======================= Get Item from Local Storage ======================= //
/**
 * Retrieves a parsed object from localStorage by key.
 *
 * @param {string} key - The key of the item to retrieve.
 * @returns {any|null} - The parsed value from localStorage, or null if not found.
 *
 * @example
 * const user = getItemLs("userData"); // Returns parsed object or null
 */
export function getItemLs(key) {
  return JSON.parse(localStorage.getItem(key));
}

// ======================= Set Item to Local Storage ======================= //
/**
 * Saves an object to localStorage as a JSON string.
 *
 * @param {string} key - The key under which to store the value.
 * @param {any} obj - The value to store (will be JSON.stringified).
 *
 * @example
 * setItemLs("userData", { name: "Alice" });
 */
export function setItemLs(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

// ======================= Update Property in Local Storage ======================= //
/**
 * Updates a specific property of an object in localStorage. If the object doesn't exist, it creates one.
 *
 * @param {string} key - The key of the object in localStorage.
 * @param {string} property - The property name to update or add.
 * @param {any} value - The new value to set for the property.
 *
 * @example
 * updateItemLs("userData", "name", "Alice");
 */
export function updateItemLs(key, property, value) {
  const obj = getItemLs(key);

  if (obj) {
    obj[property] = value;
    setItemLs(key, obj);
  } else {
    setItemLs(key, {
      [property]: value,
    });
  }
}
