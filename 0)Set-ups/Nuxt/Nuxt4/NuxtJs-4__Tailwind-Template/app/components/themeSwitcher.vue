<script setup>
import { useThemeStore } from "@/stores/useThemeStore";

const themeStore = useThemeStore();

const themeIcons = {
    light: "☀️",
    dark: "🌙",
    crimson: "🔴",
};

const themeLabels = {
    light: "Light",
    dark: "Dark",
    crimson: "Crimson",
};
</script>

<template>
    <div class="inline-flex items-center gap-2 p-1 bg-surface-variant-dark rounded-lg">
        <button
            v-for="theme in themeStore.availableThemes"
            :key="theme"
            :class="[
                'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                'hover:bg-card/50',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                themeStore.currentTheme === theme
                    ? 'bg-card shadow-sm text-surface-fg-high-emphasis'
                    : 'text-surface-fg-low-emphasis'
            ]"
            @click="themeStore.setTheme(theme)"
        >
            <span class="mr-1.5">{{ themeIcons[theme] }}</span>
            {{ themeLabels[theme] }}
        </button>
    </div>
</template>
