// ======================= Sanitize Input ======================= //
/**
 * Sanitizes a string by escaping HTML characters to prevent XSS attacks.
 *
 * @param {string} inputValue - The raw user input to sanitize.
 * @returns {string} - The sanitized HTML-escaped string.
 *
 * @example
 * sanitizeInput('<script>alert("XSS")</script>'); // Returns '&lt;script&gt;alert("XSS")&lt;/script&gt;'
 */
export function sanitizeInput(inputValue) {
  const div = document.createElement("div");
  div.textContent = inputValue;
  return div.innerHTML;
}

// ======================= Copy To Clipboard ======================= //
/**
 * Copies a given string to the user's clipboard.
 *
 * @param {string} text - The text to copy.
 *
 * @example
 * copyToClipboard("Copied!");
 */
export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

// ======================= Get Parameter Value ======================= //
/**
 * Retrieves the value of a query parameter from a URL.
 *
 * @param {string} paramName - The name of the URL parameter to retrieve.
 * @param {string} [url=window.location.href] - The URL to search (defaults to current window URL).
 * @returns {string|null} - The decoded parameter value, empty string if param exists with no value, or null if not found.
 *
 * @example
 * URL: https://example.com/?user=alice
 * getParameterValue("user"); // Returns "alice"
 * getParameterValue("missing"); // Returns null
 */
export function getParameterValue(paramName, url = window.location.href) {
  if (!url) url = window.location.href;
  const regex = new RegExp(`[?&]${paramName}(=([^&#]*))`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
