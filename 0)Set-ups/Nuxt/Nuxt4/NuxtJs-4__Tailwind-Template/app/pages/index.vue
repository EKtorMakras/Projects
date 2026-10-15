<script setup>
import { useI18n } from "vue-i18n";
import { useNotifications } from "@/composables/useNotifications";

definePageMeta({
    layout: "default",
});

const { t } = useI18n();
const { showSuccess, showError, showWarning, showInfo } = useNotifications();

const showLoaders = ref(false);

const notificationTests = [
    { type: "success", message: "Operation completed successfully!", title: "Success" },
    { type: "error", message: "Something went wrong!", title: "Error" },
    { type: "warning", message: "Please check your input.", title: "Warning" },
    { type: "info", message: "This is an informational message.", title: "Info" },
];

const loaderColors = ["primary-100", "success-600", "error-600"];

function testNotification(type, message, title) {
    const handlers = {
        success: showSuccess,
        error: showError,
        warning: showWarning,
        info: showInfo,
    };
    handlers[type]?.(message, title);
}
</script>

<template>
    <div class="p-8 space-y-8">
        <!-- Language & Theme Selectors -->
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex items-center gap-4 p-4 bg-surface-variant rounded-lg flex-1">
                <label class="font-medium">{{ t("welcome") }}! Language:</label>
                <LocaleSelector />
            </div>

            <div class="flex items-center gap-4 p-4 bg-surface-variant rounded-lg flex-1">
                <label class="font-medium">Theme:</label>
                <ThemeSwitcher />
            </div>
        </div>

        <!-- Hero Section -->
        <div>
            <h1 class="text-6xl font-extrabold text-pink-500 underline mb-4">TAILWIND WORKS</h1>
            <h1 class="text-3xl mb-4">{{ t("welcome") }} to Nuxt</h1>
            <p class="mb-4 text-surface-fg-low-emphasis">This is your starting template with design system showcase.</p>
            <NuxtLink
                to="/about"
                class="text-primary-600 underline font-medium hover:text-primary-700"
            >
                {{ t("about") }}
            </NuxtLink>
        </div>

        <!-- Loaders Section -->
        <div class="p-6 bg-card rounded-lg border border-surface-variant-dark">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold">Loaders</h2>
                <button
                    class="px-4 py-2 bg-primary-600 text-primary-600-fg rounded hover:bg-primary-700 transition-colors"
                    @click="showLoaders = !showLoaders"
                >
                    {{ showLoaders ? "Hide" : "Show" }}
                </button>
            </div>
            <div
                v-if="showLoaders"
                class="flex gap-8 items-center"
            >
                <BaseCircularLoader
                    v-for="color in loaderColors"
                    :key="color"
                    :color="color"
                    :size="50"
                />
            </div>
        </div>

        <!-- Notifications Section -->
        <div class="p-6 bg-card rounded-lg border border-surface-variant-dark">
            <h2 class="text-2xl font-bold mb-4">Notifications</h2>
            <div class="flex flex-wrap gap-3">
                <button
                    v-for="test in notificationTests"
                    :key="test.type"
                    class="px-4 py-2 rounded capitalize transition-colors cursor-pointer"
                    :class="{
                        'bg-success-600 text-success-600-fg hover:bg-success-700': test.type === 'success',
                        'bg-error-600 text-error-600-fg hover:bg-error-700': test.type === 'error',
                        'bg-warning text-white hover:bg-[#f57c00]': test.type === 'warning',
                        'bg-primary-600 text-primary-600-fg hover:bg-primary-700': test.type === 'info',
                    }"
                    @click="testNotification(test.type, test.message, test.title)"
                >
                    {{ test.type }}
                </button>
            </div>
        </div>
    </div>
</template>
