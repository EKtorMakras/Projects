import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useAuthStore } from "@/stores/useAuthStore";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Redirect to login page
        next({ name: "login" });
    } else if (to.name === "login" && authStore.isAuthenticated) {
        // If already logged in and trying to access login, redirect to home
        next({ name: "home" });
    } else {
        // Allow navigation
        next();
    }
});

export default router;
