<script setup>
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useNotifications } from "@/composables/useNotifications.js";

const authStore = useAuthStore();
const { showSuccess, showError } = useNotifications();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

async function handleLogin() {
    loading.value = true;
    try {
        const success = authStore.login(username.value, password.value);

        if (success) {
            showSuccess("Login successful!");
            await navigateTo('/admin');
        } else {
            showError("Invalid credentials. Try admin/password");
        }
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <v-container
        class="d-flex justify-center align-center"
        style="min-height: 100vh"
    >
        <v-card
            max-width="400"
            class="w-100"
            elevation="4"
        >
            <v-card-title class="text-h4 text-center mb-6 pa-6">
                Login
            </v-card-title>

            <v-card-text>
                <form @submit.prevent="handleLogin">
                    <v-text-field
                        v-model="username"
                        label="Username"
                        placeholder="admin"
                        prepend-inner-icon="mdi-account"
                        variant="outlined"
                        class="mb-4"
                        required
                    />

                    <v-text-field
                        v-model="password"
                        label="Password"
                        placeholder="password"
                        prepend-inner-icon="mdi-lock"
                        :type="showPassword ? 'text' : 'password'"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        variant="outlined"
                        class="mb-6"
                        required
                        @click:append-inner="showPassword = !showPassword"
                    />

                    <v-btn
                        type="submit"
                        color="success"
                        size="large"
                        class="w-100 mb-4"
                        :loading="loading"
                    >
                        Login
                    </v-btn>
                </form>

                <v-alert
                    type="info"
                    variant="tonal"
                    class="mt-4"
                >
                    <strong>Hint:</strong> Use admin / password
                </v-alert>
            </v-card-text>
        </v-card>
    </v-container>
</template>
