// Import Css
import "@/scss/style.scss";

// Module Imports
import themeManager from "./libraries/darkMode";
import { initStartingData } from "./fillStartingData";

// Init App
document.addEventListener("DOMContentLoaded", initApp);

// Functions
function initApp() {
  initStartingData();
  themeManager.initTheme();
}

document.querySelector("#btn").addEventListener("click", () => {
  themeManager.toggleTheme();
});
