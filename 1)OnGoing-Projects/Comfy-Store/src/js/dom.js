import { getDomElement } from "./utils";

export const dom = {
  root: document.documentElement,

  navLinks: getDomElement('.nav-links'),
  toggleNavBtn: getDomElement('.toggle-nav'),
  closeNavBtn: getDomElement('.sidebar-close'),

  sidebarLinks: getDomElement('.sidebar-links'),
  sidebarOverlay: getDomElement('.sidebar-overlay'),

  cartOverlay: getDomElement('.cart-overlay'),
  toggleCartBtn: getDomElement('.toggle-cart'),
  closeCartBtn: getDomElement('.cart-close'),
}

export const domMain = {
  featuredCenter: getDomElement('.featured-center'),
}

export const domProducts = {
  productsContainer: getDomElement('.products-container'),
  pageLoading: getDomElement('.products-page-loading'),
  searchForm: getDomElement('.search-form'),
  searchInput: getDomElement('.search-input'),
  searchClearIcon: getDomElement('.search-clear-icon')
}