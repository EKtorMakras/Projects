/* eslint-env node */
export default {
    plugins: ["prettier-plugin-tailwindcss"],
    tailwindStylesheet: "./src/assets/css/main.css",
    tailwindConfig: "./tailwind.config.js",
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    bracketSpacing: true,
    bracketSameLine: false,
    useTabs: false,
    endOfLine: "auto",
    singleAttributePerLine: true,
    printWidth: 120,
};
