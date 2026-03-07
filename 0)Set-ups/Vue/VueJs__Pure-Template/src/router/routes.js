import HomeView from "@/views/HomeView.vue";

export default [
    {
        path: "/",
        name: "home",
        component: HomeView,
        meta: { title: "Home" },
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/AboutView.vue"),
        meta: { title: "About" },
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
        meta: { title: "Login" },
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("@/views/AdminView.vue"),
        meta: { requiresAuth: true, title: "Admin Dashboard" },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("@/views/NotFoundView.vue"),
        meta: { title: "404 Not Found" },
    },
];
