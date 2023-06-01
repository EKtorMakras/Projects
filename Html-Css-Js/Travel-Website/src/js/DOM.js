import { getDomElement } from "./utils";

export const dom = {
  root: document.documentElement,

  header: getDomElement('.header'),
  hamburgerIcon: getDomElement('.header__hamburger-menu'),
  headerContent: getDomElement('.header__content'),

  navList: getDomElement('.header__nav-list'),

  sections: getDomElement('.section',true),

  featureCardsContainer: getDomElement('.features__grid-container'),

  testimonialCardsContainer: getDomElement('.testimonials__grid-container'),
}