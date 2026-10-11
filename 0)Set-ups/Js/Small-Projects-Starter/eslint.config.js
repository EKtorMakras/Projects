import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import jsonc from "eslint-plugin-jsonc";
import globals from "globals";
import prettier from "eslint-config-prettier";

const production = process.env.NODE_ENV === "production";

// Prettier owns formatting; ESLint only checks correctness.
export default defineConfig([
  globalIgnores(["**/node_modules/**", "**/dist/**", "**/coverage/**", "public/**"]),
  ...jsonc.configs["flat/recommended-with-jsonc"],
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: "latest" },
    rules: {
      "no-empty": "warn",
      "no-unused-vars": ["warn", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
      "no-cond-assign": ["warn", "always"],
      "no-console": production ? "warn" : "off",
      "no-debugger": production ? "warn" : "off",
    },
  },
  {
    files: ["src/**/*.js"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["*.{js,mjs,cjs}", "tests/**/*.{js,mjs}"],
    languageOptions: { globals: globals.node },
  },
  prettier,
]);
