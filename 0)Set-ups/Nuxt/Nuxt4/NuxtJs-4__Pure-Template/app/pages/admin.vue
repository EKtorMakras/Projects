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
    <div class="admin-page">
        <h1>{{ t("admin.title") }}</h1>
        <p>{{ t("admin.description") }}</p>

        <div class="admin-content">
            <h2>{{ t("admin.protectedContent") }}</h2>
            <p>{{ t("admin.message") }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.admin-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    h1 {
        margin-bottom: 1rem;
        color: var(--color-primary);
    }

    .admin-content {
        @include flex-center;
        flex-direction: column;
        margin-top: 2rem;
        padding: 2rem;
        background-color: #f5f5f5;
        border-radius: 8px;

        h2 {
            margin-bottom: 1rem;
        }
    }
}
</style>
