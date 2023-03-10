// ======== Module Imports ======== //
import { dom , domProducts } from '../dom.js'
import { initTheme,toggleTheme } from '../darkMode.js'
import { initStartingData } from '../fillStartingData.js'
import { toggleNavListeners } from '../toggleSidebar.js';
import { toggleCartListeners } from '../cart/toggleCart.js';
import { fetchProducts } from '../fetchProducts.js'
import { setupStore, getFeaturedProducts ,store } from '../store.js';
import {displayProducts} from '../displayProducts.js';
import { setupSearch } from '../filters/search.js';
import {setupCompanies} from '../filters/companies';

import { arrGetUniqueValues } from '../utils.js'; 

// Init App
document.addEventListener('DOMContentLoaded', initApp)



// Functions
async function initApp() {
  initStartingData();
  initTheme();
  toggleNavListeners();
  toggleCartListeners();

  const products = await fetchProducts();
  if (products) {
    setupStore(products);
    displayProducts(store,domProducts.productsContainer);
    domProducts.pageLoading.style.display = 'none';
    setupSearch(store);
    setupCompanies(store);
  }

}