// Import Css
import "@/scss/style.scss";

// Module Imports
import { initTheme, toggleTheme } from "./libraries/darkMode";
import { initStartingData } from "./fillStartingData";

// Init App
document.addEventListener("DOMContentLoaded", initApp);

// Functions
function initApp() {
  initStartingData();
  initTheme();
}

document.querySelector("#btn").addEventListener("click", toggleTheme);
