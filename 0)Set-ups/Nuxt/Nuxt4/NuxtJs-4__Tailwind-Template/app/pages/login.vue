<script setup>
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useNotifications } from "@/composables/useNotifications.js";

const authStore = useAuthStore();
const { showSuccess, showError } = useNotifications();

const username = ref("");
const password = ref("");

async function handleLogin() {
    const success = authStore.login(username.value, password.value);

    if (success) {
        showSuccess("Login successful!");
        await navigateTo('/admin');
    } else {
        showError("Invalid credentials. Try admin/password");
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-surface">
        <div class="bg-card p-10 rounded-lg shadow-md w-full max-w-md">
            <h1 class="mb-8 text-center">Login</h1>
            <form @submit.prevent="handleLogin">
                <div class="mb-5">
                    <label for="username" class="block mb-2 font-medium">Username</label>
                    <input
                        id="username"
                        v-model="username"
                        type="text"
                        placeholder="admin"
                        class="w-full py-2.5 px-2.5 border border-surface-variant-dark rounded text-sm focus:outline-none focus:border-success-500"
                        required
                    />
                </div>

                <div class="mb-5">
                    <label for="password" class="block mb-2 font-medium">Password</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        placeholder="password"
                        class="w-full py-2.5 px-2.5 border border-surface-variant-dark rounded text-sm focus:outline-none focus:border-success-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    class="w-full py-3 px-3 bg-success-500 text-success-500-fg border-none rounded text-base font-medium cursor-pointer hover:bg-success-600"
                >
                    Login
                </button>
            </form>

            <p class="mt-5 text-center text-surface-fg-low-emphasis text-sm">
                Hint: Use <strong>admin</strong> / <strong>password</strong>
            </p>
        </div>
    </div>
</template>
