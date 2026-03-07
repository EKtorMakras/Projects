<script setup>
import { useThemeStore } from "@/stores/useThemeStore.js";
import { useColor } from "@/composables/useColor.js";

const themeStore = useThemeStore();
const { getColor } = useColor();

function toggleTheme() {
    themeStore.toggleTheme();
}
</script>

<template>
    <v-btn
        :icon="themeStore.currentTheme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        :color="getColor('on-surface', 0.6)"
        @click="toggleTheme"
    />
</template>
