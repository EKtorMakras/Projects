<script setup>
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

function handleLogout() {
    authStore.logout();
    router.push({ name: "login" });
}
</script>

<template>
    <div class="admin-page">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {{ authStore.user?.username }}!</p>
        <p>Role: {{ authStore.user?.role }}</p>

        <div class="admin-content">
            <h2>Protected Content</h2>
            <p>This page is only accessible to authenticated users.</p>
            <p>It demonstrates the navigation guard in action.</p>
        </div>

        <button
            class="logout-btn"
            @click="handleLogout"
        >
            Logout
        </button>
    </div>
</template>

<style lang="scss" scoped>
.admin-page {
    padding: 20px;

    h1 {
        margin-bottom: 20px;
    }

    p {
        margin: 10px 0;
    }
}

.admin-content {
    margin: 30px 0;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;

    h2 {
        margin-bottom: 10px;
    }
}

.logout-btn {
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #d32f2f;
    }
}
</style>
