<script setup>
import { useI18n } from "vue-i18n";

definePageMeta({
    layout: "default",
});

const { t } = useI18n();
</script>

<template>
    <div class="p-8">
        <h1 class="mb-4 text-primary-600">{{ t("aboutPage.title") }}</h1>
        <p>{{ t("aboutPage.description") }}</p>

        <h2 class="mt-8 mb-4">{{ t("aboutPage.features") }}</h2>
        <ul class="list-disc pl-8 mb-8">
            <li class="mb-2">Nuxt 4</li>
            <li class="mb-2">Vue 3</li>
            <li class="mb-2">Pinia</li>
            <li class="mb-2">Vue i18n</li>
            <li class="mb-2">Day.js</li>
            <li class="mb-2">SCSS</li>
        </ul>

        <NuxtLink
            to="/"
            class="text-primary-600 underline font-medium hover:text-primary-700"
        >
            {{ t("home") }}
        </NuxtLink>
    </div>
</template>
