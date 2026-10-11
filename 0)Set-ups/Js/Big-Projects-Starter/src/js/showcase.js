/** Showcase page: shared app behavior plus demos of the kit's JavaScript utilities. */
import "./main.js";
import themeManager from "./libraries/darkMode";
import {
  arrChunk,
  formatCurrency,
  formatDate,
  formatRelativeDate,
  getHexColor,
  truncateString,
} from "@emakras/vanilla-kit";

const PALETTE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const DAYS_AGO = 3;

// ======== Private ======== //
function createSwatch(palette, step) {
  const swatch = document.createElement("div");
  const token = `${palette}-${step}`;

  swatch.className = "swatch";
  swatch.style.background = `var(--clr-${token})`;
  swatch.style.color = `var(--clr-${token}-fg)`;
  swatch.textContent = `${step} ${getHexColor(token) ?? ""}`;

  return swatch;
}

function renderPalettes() {
  for (const container of document.querySelectorAll("[data-palette]")) {
    const swatches = PALETTE_STEPS.map((step) => createSwatch(container.dataset.palette, step));

    container.replaceChildren(...swatches);
  }
}

function markCurrentTheme(theme) {
  for (const button of document.querySelectorAll("[data-set-theme]")) {
    button.setAttribute("aria-pressed", String(button.dataset.setTheme === theme));
  }
}

function initThemePicker() {
  for (const button of document.querySelectorAll("[data-set-theme]")) {
    button.addEventListener("click", () => themeManager.setTheme(button.dataset.setTheme));
  }
}

function renderJsDemo() {
  const list = document.getElementById("js-demo");

  if (!list) return;

  const lastWeek = new Date(Date.now() - DAYS_AGO * 24 * 60 * 60 * 1000);
  const examples = {
    "formatDate()": formatDate(),
    "formatRelativeDate(lastWeek)": formatRelativeDate(lastWeek),
    'formatCurrency(1234.5, "EUR", "el-GR")': formatCurrency(1234.5, "EUR", "el-GR"),
    'truncateString("Vanilla kit utilities", 12)': truncateString("Vanilla kit utilities", 12),
    "arrChunk([1, 2, 3, 4, 5], 2)": JSON.stringify(arrChunk([1, 2, 3, 4, 5], 2)),
    'getHexColor("primary-500")': getHexColor("primary-500"),
  };

  for (const [call, result] of Object.entries(examples)) {
    const term = document.createElement("dt");
    const description = document.createElement("dd");

    term.textContent = call;
    description.textContent = result;
    list.append(term, description);
  }
}

/** Restarts the play-once animations: removing the class and adding it back after a reflow replays them. */
function initAnimationReplay() {
  const button = document.getElementById("replay-animations");

  if (!button) return;

  button.addEventListener("click", () => {
    for (const box of document.querySelectorAll(".anim-box")) {
      const animated = box.className;

      box.className = "anim-box";
      void box.offsetWidth;
      box.className = animated;
    }
  });
}

// ======== Public ======== //
// The swatches show hex values of the current theme, so they render again on every change.
document.addEventListener("themechange", (event) => {
  renderPalettes();
  markCurrentTheme(event.detail.theme);
});

document.addEventListener("DOMContentLoaded", () => {
  initThemePicker();
  initAnimationReplay();
  renderJsDemo();
});
