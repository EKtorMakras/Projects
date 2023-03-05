// Import Css
// import '@/scss/style.scss'

// ======== Module Imports ======== //

// global imports
import './toggleSidebar.js';
import './cart/toggleCart.js';
import './cart/setupCart.js';

// specific imports
import { initLs , getDomElement } from './utils.js'
import { initTheme,toggleTheme } from './darkMode.js'
import { initStartingData } from './fillStartingData.js'
import { fetchProducts } from './fetchProducts.js'
import { setupStore, store } from './store.js';
import {displayProducts} from './displayProducts.js';
import { toggleNavListeners } from './toggleSidebar.js';




// Init App
document.addEventListener('DOMContentLoaded', initApp)



// Functions
function initApp() {
  initStartingData()
  initLs()
  initTheme()
  toggleNavListeners()
}

