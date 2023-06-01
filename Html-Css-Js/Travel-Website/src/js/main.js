// Import Css
import '@/scss/style.scss'

// Packages
import 'lazysizes'

// Module Imports
import { dom } from './DOM.js';
import { initTheme,toggleTheme } from './darkMode.js'
import { initStartingData } from './fillStartingData.js'
import MobileMenu from './mobileMenu.js'
import RevealOnScroll  from './scrollEffects.js'
import StickyHeader from './stickyHeader.js';
import ClientArea from './clientArea.js';




// Init App
document.addEventListener('DOMContentLoaded', initApp)



// Functions
function initApp() {
  initStartingData();
  initTheme();
  initClasses();
}


function initClasses() {
  new MobileMenu;
  new RevealOnScroll(dom.featureCards, 80);
  new RevealOnScroll(dom.testimonialCards, 60);
  new StickyHeader;
  new ClientArea;
}



// Load modal on click
let modal;

document.querySelectorAll('.js-open-modal').forEach(btn => {
  btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (!modal) {
      import('./modal.js')
      .then((modalModule) => {
        modal = new modalModule.default()
        modal.openModal()
      })
      .catch((err) => console.log(err))
    }
    else {
      modal.openModal()
    }
  })
})



// React related code
import React from 'react'
import ReactDOM from 'react-dom';
import MyTestComponent from './react.jsx';

// ReactDOM.render(<MyTestComponent />, document.querySelector('#react-example'))