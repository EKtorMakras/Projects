/**
 * The only script every page loads: it starts what all pages share, then the current page's own code.
 * - A page names itself with <body data-page="…">; PAGES maps that name to its module.
 * - Page modules load with import(), so each page downloads only its own code.
 */
import { initSidebar } from "./components/sidebar.js";
import { log } from "./core/logger.js";
import { initTheme } from "./core/theme.js";

const PAGES = {
  home: () => import("./pages/home.js"),
  showcase: () => import("./pages/showcase.js"),
};

// ======== Private ======== //
async function initPage(name) {
  const loadPage = PAGES[name];

  if (!loadPage) {
    log.warn(`No page module for data-page="${name}". Add it to PAGES in src/js/app.js.`);
    return;
  }

  const page = await loadPage();

  page.init();
}

// ======== Public ======== //
initTheme();
initSidebar();
initPage(document.body.dataset.page);
