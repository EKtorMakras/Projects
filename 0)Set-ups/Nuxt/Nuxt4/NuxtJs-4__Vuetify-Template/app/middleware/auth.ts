import { useAuthStore } from "@/stores/useAuthStore.js";

// Middleware for authentication
export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Redirect to login page
        return navigateTo("/login");
    }

    // If already logged in and trying to access login, redirect to home
    if (to.path === "/login" && authStore.isAuthenticated) {
        return navigateTo("/");
    }
});
// a
