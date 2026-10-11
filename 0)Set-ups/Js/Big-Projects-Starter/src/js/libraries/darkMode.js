import { AppName } from "@/data";
import { dom } from "./DOM";
import { getItemLs, updateItemLs, clearCssVariableCache } from "@emakras/vanilla-kit";

// The names of $themes in src/scss/settings/_themes.scss; the first one is the default.
export const THEMES = ["light", "dark", "sepia"];

class ThemeManager {
  constructor(appName) {
    this.appName = appName;
  }

  initTheme() {
    this.loadTheme(this.getCurrentTheme());
  }

  /** Moves to the next theme of THEMES. */
  toggleTheme() {
    const next = THEMES[(THEMES.indexOf(this.getCurrentTheme()) + 1) % THEMES.length];

    this.setTheme(next);
  }

  setTheme(theme) {
    updateItemLs(this.appName, "theme", theme);
    this.loadTheme(theme);
  }

  getCurrentTheme() {
    const storedTheme = getItemLs(this.appName)?.theme;

    if (THEMES.includes(storedTheme)) return storedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  /** Applies the theme and announces it with a "themechange" event on document. */
  loadTheme(theme) {
    dom.root.dataset.theme = theme;
    clearCssVariableCache();

    if (dom.themeBtn) dom.themeBtn.textContent = `Theme: ${theme}`;

    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  }
}

// Usage
const themeManager = new ThemeManager(AppName);
export default themeManager;
