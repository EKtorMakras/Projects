import { useTheme } from "vuetify";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useThemeStore = defineStore("theme", () => {
    const theme = useTheme();

    const currentTheme = computed(() => theme.global.name.value);

    function setTheme(newTheme) {
        theme.change(newTheme);
    }

    function initTheme() {
        const startingTheme = localStorage.getItem("theme") || "light";
        setTheme(startingTheme);
    }

    function toggleTheme() {
        theme.toggle();
        localStorage.setItem("theme", theme.global.name.value);
    }

    return { theme, currentTheme, initTheme, setTheme, toggleTheme };
});
