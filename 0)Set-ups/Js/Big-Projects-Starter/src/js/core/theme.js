/**
 * Theme switching: stores the choice, sets <html data-theme> and announces it with a "themechange" event.
 * - The names match $themes in src/scss/settings/_themes.scss; the first one is the default.
 */
import { clearCssVariableCache, getItemLs, updateItemLs } from "@emakras/vanilla-kit";
import { config } from "./config.js";
import { SELECTORS } from "./selectors.js";

export const THEMES = ["light", "dark", "sepia"];

// ======== Private ======== //
function storedTheme() {
  const theme = getItemLs(config.APP_NAME)?.theme;

  return THEMES.includes(theme) ? theme : null;
}

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const button = document.querySelector(SELECTORS.themeButton);

  document.documentElement.dataset.theme = theme;
  clearCssVariableCache();

  if (button) button.textContent = `Theme: ${theme}`;

  document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

// ======== Public ======== //
export function getTheme() {
  return storedTheme() ?? systemTheme();
}

export function setTheme(theme) {
  updateItemLs(config.APP_NAME, "theme", theme);
  applyTheme(theme);
}

/** Moves to the next theme of THEMES. */
export function cycleTheme() {
  const next = THEMES[(THEMES.indexOf(getTheme()) + 1) % THEMES.length];

  setTheme(next);
}

/** Applies the stored (or system) theme and wires the header button, when the page has one. */
export function initTheme() {
  applyTheme(getTheme());
  document.querySelector(SELECTORS.themeButton)?.addEventListener("click", cycleTheme);
}
