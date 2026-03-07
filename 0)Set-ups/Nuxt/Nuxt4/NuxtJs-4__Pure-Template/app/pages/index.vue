<script setup>
import { useNotifications } from "@/composables/useNotifications.js";
import { useI18n } from "vue-i18n";

definePageMeta({
    layout: "default",
});

const { t } = useI18n();
const { showSuccess, showError, showWarning, showInfo } = useNotifications();
const showLoaders = ref(false);

const notificationMessages = {
    success: "Operation completed successfully!",
    error: "Something went wrong!",
    warning: "Please check your input.",
    info: "This is an informational message.",
};

function toggleLoaders() {
    showLoaders.value = !showLoaders.value;
}

function testNotification(type) {
    const handlers = {
        success: () => showSuccess(notificationMessages.success),
        error: () => showError(notificationMessages.error, "Error"),
        warning: () => showWarning(notificationMessages.warning, "Warning"),
        info: () => showInfo(notificationMessages.info),
    };

    handlers[type]?.();
}
</script>

<template>
    <div class="home-page">
        <div class="locale-selector-wrapper">
            <label>{{ t('welcome') }}! Select Language:</label>
            <LocaleSelector />
        </div>

        <h1>{{ t('welcome') }} to Nuxt</h1>
        <p>This is your starting template.</p>

        <button
            class="toggle-loader-btn"
            @click="toggleLoaders"
        >
            {{ showLoaders ? "Hide Loaders" : "Show Loaders" }}
        </button>

        <div
            v-if="showLoaders"
            class="loader-section"
        >
            <h3>Circular Loader Examples:</h3>
            <div class="loader-examples">
                <BaseCircularLoader />
                <BaseCircularLoader
                    :size="60"
                    color="#ff0000"
                />
                <BaseCircularLoader
                    :size="80"
                    color="#2196f3"
                />
            </div>
        </div>

        <div class="test-buttons">
            <button @click="testNotification('success')">
                Success
            </button>
            <button @click="testNotification('error')">
                Error
            </button>
            <button @click="testNotification('warning')">
                Warning
            </button>
            <button @click="testNotification('info')">
                Info
            </button>
        </div>

        <NuxtLink to="/about">
            {{ t('about') }}
        </NuxtLink>
    </div>
</template>

<style scoped lang="scss">
.home-page {
    padding: 2rem;

    .locale-selector-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: #f5f5f5;
        border-radius: 8px;

        label {
            font-weight: 500;
        }
    }

    h1 {
        margin-bottom: 1rem;
    }

    a {
        color: #061257;
        text-decoration: underline;
        font-weight: 500;

        &:hover {
            color: #0a1a75;
        }
    }

    .toggle-loader-btn {
        padding: 10px 20px;
        margin: 20px 0;
        cursor: pointer;
        background-color: #42b983;
        color: white;
        border: none;
        border-radius: 4px;

        &:hover {
            background-color: #35a372;
        }
    }

    .loader-section {
        margin: 30px 0;

        h3 {
            margin-bottom: 15px;
        }
    }

    .loader-examples {
        display: flex;
        gap: 30px;
        align-items: center;
    }

    .test-buttons {
        display: flex;
        gap: 10px;
        margin: 20px 0;

        button {
            padding: 10px 20px;
            cursor: pointer;
            background-color: #e0e0e0;
            border: none;
            border-radius: 4px;
            transition: background-color 0.2s;

            &:hover {
                background-color: #d0d0d0;
            }
        }
    }
}
</style>
