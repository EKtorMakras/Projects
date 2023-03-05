import { getDomElement } from "./utils";

export const dom = {
  root: document.documentElement,
  navLinks: getDomElement('.nav-links'),
  toggleNavBtn: getDomElement('.toggle-nav'),
  closeNavBtn: getDomElement('.sidebar-close'),
  sidebarLinks: getDomElement('.sidebar-links'),
  sidebarOverlay: getDomElement('.sidebar-overlay'),
}