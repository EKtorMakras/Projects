/** Light/dark theme stored per app in localStorage, falling back to the OS preference. */
import { getItemLs, updateItemLs } from "@emakras/vanilla-kit";
import { AppName } from "@/data";

// ======== Private ======== //
function getCurrentTheme() {
  const storedTheme = getItemLs(AppName)?.theme;

  if (storedTheme) return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

// ======== Public ======== //
export function initTheme() {
  applyTheme(getCurrentTheme());
}

export function toggleTheme() {
  const theme = getCurrentTheme() === "dark" ? "light" : "dark";

  updateItemLs(AppName, "theme", theme);
  applyTheme(theme);
}
