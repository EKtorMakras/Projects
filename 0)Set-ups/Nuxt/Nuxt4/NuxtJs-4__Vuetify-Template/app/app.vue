<script setup>
import { useLocaleStore } from "~/stores/useLocaleStore";
// import { useThemeStore } from "~/stores/useThemeStore";

const localeStore = useLocaleStore();
// const themeStore = useThemeStore();

// Initialize locale + theme from cookies on app mount
onMounted(() => {
    localeStore.initLocale();
    // themeStore.initTheme();
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <BaseNotificationContainer />
</template>
