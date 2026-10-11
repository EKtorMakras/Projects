import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const fromRoot = (relativePath) => fileURLToPath(new URL(relativePath, import.meta.url));

export default defineConfig({
  // Multi-page site, not an SPA: unknown URLs return 404 instead of index.html.
  appType: "mpa",
  resolve: {
    alias: {
      "@": fromRoot("./src"),
      "~": fromRoot("./src/scss"),
      "*": fromRoot("./"),
      // SCSS shorthand for the kit: @use "@kit/palettes/tailwind" → "@emakras/vanilla-kit/scss/palettes/tailwind".
      "@kit": "@emakras/vanilla-kit/scss",
      // CSS url() resolves aliases but not package names; used by project/base/_fonts.scss.
      "@fonts": fromRoot("./node_modules/@fontsource/baloo-tamma-2/files"),
    },
  },
  css: {
    preprocessorOptions: {
      // Every SCSS file can write `@use "settings" as kit;`, whatever its folder.
      scss: { loadPaths: [fromRoot("./src/scss")] },
    },
  },
  build: {
    rollupOptions: {
      input: { main: fromRoot("./index.html"), showcase: fromRoot("./showcase.html") },
    },
  },
});
