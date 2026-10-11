import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { compile, compileString } from "sass";

// The installed kit, or KIT_LOAD_PATH (a folder holding @emakras/vanilla-kit) to test an unreleased kit.
const modules = process.env.KIT_LOAD_PATH ?? fileURLToPath(new URL("../node_modules", import.meta.url));
const kitRoot = join(modules, "@emakras/vanilla-kit");
const kitExports = JSON.parse(readFileSync(join(kitRoot, "package.json"), "utf8")).exports;
const kitScss = dirname(join(kitRoot, kitExports["./scss"]));

// "@kit/…" is the Vite alias of "@emakras/vanilla-kit/scss/…" (vite.config.js); plain Sass needs this importer.
const kitImporter = {
  findFileUrl(url) {
    if (url !== "@kit" && !url.startsWith("@kit/")) return null;

    return pathToFileURL(join(kitScss, url.slice("@kit".length)));
  },
};

const options = { loadPaths: [fileURLToPath(new URL("../src/scss", import.meta.url))], importers: [kitImporter] };
// The kit documents itself in /** */ comments; the production minifier drops them, and so do the tests.
const withoutComments = (css) => css.replace(/\/\*[\s\S]*?\*\/\n?/g, "").trim();
const entry = (name) =>
  withoutComments(compile(fileURLToPath(new URL(`../src/scss/${name}.scss`, import.meta.url)), options).css);

test("loading the configured kit emits no CSS", () => {
  assert.equal(withoutComments(compileString('@use "settings" as kit;', options).css), "");
});

test("the app entry declares the layer order and emits reset, tokens, palettes and themes", () => {
  const css = entry("style");

  assert.match(css, /@layer reset, base, layout, components, pages;/);
  assert.match(css, /@layer reset \{/);
  assert.match(css, /--space-1: 0\.25rem/);
  assert.match(css, /--clr-primary-500: hsl\(173, 58%, 39%\)/);
  assert.match(css, /--clr-surface: var\(--clr-neutral-50\)/);
  assert.match(css, /:root\[data-theme=dark\] \{[^}]*--clr-primary: hsl\(173, 50%, 50%\)/);
});

test("themes re-tint palettes, status colors included, and set color-scheme", () => {
  const css = entry("style");
  const theme = (name) => css.split(`:root[data-theme=${name}]`)[1].split("}")[0];

  assert.match(css, /--clr-success-100-fg:/, "status colors are palettes");
  assert.match(css, /--clr-info: #0ea5e9/, "info replaced by Tailwind sky");
  assert.match(theme("dark"), /--clr-success: #66bb6a/);
  assert.match(theme("dark"), /color-scheme: dark/);
  assert.match(theme("sepia"), /--clr-primary-500: #f59e0b/, "Tailwind amber as sepia primary");
  assert.match(theme("sepia"), /color-scheme: light/);
});

test("settings overrides reach the stylesheet, showcase included", () => {
  const css = entry("style");

  assert.match(css, /\.showcase-section/, "showcase styles are in the shared pages layer");
  assert.match(css, /width >= 40rem/, "sm breakpoint override");
  assert.match(css, /padding: 0\.9em 2em/, "xl button size override");
  assert.match(css, /73\.125rem/, "container override");
});
