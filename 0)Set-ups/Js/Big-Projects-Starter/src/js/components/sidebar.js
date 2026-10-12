/** Off-canvas menu for small screens: the menu button opens it; the overlay and Escape close it. */
import { SELECTORS } from "../core/selectors.js";

// ======== Private ======== //
function setOpen(elements, open) {
  const { button, sidebar, overlay } = elements;

  sidebar.classList.toggle("sidebar--open", open);
  overlay.classList.toggle("overlay--active", open);
  button.setAttribute("aria-expanded", String(open));
}

// ======== Public ======== //
export function initSidebar() {
  const elements = {
    button: document.querySelector(SELECTORS.menuButton),
    sidebar: document.querySelector(SELECTORS.sidebar),
    overlay: document.querySelector(SELECTORS.overlay),
  };

  if (!elements.button || !elements.sidebar || !elements.overlay) return;

  elements.button.addEventListener("click", () => {
    setOpen(elements, !elements.sidebar.classList.contains("sidebar--open"));
  });

  elements.overlay.addEventListener("click", () => setOpen(elements, false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(elements, false);
  });
}
