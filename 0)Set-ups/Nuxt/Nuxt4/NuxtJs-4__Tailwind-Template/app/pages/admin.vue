<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Protected route - requires authentication
definePageMeta({
    requiresAuth: true,
    middleware: "auth",
});
</script>

<template>
    <div class="p-8 max-w-7xl mx-auto">
        <h1 class="mb-4 text-primary-600">{{ t("admin.title") }}</h1>
        <p>{{ t("admin.description") }}</p>

        <div class="flex flex-col items-center justify-center mt-8 p-8 bg-surface-variant rounded-lg">
            <h2 class="mb-4">{{ t("admin.protectedContent") }}</h2>
            <p>{{ t("admin.message") }}</p>
        </div>
    </div>
</template>
