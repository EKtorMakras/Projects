// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getDomElement,
} from '../utils.js';
import { showCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import { addToCartDOM } from './addToCartDOM.js';
// set items

export function addToCart(id) {
  showCart()
};
