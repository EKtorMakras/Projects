<script setup>
import { useI18n } from "vue-i18n";
import { useNotifications } from "@/composables/useNotifications.js";

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

// Demo data for Vuetify locale testing
const demoTableItems = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
];

const headers = [
    { title: "ID", key: "id" },
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
    { title: "Role", key: "role" },
];

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
    <v-container>
        <v-card
            class="mb-6 pa-4"
            variant="tonal"
        >
            <v-row align="center">
                <v-col cols="auto">
                    <span class="font-weight-medium">{{ t("welcome") }}</span>
                </v-col>
            </v-row>
        </v-card>

        <h1 class="text-h3 mb-4">{{ t("welcome") }} to Nuxt</h1>
        <p class="text-body-1 mb-6">This is your starting template.</p>

        <v-btn
            color="success"
            class="mb-6"
            @click="toggleLoaders"
        >
            {{ showLoaders ? "Hide Loaders" : "Show Loaders" }}
        </v-btn>

        <v-expand-transition>
            <v-card
                v-if="showLoaders"
                class="mb-6 pa-4"
            >
                <h3 class="text-h6 mb-4">Circular Loader Examples:</h3>
                <div class="d-flex ga-8 align-center">
                    <BaseLoaderCircular />
                    <BaseLoaderCircular
                        :size="60"
                        color="#ff0000"
                    />
                    <BaseLoaderCircular
                        :size="80"
                        color="#2196f3"
                    />
                </div>
            </v-card>
        </v-expand-transition>

        <div class="d-flex ga-2 mb-6">
            <v-btn
                color="success"
                @click="testNotification('success')"
            >
                Success
            </v-btn>
            <v-btn
                color="error"
                @click="testNotification('error')"
            >
                Error
            </v-btn>
            <v-btn
                color="warning"
                @click="testNotification('warning')"
            >
                Warning
            </v-btn>
            <v-btn
                color="info"
                @click="testNotification('info')"
            >
                Info
            </v-btn>
        </div>

        <!-- Vuetify Locale Test Section -->
        <v-card class="mb-6 pa-4">
            <v-card-title class="text-h6 mb-2"> Demo Table to Test Vuetify Locale Changes </v-card-title>
            <v-card-subtitle class="mb-4">
                Change the locale above to see Vuetify's built-in text (pagination, "No data", etc.) update
                automatically
            </v-card-subtitle>
            <v-data-table
                :headers="headers"
                :items="demoTableItems"
                :items-per-page="5"
                class="elevation-1"
            />
        </v-card>

        <v-btn
            :to="{ path: '/about' }"
            variant="text"
            color="primary"
        >
            {{ t("about") }}
        </v-btn>
    </v-container>
</template>
