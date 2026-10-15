import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    ...vue.configs["flat/essential"],
    ...vue.configs["flat/recommended"],
    ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],

    js.configs.recommended,

    { ignores: ["node_modules", "dist", "coverage", "*.css"] },

    {
        files: ["**/*.{js,ts,vue,cjs,mjs}"],
        plugins: { vue },
        languageOptions: {
            parser: vueParser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            // Code quality — formatting is owned by Prettier (eslint-config-prettier, applied last)
            "no-empty": "warn",
            "no-unused-vars": ["warn", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
            "no-cond-assign": ["warn", "always"],
            // Allow console/debugger during local dev; flag them only in production builds (NODE_ENV=production)
            "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
            "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
            "init-declarations": "off",
            "no-inline-comments": "off",
            camelcase: "off",

            // Vue — code quality
            "vue/comment-directive": "off",
            "vue/no-v-model-argument": "off",
            "vue/no-v-html": "off",
            "vue/require-default-prop": "off",
            "vue/component-name-in-template-casing": ["warn", "PascalCase"],
            "vue/multi-word-component-names": ["warn", { ignores: ["index", "default", "[id]"] }],
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
                    alphabetical: false,
                },
            ],
        },
    },

    eslintConfigPrettier,
];
