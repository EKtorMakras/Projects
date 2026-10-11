import type { ThemeDefinition } from "vuetify";

const sharedColors = {
    accent: "#FFE387",
    info: "#3B82F6",
    error: "#EF4444",
    success: "#22C55E",
    warning: "#F59E0B",
};

const lightTheme: ThemeDefinition = {
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

const darkTheme: ThemeDefinition = {
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
    colors: [
        "primary",
        "secondary",
        "error",
        "success",
        "warning",
        "info",
        "accent",
    ],
    lighten: 4,
    darken: 4,
};

export const theme = {
    defaultTheme: "light",
    variations,
    themes: {
        light: lightTheme,
        dark: darkTheme,
    },
};
