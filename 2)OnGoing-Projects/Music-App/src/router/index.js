import { createRouter, createWebHistory } from "vue-router";
import useUserStore from "@/stores/user.js";

const Home = () => import("@/views/HomeView.vue");
const Manage = () => import("@/views/ManageView.vue");
const About = () => import("@/views/AboutView.vue");
const Song = () => import("@/views/SongView.vue");
const Settings = () => import("@/views/SettingsView.vue");
const NotFound = () => import("@/views/NotFoundView.vue");

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "manage",
    path: "/manage-music",
    component: Manage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "settings",
    path: "/settings",
    component: Settings,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "song",
    path: "/song/:id",
    component: Song,
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    name: "notfound",
    path: "/404/:title?/:message?",
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
