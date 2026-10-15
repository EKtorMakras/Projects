import type { ThemeDefinition } from "vuetify";

const sharedColors = {
    primary: "#005EA2",
    secondary: "#B1D8FF",
    accent: "#047065",
};

const foreground = {
    light: "#1f2532",
    dark: "#f8fafc",
};

const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        ...sharedColors,

        neutral: "#212D38",

        background: "#f8f8f9",
        "background-alt": "#f0f2f5",
        surface: "#FFFFFF",
        "surface-variant": "#e2e8f0",
        "surface-variant-light": "#f4f7fa",
        "surface-variant-dark": "#cbd5e1",

        "on-background": foreground.light,
        "on-surface": foreground.light,
        "on-surface-variant": foreground.light,
        "on-surface-variant-light": foreground.light,
        "on-surface-variant-dark": foreground.light,
    },
};

const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        ...sharedColors,

        neutral: "#212D38",

        background: "#0b101d",
        "background-alt": "#141a2a",
        surface: "#1a1a1a",
        "surface-variant": "#334155",
        "surface-variant-light": "#5a687d",
        "surface-variant-dark": "#293444",

        "on-background": foreground.dark,
        "on-surface": foreground.dark,
        "on-surface-variant": foreground.dark,
        "on-surface-variant-light": foreground.dark,
        "on-surface-variant-dark": foreground.dark,
    },
};

const variations = {
    colors: ["primary", "secondary", "accent", "neutral", "excel"],
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
