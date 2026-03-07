// ======= Shared Colors Across Both Themes ======= //
const sharedColors = {
    accent: "#FFE387",
    info: "#2196F3",
    success: "#4CAf50",
    error: "#FF5252",
    warning: "#FFC107",
};

// ======= Light Theme Colors ======= //
const light = {
    dark: false,
    colors: {
        ...sharedColors,
        primary: "#061257",
        secondary: "#B1D8FF",
        background: "#fafcfd",
        surface: "#f8fafc",
        "surface-variant": "#e2e8f0",
        "surface-variant-light": "#f1f5f9",
        "surface-variant-dark": "#cbd5e1",
        "on-background": "#0f172a",
        "on-surface": "#0f172a",
    },
};

// ======= Dark Theme Colors ======= //
const dark = {
    dark: true,
    colors: {
        ...sharedColors,
        primary: "#8FA2FF",
        secondary: "#6EC6FF",
        background: "#0b101d",
        surface: "#0f172a",
        "surface-variant": "#334155",
        "surface-variant-light": "#64748b",
        "surface-variant-dark": "#293444",
        "on-background": "#f8fafc",
        "on-surface": "#f8fafc",
    },
};

const variations = {
    colors: ["primary", "secondary", "accent", "info", "success", "warning", "error"], //Here you define which colors should have variations as well as how many dark/light variation each color should have
    lighten: 3,
    darken: 4,
};

export default {
    defaultTheme: "light",
    variations,
    themes: {
        light,
        dark,
    },
};
