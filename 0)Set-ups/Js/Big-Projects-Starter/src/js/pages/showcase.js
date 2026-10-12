/** Code that only showcase.html needs (<body data-page="showcase">): demos of the kit. Started by src/js/app.js. */
import {
  arrChunk,
  formatCurrency,
  formatDate,
  formatRelativeDate,
  getHexColor,
  truncateString,
} from "@emakras/vanilla-kit";
import { log } from "../core/logger.js";
import { getTheme, setTheme } from "../core/theme.js";

const SELECTORS = {
  palettes: "[data-palette]",
  themeOptions: "[data-set-theme]",
  jsDemo: "#js-demo",
  replayButton: "#replay-animations",
  animatedBoxes: ".anim-box",
  indeterminate: "#indeterminate-demo",
};

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
  for (const container of document.querySelectorAll(SELECTORS.palettes)) {
    const swatches = PALETTE_STEPS.map((step) => createSwatch(container.dataset.palette, step));

    container.replaceChildren(...swatches);
  }
}

function markCurrentTheme(theme) {
  for (const button of document.querySelectorAll(SELECTORS.themeOptions)) {
    button.setAttribute("aria-pressed", String(button.dataset.setTheme === theme));
  }
}

function initThemePicker() {
  for (const button of document.querySelectorAll(SELECTORS.themeOptions)) {
    button.addEventListener("click", () => setTheme(button.dataset.setTheme));
  }
}

function renderJsDemo() {
  const list = document.querySelector(SELECTORS.jsDemo);

  if (!list) return;

  const lastWeek = new Date(Date.now() - DAYS_AGO * 24 * 60 * 60 * 1000);
  const examples = {
    "formatDate()": formatDate(),
    "formatRelativeDate(lastWeek)": formatRelativeDate(lastWeek),
    'formatCurrency(1234.5, "EUR", "el-GR")': formatCurrency(1234.5, "EUR", "el-GR"),
    'truncateString("Vanilla kit utilities", 12)': truncateString("Vanilla kit utilities", 12),
    "arrChunk([1, 2, 3, 4, 5], 2)": JSON.stringify(arrChunk([1, 2, 3, 4, 5], 2)),
    'getHexColor("primary-500")': getHexColor("primary-500"),
    'log.info("Showcase ready")': "printed in the browser console, labelled with the app name",
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
  const button = document.querySelector(SELECTORS.replayButton);

  if (!button) return;

  button.addEventListener("click", () => {
    for (const box of document.querySelectorAll(SELECTORS.animatedBoxes)) {
      const animated = box.className;

      box.className = "anim-box";
      void box.offsetWidth;
      box.className = animated;
    }
  });
}

/** The swatches show hex values of the current theme, so they render now and again on every change. */
function initPalettes() {
  renderPalettes();
  markCurrentTheme(getTheme());

  document.addEventListener("themechange", (event) => {
    renderPalettes();
    markCurrentTheme(event.detail.theme);
  });
}

// ======== Public ======== //
export function init() {
  initPalettes();
  initThemePicker();
  initAnimationReplay();
  renderJsDemo();

  // The indeterminate state exists only in JavaScript, not as an HTML attribute.
  document.querySelector(SELECTORS.indeterminate).indeterminate = true;

  log.info("Showcase ready");
}
