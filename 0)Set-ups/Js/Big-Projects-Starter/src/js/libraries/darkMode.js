import { AppName } from "@/data";
import { dom } from "./DOM";
import { getItemLs, updateItemLs, clearCssVariableCache } from "./utils";

class ThemeManager {
  constructor(appName) {
    this.appName = appName;
  }

  initTheme() {
    const theme = this.getCurrentTheme();
    this.loadTheme(theme);
  }

  toggleTheme() {
    let theme = this.getCurrentTheme();
    theme = theme === "light" ? "dark" : "light";

    updateItemLs(this.appName, "theme", theme);
    this.loadTheme(theme);
    clearCssVariableCache();
  }

  getCurrentTheme() {
    const storedTheme = getItemLs(this.appName)?.theme;
    if (storedTheme) return storedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  loadTheme(theme) {
    dom.root.dataset.theme = theme;
  }
}

// Usage
const themeManager = new ThemeManager(AppName);
export default themeManager;
