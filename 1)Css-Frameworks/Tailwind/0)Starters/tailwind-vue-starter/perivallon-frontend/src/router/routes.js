import HomeView from "@/views/HomeView.vue";
import { HomeIcon, ChartBarIcon, CircleStackIcon } from "@heroicons/vue/24/outline";

export default [
    {
        path: "/",
        name: "home",
        component: HomeView,
        meta: {
            icon: HomeIcon,
            isVisible: true,
        },
    },
    {
        path: "/datasets",
        name: "datasets",
        meta: {
            icon: CircleStackIcon,
            isVisible: true,
        },
        children: [
            {
                path: "/electronics",
                name: "electronics",
                meta: {
                    icon: ChartBarIcon,
                    isVisible: true,
                },
                component: () => import("@/views/EnvElectronicsView.vue"),
            },
            {
                path: "/chemicals",
                name: "chemicals",
                meta: {
                    icon: ChartBarIcon,
                    isVisible: true,
                },
                component: () => import("@/views/EnvChemicalsView.vue"),
            },
        ],
    },
    {
        path: "/test",
        name: "test",
        meta: {
            isVisible: false,
        },
        component: () => import("@/views/TestView.vue"),
    },
];
