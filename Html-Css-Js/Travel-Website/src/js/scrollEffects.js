import throttle  from 'lodash/throttle.js';
import debounce  from 'lodash/debounce.js';
import { dom } from './DOM.js';
import { browserHeight } from './data.js';


class RevealOnScroll {

  constructor(elements, thresholdPercent) {
    this.thresholdPercent = thresholdPercent;
    this.itemsToReveal = elements;
    this.browserHeight = browserHeight;
    this.hideInitially();
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }


  events() {
    window.addEventListener('scroll', this.scrollThrottle);
    window.addEventListener('resize', debounce(() => {
      this.browserHeight = window.innerHeight;
    }, 300));
  }


  hideInitially() {
    this.itemsToReveal.forEach(item => {
      item.classList.add('hidden');
      item.isRevealed = false;
    });
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }


  calcCaller() {
    this.itemsToReveal.forEach(item => {
      if (!item.isRevealed) {
        this.calculateIfScrolledTo(item);
      }
    });
  }


  calculateIfScrolledTo(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
      if (scrollPercent < this.thresholdPercent) {
      el.classList.add('visible');
      el.classList.remove('hidden');
      el.isRevealed = true;
        if (el.isLastItem) {
          window.removeEventListener('scroll',this.scrollThrottle)
        }
      }
     }
    }
}


export default RevealOnScroll;