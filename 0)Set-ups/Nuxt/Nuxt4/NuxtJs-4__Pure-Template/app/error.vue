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
        <div class="error-page">
            <div class="error-content">
                <h1 class="error-title">
                    {{ errorTitle }}
                </h1>
                <h2 class="error-subtitle">
                    {{ errorSubtitle }}
                </h2>
                <p class="error-description">
                    {{ errorDescription }}
                </p>
                <div class="error-actions">
                    <button
                        class="btn btn-primary"
                        @click="goHome"
                    >
                        Go Home
                    </button>
                    <button
                        class="btn btn-secondary"
                        @click="$router.go(-1)"
                    >
                        Go Back
                    </button>
                    <button
                        v-if="!is404"
                        class="btn btn-text"
                        @click="() => clearError('/')"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped lang="scss">
.error-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 2rem;
}

.error-content {
    text-align: center;
    max-width: 600px;
    padding: 3rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.error-title {
    font-size: 4rem;
    font-weight: bold;
    color: #061257;
    margin-bottom: 1rem;
}

.error-subtitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
}

.error-description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 2rem;
}

.error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &.btn-primary {
        background-color: #061257;
        color: white;

        &:hover {
            background-color: #0a1a75;
        }
    }

    &.btn-secondary {
        background-color: transparent;
        color: #061257;
        border: 2px solid #061257;

        &:hover {
            background-color: #061257;
            color: white;
        }
    }

    &.btn-text {
        background-color: transparent;
        color: #061257;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
