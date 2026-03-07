import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import routes from "./routes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    // linkExactActiveClass: "text-primary-500",
});

// auth guard
function requireAuth(to, from, next) {
    const authStore = useAuthStore();
    const user = authStore.user;

    if (!user) {
        next({ name: "welcome" });
    } else {
        next();
    }
}

function requireNoAuth(to, from, next) {
    const authStore = useAuthStore();
    const user = authStore.user;

    if (user) {
        next({ name: "chatroom" });
    } else {
        next();
    }
}

const protectedRoutes = ["chatroom"];
const guestOnlyRoutes = ["welcome", "login", "signup"];

router.beforeEach((to, from, next) => {
    if (protectedRoutes.includes(to.name)) {
        requireAuth(to, from, next);
    } else if (guestOnlyRoutes.includes(to.name)) {
        requireNoAuth(to, from, next);
    } else {
        next();
    }
});

export default router;
