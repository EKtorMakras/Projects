/** Light/dark theme with the kit's createThemeSwitcher: stored per app, falling back to the OS preference. */
import { createThemeSwitcher } from "@emakras/vanilla-kit";
import { AppName } from "@/data";

export const {
  initTheme,
  cycleTheme: toggleTheme,
  getTheme,
} = createThemeSwitcher(["light", "dark"], { storageKey: `${AppName}:theme` });
