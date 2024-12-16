import { AppName } from "@/data";
import { dom } from "./DOM";
import { getItemLs, updateItemLs, clearCssVariableCache } from "./utils";

// Init Theme
export function initTheme() {
  const theme = getCurrentTheme();
  loadTheme(theme);
}

export function toggleTheme() {
  let theme = getCurrentTheme();

  theme = theme === "light" ? "dark" : "light";

  updateItemLs(AppName, "theme", theme);
  loadTheme(theme);
  clearCssVariableCache();
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
