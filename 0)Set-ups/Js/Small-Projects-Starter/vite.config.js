import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const fromRoot = (relativePath) => fileURLToPath(new URL(relativePath, import.meta.url));

export default defineConfig({
  // Multi-page site, not an SPA: unknown URLs return 404 instead of index.html.
  appType: "mpa",
  resolve: {
    alias: {
      "@": fromRoot("./src"),
      "~": fromRoot("./"),
      // SCSS shorthand for the kit: @use "@kit/palettes/tailwind" -> "@emakras/vanilla-kit/scss/palettes/tailwind".
      "@kit": "@emakras/vanilla-kit/scss",
    },
  },
});
