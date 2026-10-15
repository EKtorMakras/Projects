<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useRouter } from "vue-router";
import { useNotifications } from "@/composables/useNotifications.js";

const authStore = useAuthStore();
const router = useRouter();
const { showSuccess, showError } = useNotifications();

const username = ref("");
const password = ref("");

function handleLogin() {
    const success = authStore.login(username.value, password.value);

    if (success) {
        showSuccess("Login successful!");
        router.push({ name: "admin" });
    } else {
        showError("Invalid credentials. Try admin/password");
    }
}
</script>

<template>
    <v-container
        fluid
        class="d-flex align-center justify-center"
        style="min-height: 100dvh"
    >
        <v-card
            width="400"
            class="pa-6"
        >
            <v-card-title class="text-h4 text-center mb-6"> Login </v-card-title>

            <v-card-text>
                <v-form @submit.prevent="handleLogin">
                    <v-text-field
                        v-model="username"
                        label="Username"
                        placeholder="admin"
                        variant="outlined"
                        required
                        class="mb-4"
                    />

                    <v-text-field
                        v-model="password"
                        label="Password"
                        placeholder="password"
                        type="password"
                        variant="outlined"
                        required
                        class="mb-4"
                    />

                    <v-btn
                        type="submit"
                        color="success"
                        block
                        size="large"
                    >
                        Login
                    </v-btn>
                </v-form>

                <v-alert
                    type="info"
                    variant="tonal"
                    class="mt-6"
                    density="compact"
                >
                    Hint: Use <strong>admin</strong> / <strong>password</strong>
                </v-alert>
            </v-card-text>
        </v-card>
    </v-container>
</template>
