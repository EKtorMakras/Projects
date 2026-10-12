/**
 * Selectors of the app shell, shared by every page: the one place to look up or rename an element.
 * - Only strings: each module queries its elements when it starts, never on import.
 * - Selectors used by a single page stay at the top of that page's entry.
 */
export const SELECTORS = {
  themeButton: "#theme-btn",
  menuButton: "#hamburger-btn",
  sidebar: "#sidebar",
  overlay: "#overlay",
};
