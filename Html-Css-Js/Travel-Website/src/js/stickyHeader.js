import throttle  from 'lodash/throttle.js';
import debounce  from 'lodash/debounce.js';
import {dom} from './DOM.js';
import { browserHeight } from './data.js';


class StickyHeader {

  constructor() {
    this.scrollThreshold = 60;
    this.browserHeight = browserHeight;
    this.previousScrollY = window.scrollY;
    this.scrollDirection = 'down';
    this.events();
  }


  events() {
    window.addEventListener('scroll', throttle(() => {
      this.runOnScroll()
    }, 200));
    window.addEventListener('resize', debounce(() => {
      this.browserHeight = window.innerHeight;
    }, 300));
  }


  runOnScroll() {
    this.determineScrollDirection();

    if (window.scrollY > this.scrollThreshold) {
      dom.header.classList.add('header--dark');
    }
    else {
      dom.header.classList.remove('header--dark');
    }

    dom.sections.forEach((section) => {
      this.calcSection(section);
    });
  }


  calcSection(el) {

    if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {

      let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
      let matchingLink = el.getAttribute('data-matching-link');

      if ((scrollPercent < 22 && scrollPercent > -0.1 && this.scrollDirection === 'down')
        || (scrollPercent < 33 &&  this.scrollDirection === 'up')) {
        
        document.querySelectorAll(`.header__nav-link:not(${matchingLink})`).forEach(link => {
          link.classList.remove('active');
        })
        document.querySelector(matchingLink).classList.add('active');
      }

      else if (scrollPercent > 30) {
        document.querySelector(matchingLink).classList.remove('active');
      }
    }
  }


  determineScrollDirection() {
    if (window.scrollY > this.previousScrollY) {
      this.scrollDirection = 'down';
    }
    else {
      this.scrollDirection = 'up';
    }

    this.previousScrollY = window.scrollY;
  }
}


export default StickyHeader;