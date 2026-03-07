/**
 * =========================================================
 * 🎨 DESIGN SYSTEM SOURCE OF TRUTH
 *
 * Modify colors, themes, opacity, and other categories here.
 * All generated files derive from this file.
 *
 * Do NOT edit files inside /generated.
 * =========================================================
 */

export default {
    /**
     * COLORS
     * Defines base colors with shade generation
     */
    colors: {
        shadeSteps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
        foreground: {
            light: "#f8fafc",
            dark: "#0f172a",
        },
        // Base color palette (will be expanded to full shade range)
        palette: {
            primary: "#038cb3",
            success: "#15803d",
            error: "#b91c1c",
        },
        // Flat colors (no shades, used as-is: bg-warning, bg-info, etc.)
        flat: {
            warning: "#f59e0b",
            info: "#0ea5e9",
        },
        // Semantic theme tokens (context-specific colors)
        themes: {
            light: {
                // Flat semantic tokens
                surface: "#f8fafc",
                "surface-variant": "#e2e8f0",
                "surface-variant-light": "#f1f5f9",
                "surface-variant-dark": "#cbd5e1",
                "surface-fg": "#0f172a",
                "surface-fg-low-emphasis": "#334155",
                "surface-fg-high-emphasis": "#020617",
                sidebar: "#eaeef5",
                card: "#fbfcfd",
            },
            dark: {
                // Theme-specific palette
                palette: {
                    primary: "#35a3c2",
                },
                flat: {
                    warning: "#dd8e0a",
                },
                // Flat semantic tokens
                surface: "#0f172a",
                "surface-variant": "#334155",
                "surface-variant-light": "#64748b",
                "surface-variant-dark": "#293444",
                "surface-fg": "#f8fafc",
                "surface-fg-high-emphasis": "#fff",
                "surface-fg-low-emphasis": "#cbd5e1",
                sidebar: "#272e3f",
                card: "#1e293b",
            },
            crimson: {
                // Theme-specific palette (different primary!)
                palette: {
                    primary: "#dc2626",
                },
                // Flat semantic tokens
                surface: "#fef2f2",
                "surface-variant": "#fee2e2",
                "surface-variant-light": "#fecaca",
                "surface-variant-dark": "#fca5a5",
                "surface-fg": "#7f1d1d",
                "surface-fg-high-emphasis": "#450a0a",
                "surface-fg-low-emphasis": "#991b1b",
                sidebar: "#fca5a5",
                card: "#ffe4e6",
            },
        },
    },

    /**
     * OPACITIES
     * Defines opacity values for various interaction states
     */
    opacities: {
        hover: "0.08",
        focus: "0.12",
        pressed: "0.16",
        disabled: "0.38",
        low: "0.12",
        medium: "0.55",
        high: "0.88",
    },
};
