import withNuxt from "./.nuxt/eslint.config.mjs";
import pluginVue from "eslint-plugin-vue";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const indentSize = 4;

export default withNuxt([
    {
        ...pluginVue.configs["flat/vue3-recommended"],

        ignores: ["**/node_modules/**", "**/.output/**", "**/.nuxt/**", "**/dist/**", "**/coverage/**", "**/*.css"],

        rules: {
            "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
            "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

            "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "no-empty": "warn",
            "no-multiple-empty-lines": ["warn", { max: 1, maxEOF: 0 }],

            "object-curly-spacing": ["warn", "always"],
            "quote-props": ["warn", "as-needed"],
            indent: ["warn", indentSize, { SwitchCase: 1 }],
            "import/first": "off",

            "vue/script-indent": ["warn", indentSize],
            "vue/html-indent": [
                "warn",
                indentSize,
                {
                    attribute: 1,
                    baseIndent: 1,
                    closeBracket: 0,
                    alignAttributesVertically: true,
                },
            ],
            "vue/no-multiple-template-root": "off",
            "vue/no-v-model-argument": "off",
            "vue/no-v-html": "off",
            "vue/html-self-closing": ["warn", { html: { void: "always", normal: "never" } }],
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

    // ✅ TS parser for .ts files (fixes "Unexpected token" on `import type`)
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            // "@typescript-eslint/no-explicit-any": "off",
        },
    },
]);
