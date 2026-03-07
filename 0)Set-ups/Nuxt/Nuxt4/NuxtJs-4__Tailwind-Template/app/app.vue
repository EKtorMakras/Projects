<script setup>
import { useThemeStore } from "@/stores/useThemeStore";
import { useLocaleStore } from "@/stores/useLocaleStore";

const themeStore = useThemeStore();
const localeStore = useLocaleStore();

// Initialize theme and locale on app load
onMounted(() => {
    themeStore.initTheme();
    localeStore.initLocale();
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <BaseNotificationContainer />
</template>
