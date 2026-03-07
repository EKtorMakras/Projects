/**
 * Sidebar Toggle Functionality
 */
import { dom } from "../libraries/DOM";

export function initSidebar() {
  const { hamburgerBtn, sidebar, overlay, app } = dom;

  if (!hamburgerBtn || !sidebar || !overlay) {
    console.warn("Sidebar elements not found");
    return;
  }

  // Toggle sidebar visibility
  hamburgerBtn.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar--open");
    overlay.classList.toggle("overlay--active");
    hamburgerBtn.classList.toggle("hamburger-btn--active");
    app.classList.toggle("app--sidebar-open");
  });

  // Close sidebar when clicking on overlay
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("sidebar--open");
    overlay.classList.remove("overlay--active");
    hamburgerBtn.classList.remove("hamburger-btn--active");
    app.classList.remove("app--sidebar-open");
  });

  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnHamburger = hamburgerBtn.contains(e.target);
    const isClickOnOverlay = overlay.contains(e.target);

    if (
      !isClickInsideSidebar &&
      !isClickOnHamburger &&
      !isClickOnOverlay &&
      sidebar.classList.contains("sidebar--open")
    ) {
      sidebar.classList.remove("sidebar--open");
      overlay.classList.remove("overlay--active");
      hamburgerBtn.classList.remove("hamburger-btn--active");
      app.classList.remove("app--sidebar-open");
    }
  });

  // Close sidebar on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("sidebar--open")) {
      sidebar.classList.remove("sidebar--open");
      overlay.classList.remove("overlay--active");
      hamburgerBtn.classList.remove("hamburger-btn--active");
      app.classList.remove("app--sidebar-open");
    }
  });
}
