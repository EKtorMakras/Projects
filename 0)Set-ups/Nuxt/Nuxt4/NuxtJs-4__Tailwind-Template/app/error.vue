<script setup>
const props = defineProps({
    error: Object,
});

const is404 = computed(() => props.error?.statusCode === 404);

const errorTitle = computed(() => {
    if (is404.value) return "404";
    return props.error?.statusCode || "Error";
});

const errorSubtitle = computed(() => {
    if (is404.value) return "Page Not Found";
    return props.error?.statusMessage || "Something went wrong";
});

const errorDescription = computed(() => {
    if (is404.value) {
        return "The page you're looking for doesn't exist.";
    }
    return props.error?.message || "Please try again later.";
});

const goHome = () => {
    navigateTo("/");
};
</script>

<template>
    <NuxtLayout name="empty">
        <div
            class="min-h-screen flex items-center justify-center bg-linear-to-br from-surface-variant-light to-surface-variant p-8"
        >
            <div class="text-center max-w-2xl p-12 bg-card rounded-xl shadow-2xl">
                <h1 class="text-6xl font-bold text-primary-600 mb-4">
                    {{ errorTitle }}
                </h1>
                <h2 class="text-2xl mb-4 text-surface-fg-high-emphasis">
                    {{ errorSubtitle }}
                </h2>
                <p class="text-base text-surface-fg-low-emphasis mb-8">
                    {{ errorDescription }}
                </p>
                <div class="flex gap-4 justify-center flex-wrap">
                    <button
                        class="py-3 px-6 border-none rounded-md text-base cursor-pointer transition-all duration-200 bg-primary-600 text-primary-600-fg hover:bg-primary-700"
                        @click="goHome"
                    >
                        Go Home
                    </button>
                    <button
                        class="py-3 px-6 rounded-md text-base cursor-pointer transition-all duration-200 bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-primary-600-fg"
                        @click="$router.go(-1)"
                    >
                        Go Back
                    </button>
                    <button
                        v-if="!is404"
                        class="py-3 px-6 border-none rounded-md text-base cursor-pointer transition-all duration-200 bg-transparent text-primary-600 hover:underline"
                        @click="() => clearError('/')"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
