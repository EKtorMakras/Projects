<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Protected route - requires authentication
definePageMeta({
    requiresAuth: true,
    middleware: 'auth'
});
</script>

<template>
    <v-container max-width="1200">
        <v-card class="mt-8 mb-6 pa-6">
            <v-card-title class="text-h3 mb-4">
                {{ t('admin.title') }}
            </v-card-title>
            <v-card-text class="text-body-1">
                {{ t('admin.description') }}
            </v-card-text>
        </v-card>

        <v-card class="pa-6 mb-6">
            <v-card-title class="text-h5 mb-4">
                {{ t('admin.protectedContent') }}
            </v-card-title>
            <v-card-text class="text-body-1">
                {{ t('admin.message') }}
            </v-card-text>
        </v-card>
    </v-container>
</template>
