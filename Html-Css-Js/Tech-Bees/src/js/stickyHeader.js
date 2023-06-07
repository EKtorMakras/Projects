import { dom } from './DOM.js';



export function initStickyHeader() { 

  loadStickyHeaderListeners();
  observeSectionIntersecting();
}



// Sticky Header
function loadStickyHeaderListeners() { 
  window.addEventListener('scroll', () => { 

    const scrollHeight = window.scrollY;
    const navHeight = dom.mainNav.getBoundingClientRect().height;

    if (scrollHeight > navHeight) {
      dom.mainNav.classList.add('sticky');
      dom.headerContent.classList.add('sticky-nav');
    }
    else{
      dom.mainNav.classList.remove('sticky');
      dom.headerContent.classList.remove('sticky-nav');
    }
  })
}



// Highlight matching nav link when scrolled to section
function observeSectionIntersecting() {

  const observeOptions = {
    threshold: 0,
    rootMargin: '-40% 0px -55%'
  };

  const observer = new IntersectionObserver(observeEntries,observeOptions);
 
  dom.sections.forEach(section => { 
    observer.observe(section);
  })
}



function observeEntries(entries) { 
  entries.forEach(entry => {
    const target = entry.target;
    let id = target.dataset.id;
    const matchingLinks = document.querySelectorAll(`[data-id=${id}]`);
    
    if (matchingLinks) {
      if (entry.isIntersecting) {
        matchingLinks.forEach(link => { 
          link.classList.add('active');
        })
      }
      else {
        matchingLinks.forEach(link => { 
          link.classList.remove('active');
        })
      }
    }
   
  })
}



