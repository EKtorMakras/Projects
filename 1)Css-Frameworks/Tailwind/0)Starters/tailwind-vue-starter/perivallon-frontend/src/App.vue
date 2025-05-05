<script setup>
import ThemeToggleBtn from "@/components/ThemeToggleBtn.vue";
import LocaleToggleMenu from "@/components/LocaleToggleMenu.vue";
import { useThemeStore } from "./stores/themeStore";
import { useLocaleStore } from "@/stores/localeStore";

const { initTheme } = useThemeStore();
const { initLocale } = useLocaleStore();

initTheme();
initLocale();
</script>

<template>
    <div class="p-24">
        <ThemeToggleBtn class="my-5" />
        <LocaleToggleMenu />
        <RouterView />
    </div>
</template>

<style scoped></style>
