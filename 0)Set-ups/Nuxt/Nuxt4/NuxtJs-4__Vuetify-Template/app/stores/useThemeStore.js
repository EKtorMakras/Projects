import { useTheme } from "vuetify";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useThemeStore = defineStore("theme", () => {
    const theme = useTheme();
    const themeCookie = useCookie("theme");

    const currentTheme = computed(() => theme.global.name.value);

    function setTheme(newTheme) {
        theme.change(newTheme);
        themeCookie.value = newTheme;
    }

    function initTheme() {
        if (!import.meta.dev) {
            setTheme("light");
            return;
        }
        const startingTheme = themeCookie.value || "light";
        setTheme(startingTheme);
    }

    function toggleTheme() {
        theme.toggle();
        themeCookie.value = theme.global.name.value;
    }

    return { theme, currentTheme, initTheme, setTheme, toggleTheme };
});
