import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ManageView from "@/views/ManageView.vue";
import useUserStore from "@/stores/user.js";

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeView,
  },
  {
    name: "about",
    path: "/about",
    component: AboutView,
  },
  {
    name: "manage",
    path: "/manage-music",
    component: ManageView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
