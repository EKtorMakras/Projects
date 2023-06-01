import { dom } from './DOM.js';

class MobileMenu {
  constructor() {
    this.events()
  }


  events() {
    dom.hamburgerIcon.addEventListener('click', () => {
      this.toggleMenu()
    })
    window.addEventListener('click', (evt) => {
      this.checkClickOutside(evt)
    })
  }


  toggleMenu() {
    dom.header.classList.toggle('header--mobile')
  }
  
  checkClickOutside(evt) {
    if (!evt.target.closest('.header')) {
      dom.header.classList.remove('header--mobile')
    }
  }
}

export default MobileMenu;

