// Import Css
import '@/scss/style.scss'

// Module Imports
import { initTheme } from './darkMode.js'
import { initStartingData } from './fillStartingData.js'
import { initAos } from './AOS.js'
import { initScrollToTop } from './scroll-to-top.js'
import { initStickyHeader } from './stickyHeader.js'
import { initSideBar } from './sidebar.js'




// Init App
document.addEventListener('DOMContentLoaded', initApp)



// Functions
function initApp() {
  initStartingData();
  initTheme();
  initAos();
  initScrollToTop();
  initStickyHeader();
  initSideBar();
}

