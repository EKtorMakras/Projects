// Module Imports
import themeManager from "./libraries/darkMode";
import { initStartingData } from "./fillStartingData";
import { initSidebar } from "./components/sidebar";
import { dom } from "./libraries/DOM";

// Init App
document.addEventListener("DOMContentLoaded", initApp);

// Functions
function initApp() {
  initStartingData();
  themeManager.initTheme();
  initSidebar();
}

dom.themeBtn.addEventListener("click", () => {
  themeManager.toggleTheme();
});
