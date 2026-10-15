<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
    error: Object,
});

const svgColor = computed(() => {
    return `rgb(var(--v-theme-primary))`;
});

const goHome = () => {
    navigateTo("/");
};
</script>

<template>
    <NuxtLayout name="empty">
        <v-container
            fluid
            class="d-flex align-center justify-center bg-surface pa-6 min-h-screen"
        >
            <div
                class="text-center mx-auto"
                style="max-width: 700px; width: 100%"
            >
                <!-- 404 Illustration -->
                <div class="mb-10">
                    <svg
                        width="200"
                        height="200"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="11"
                            cy="11"
                            r="8"
                            :stroke="svgColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                        <line
                            x1="16.5"
                            y1="16.5"
                            x2="22"
                            y2="22"
                            :stroke="svgColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />

                        <line
                            x1="8"
                            y1="8"
                            x2="14"
                            y2="14"
                            :stroke="svgColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                        <line
                            x1="14"
                            y1="8"
                            x2="8"
                            y2="14"
                            :stroke="svgColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>
                </div>

                <!-- Error Title -->
                <h1 class="text-h3 font-weight-bold text-on-surface mb-6 px-4">
                    {{ t("errorPage.title") }}
                </h1>

                <!-- Error Description -->
                <p class="text-h6 text-medium-emphasis mb-10 px-4">
                    {{ t("errorPage.description") }}
                </p>

                <!-- Back to Home Button -->
                <v-btn
                    color="primary"
                    size="x-large"
                    rounded="pill"
                    prepend-icon="mdi-arrow-left"
                    class="text-none"
                    @click="goHome"
                >
                    {{ t("errorPage.button") }}
                </v-btn>
            </div>
        </v-container>
    </NuxtLayout>
</template>
