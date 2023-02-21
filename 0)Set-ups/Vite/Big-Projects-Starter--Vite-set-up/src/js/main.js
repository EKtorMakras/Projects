// Import Css
import '@/scss/style.scss'

// Module Imports
import { initLs } from './utils.js'
import { initTheme,toggleTheme } from './darkMode.js'
import { initStartingData } from './fillStartingData.js'

console.log(import.meta.env.VITE_APP_NAME)


// Init App
document.addEventListener('DOMContentLoaded', initApp)



// Functions
function initApp() {
  initStartingData()
  initLs()
  initTheme()
}

document.querySelector('#btn').addEventListener('click', toggleTheme);