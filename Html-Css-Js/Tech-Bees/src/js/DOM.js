import { getDomElement } from "./utils";
import { teamMembers } from './data';

export const dom = {
  root: document.documentElement,
  anchorPoints: getDomElement('.anchor-point',true),
  sections: getDomElement('.section',true),


  // Header 
  mainNav: getDomElement('.main-nav'),
  mainNavList: getDomElement('.main-nav__list'),
  headerContent: getDomElement('.header__content'),
  hamburgerMenu: getDomElement('.hamburger-menu'),

  // Sidebar
  overlay: getDomElement('.overlay'),
  sidebar: getDomElement('.sidebar'),
  sidebarNavList: getDomElement('.sidebar-nav__list'),
  sidebarNavLinks: getDomElement('.sidebar-nav__list a',true),
  sidebarCloseBtn: getDomElement('.sidebar__close-btn'),

  // Services
  servicesBoxesWrapper: getDomElement('.services__boxes'),

  // Records
  recordsBoxesWrapper: getDomElement('.records__boxes'),

  // Projects
  projectsGallery: getDomElement('.projects__gallery'),

  // Team
  teamMembers: getDomElement('.team__members'),

  // Testimonials
  testimonialsWrapper: getDomElement('.testimonials__wrapper'),

  // Blog
  blogsWrapper: getDomElement('.blogs__wrapper'),

  // Footer
  footerColumns: getDomElement('.footer__column',true),
  footerSocials: getDomElement('.footer__socials-wrapper'),

  // Scroll to top
  scrollToTop: getDomElement('.scroll-to-top'),

  // Theme switcher
  themeSwitcher: getDomElement('.theme__checkbox',true),
}