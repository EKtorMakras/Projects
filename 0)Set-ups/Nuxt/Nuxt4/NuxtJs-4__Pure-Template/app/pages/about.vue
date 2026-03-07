<script setup>
import { useI18n } from "vue-i18n";

definePageMeta({
    layout: "default",
});

const { t } = useI18n();
</script>

<template>
    <div class="about-page">
        <h1>{{ t('aboutPage.title') }}</h1>
        <p>{{ t('aboutPage.description') }}</p>

        <h2>{{ t('aboutPage.features') }}</h2>
        <ul>
            <li>Nuxt 4</li>
            <li>Vue 3</li>
            <li>Pinia</li>
            <li>Vue i18n</li>
            <li>Day.js</li>
            <li>SCSS</li>
        </ul>

        <NuxtLink to="/">
            {{ t('home') }}
        </NuxtLink>
    </div>
</template>

<style scoped lang="scss">
.about-page {
    padding: 2rem;

    h1 {
        margin-bottom: 1rem;
        color: #061257;
    }

    h2 {
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    ul {
        list-style: disc;
        padding-left: 2rem;
        margin-bottom: 2rem;

        li {
            margin-bottom: 0.5rem;
        }
    }

    a {
        color: #061257;
        text-decoration: underline;
        font-weight: 500;

        &:hover {
            color: #0a1a75;
        }
    }
}
</style>
