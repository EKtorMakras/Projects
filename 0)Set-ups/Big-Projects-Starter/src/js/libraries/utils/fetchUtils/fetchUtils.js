import { TIMEOUT_SECONDS } from "./config";

// ======================= Timeout ======================= //
/**
 * Returns a promise that rejects after a specified number of seconds.
 *
 * @param {number} s - Time in seconds before the promise rejects.
 * @returns {Promise<never>} - A promise that rejects with a timeout error.
 *
 * @example
 * await Promise.race([fetch(url), timeout(5)]);
 */
export function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}

// ======================= Get JSON ======================= //
/**
 * Fetches JSON data from the given URL with timeout protection.
 *
 * @param {string} url - The endpoint to fetch data from.
 * @returns {Promise<{ data: any|null, error: Error|null }>} - An object containing the response data or error.
 *
 * @example
 * const { data, error } = await getJSON("https://api.example.com/data");
 * if (error) console.error(error);
 * else console.log(data);
 */
export async function getJSON(url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data?.message} (${response?.status})`);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
