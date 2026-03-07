<script setup>
import BaseNotificationContainer from "@/components/base/notifications/BaseNotificationContainer.vue";
import { useThemeStore } from "@/stores/useThemeStore.js";
import { useLocaleStore } from "@/stores/useLocaleStore.js";

const themeStore = useThemeStore();
const localeStore = useLocaleStore();

// ======== On Created ======== //
themeStore.initTheme();
localeStore.initLocale();
</script>

<template>
    <BaseNotificationContainer />
    <RouterView />
</template>

<style scoped></style>
