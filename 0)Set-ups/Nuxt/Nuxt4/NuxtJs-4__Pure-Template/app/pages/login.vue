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
    <div class="login-page">
        <div class="login-container">
            <h1>Login</h1>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input
                        id="username"
                        v-model="username"
                        type="text"
                        placeholder="admin"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        placeholder="password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    class="login-btn"
                >
                    Login
                </button>
            </form>

            <p class="hint">
                Hint: Use <strong>admin</strong> / <strong>password</strong>
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-page {
    @include flex-center;
    min-height: 100vh;
    background-color: #f5f5f5;
}

.login-container {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;

    h1 {
        margin-bottom: 30px;
        text-align: center;
    }
}

.form-group {
    margin-bottom: 20px;

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;

        &:focus {
            outline: none;
            border-color: #42b983;
        }
    }
}

.login-btn {
    width: 100%;
    padding: 12px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background-color: #35a372;
    }
}

.hint {
    margin-top: 20px;
    text-align: center;
    color: #666;
    font-size: 14px;
}
</style>
