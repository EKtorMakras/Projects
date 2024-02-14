import { AppName } from "./data.js";
import { dom } from "./DOM.js";
import { getItemLs, updateItemLs } from "./utils.js";

// Init Theme
export function initTheme() {
  const theme = getCurrentTheme();
  loadTheme(theme);
}

// Toggle Theme
export function toggleTheme() {
  let theme = getCurrentTheme();

  theme = theme === "light" ? "dark" : "light";

  updateItemLs(AppName, "theme", theme);

  loadTheme(theme);
}

// Get Theme
function getCurrentTheme() {
  const storedTheme = getItemLs(AppName)?.theme;
  if (storedTheme) return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Load Theme
function loadTheme(theme) {
  dom.root.dataset.theme = theme;
}
