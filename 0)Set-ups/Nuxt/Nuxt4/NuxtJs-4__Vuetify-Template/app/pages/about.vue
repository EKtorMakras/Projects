<script setup>
import { useI18n } from "vue-i18n";

definePageMeta({
    layout: "default",
});

const { t } = useI18n();
</script>

<template>
    <v-container
        max-width="1000"
        class="py-8"
    >
        <v-card
            class="mb-6 pa-6"
            elevation="2"
        >
            <v-card-title class="text-h3 mb-4">
                {{ t("aboutPage.title") }}
            </v-card-title>
            <v-card-text class="text-body-1">
                {{ t("aboutPage.description") }}
            </v-card-text>
        </v-card>

        <v-card
            class="pa-6"
            elevation="2"
        >
            <v-card-title class="text-h5 mb-6">
                {{ t("aboutPage.features") }}
            </v-card-title>
            <v-card-text>
                <v-list lines="one">
                    <v-list-item
                        v-for="(feature, i) in ['Nuxt 4', 'Vue 3', 'Pinia', 'Vue i18n', 'Day.js', 'SCSS']"
                        :key="i"
                    >
                        <template #prepend>
                            <v-icon
                                icon="mdi-check-circle"
                                color="success"
                            />
                        </template>
                        {{ feature }}
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>

        <v-btn
            :to="{ path: '/' }"
            color="primary"
            variant="text"
            class="mt-6"
        >
            {{ t("home") }}
        </v-btn>
    </v-container>
</template>
