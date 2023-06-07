import { dom } from './DOM.js';

export function initScrollToTop() {
  loadScrollToTopListeners();
  loadWindowScrollListener();
}


function loadScrollToTopListeners() {
  dom.scrollToTop.addEventListener('click', () => {
    window.scrollTo({
      top:0,
      left: 0,
      behavior: 'smooth'
    });
  })
}


function loadWindowScrollListener() {
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 700) {
      dom.scrollToTop.classList.remove('hidden');
    }
    else {
      dom.scrollToTop.classList.add('hidden');
    }
  })
}