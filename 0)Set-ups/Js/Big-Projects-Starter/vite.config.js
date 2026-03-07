/* eslint-disable no-undef */
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src/scss"),
      "*": path.resolve(__dirname, "./"),
    },
  },
});
