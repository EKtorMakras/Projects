/**
 * The app's themes, switched by the kit's createThemeSwitcher: stored choice, <html data-theme>, "themechange" event.
 * - The names match $themes in src/scss/settings/_themes.scss; the first one is the fallback.
 * - The header button cycles through them and shows the current one.
 */
import { createThemeSwitcher } from "@emakras/vanilla-kit";
import { config } from "./config.js";
import { SELECTORS } from "./selectors.js";

export const THEMES = ["light", "dark", "sepia"];

export const {
  getTheme,
  setTheme,
  cycleTheme,
  initTheme: applyStartTheme,
} = createThemeSwitcher(THEMES, {
  storageKey: `${config.APP_NAME}:theme`,
});

// ======== Private ======== //
function labelButton(button, theme) {
  button.textContent = `Theme: ${theme}`;
}

// ======== Public ======== //
/** Applies the stored (or system) theme and wires the header button, when the page has one. */
export function initTheme() {
  const button = document.querySelector(SELECTORS.themeButton);
  const theme = applyStartTheme();

  if (!button) return;

  labelButton(button, theme);
  button.addEventListener("click", cycleTheme);
  document.addEventListener("themechange", (event) => labelButton(button, event.detail.theme));
}
