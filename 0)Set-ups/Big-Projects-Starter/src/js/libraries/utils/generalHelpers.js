export function sanitizeInput(inputValue) {
  const div = document.createElement("div");
  div.textContent = inputValue;
  return div.innerHTML;
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

export function getParameterValue(paramName, url = window.location.href) {
  if (!url) url = window.location.href;
  const regex = new RegExp(`[?&]${paramName}(=([^&#]*))`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
