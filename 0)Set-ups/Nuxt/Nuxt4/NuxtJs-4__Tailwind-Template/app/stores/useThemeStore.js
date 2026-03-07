import { defineStore } from "pinia";
import { ref, computed } from "vue";
import tokens from "@/design-system/tokens.js";

export const useThemeStore = defineStore("theme", () => {
    const currentTheme = ref("light");
    const themeCookie = useCookie("theme");

    // Get available themes dynamically from tokens
    const availableThemes = computed(() => {
        return Object.keys(tokens.colors?.themes || {});
    });

    function setTheme(newTheme) {
        // Validate theme exists
        if (!availableThemes.value.includes(newTheme)) {
            console.warn(
                `Theme "${newTheme}" not found. Defaulting to "light".`,
            );
            newTheme = "light";
        }

        currentTheme.value = newTheme;
        themeCookie.value = newTheme;

        // Only update DOM on client-side
        if (import.meta.client) {
            document.documentElement.setAttribute("data-theme", newTheme);
        }
    }

    function cycleTheme() {
        const themes = availableThemes.value;
        const currentIndex = themes.indexOf(currentTheme.value);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    }

    function initTheme() {
        const saved = themeCookie.value;
        const initial =
            saved && availableThemes.value.includes(saved) ? saved : "light";
        setTheme(initial);
    }

    return {
        currentTheme,
        availableThemes,
        setTheme,
        cycleTheme,
        initTheme,
    };
});
