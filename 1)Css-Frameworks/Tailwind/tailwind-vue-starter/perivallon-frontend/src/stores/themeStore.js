// stores/theme.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
    const currentTheme = ref("light");

    function setTheme(newTheme) {
        currentTheme.value = newTheme;

        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);

        localStorage.setItem("theme", newTheme);
    }

    function toggleTheme() {
        const newTheme = currentTheme.value === "dark" ? "light" : "dark";
        setTheme(newTheme);
    }

    function initTheme() {
        const saved = localStorage.getItem("theme");
        console.log(saved);
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const initial = saved || (prefersDark ? "dark" : "light");
        setTheme(initial);
    }

    return {
        currentTheme,
        setTheme,
        toggleTheme,
        initTheme,
    };
});
