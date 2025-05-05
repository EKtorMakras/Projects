import theme from "./src/plugins/tailwind/index.mjs";

const { colors, opacity } = theme;

const tailwindConfig = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors,
            opacity,
        },
    },
    plugins: [],
};

export default tailwindConfig;
