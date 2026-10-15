import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier";

// Formatting (indent, quotes, semicolons, line width, self-closing tags, …) is owned by Prettier
// (see prettier.config.mjs). ESLint only covers code quality; eslint-config-prettier is applied last.
export default withNuxt(
    {
        ignores: ["**/node_modules/**", "**/.output/**", "**/.nuxt/**", "**/dist/**", "**/coverage/**", "**/*.css"],
    },
    {
        languageOptions: {
            globals: {
                useI18n: "readonly",
            },
        },
        rules: {
            // Allow console/debugger during local dev; flag them only in production builds (NODE_ENV=production)
            "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
            "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

            "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "no-empty": "warn",
            "import/first": "off",

            // Vue — code quality
            "vue/no-multiple-template-root": "off",
            "vue/no-v-model-argument": "off",
            "vue/no-v-html": "off",
            "vue/require-default-prop": "off",
            "vue/component-name-in-template-casing": ["warn", "PascalCase"],
            "vue/valid-v-slot": ["warn", { allowModifiers: true }],
            "vue/attributes-order": [
                "warn",
                {
                    order: [
                        "DEFINITION",
                        "LIST_RENDERING",
                        "CONDITIONALS",
                        "RENDER_MODIFIERS",
                        "GLOBAL",
                        ["UNIQUE", "SLOT"],
                        "TWO_WAY_BINDING",
                        "OTHER_DIRECTIVES",
                        "OTHER_ATTR",
                        "EVENTS",
                        "CONTENT",
                    ],
                },
            ],
            "vue/block-lang": ["warn", { script: { lang: "js" } }],
        },
    },
    eslintConfigPrettier
);
