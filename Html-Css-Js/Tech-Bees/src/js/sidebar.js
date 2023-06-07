import { dom } from './DOM.js';
import { getDomElement } from './utils.js';


export function initSideBar() {
  loadHamburgerMenuListeners();
  loadOverlayListeners();
  loadCLoseBtnListeners();
  loadEscapeKeyListeners();
  loadSidebarNavLinksListeners();
}


function loadHamburgerMenuListeners() {  

  dom.hamburgerMenu.addEventListener('click', () => {
    toggleSidebar();
  })
}


function loadOverlayListeners() { 
  dom.overlay.addEventListener('click', () => { 
    closeSidebar();
  })
}


function loadCLoseBtnListeners() { 
  dom.sidebarCloseBtn.addEventListener('click', () => { 
    closeSidebar();
  })
}


function loadEscapeKeyListeners() {
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && dom.sidebar.classList.contains('open')) {
      closeSidebar();
    }
  })
}


function loadSidebarNavLinksListeners() { 
  const sidebarNavLinks = getDomElement('.sidebar-nav__list a',true)
  
  sidebarNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeSidebar();
    })
  });
}


// Open/Close Sidebar
function openSidebar() {
  dom.sidebar.classList.add('open');
  dom.overlay.classList.remove('hidden');
}

function closeSidebar() {
  dom.sidebar.classList.remove('open');
  dom.overlay.classList.add('hidden');
}

function toggleSidebar() {
  dom.sidebar.classList.toggle('open');
  dom.overlay.classList.toggle('hidden');
}