<script setup>
import { useThemeStore } from "@/stores/useThemeStore.js";
import { useColor } from "@/composables/useColor.js";

defineProps({
    size: { type: String, default: "default" },
    color: { type: String, default: null },
});

const themeStore = useThemeStore();
const { getColor } = useColor();

const isDev = import.meta.dev;

function toggleTheme() {
    themeStore.toggleTheme();
}
</script>

<template>
    <v-btn
        v-if="isDev"
        :icon="themeStore.currentTheme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        :size="size"
        :color="color ?? getColor('on-surface', 0.6)"
        variant="text"
        @click="toggleTheme"
    />
</template>
