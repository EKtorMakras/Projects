// Import Css
import "@/scss/style.scss";

// Module Imports
import { initTheme, toggleTheme } from "./darkMode.js";
import { initStartingData } from "./fillStartingData.js";


// Init App
document.addEventListener("DOMContentLoaded", initApp);


// Functions
function initApp() {
  initStartingData();
  initTheme();
}

document.querySelector("#btn").addEventListener("click", toggleTheme);
