import { theme, vuetifyLocaleConfig } from "./app/modules/vuetify/index";

export default defineNuxtConfig({
    modules: ["@nuxt/eslint", "@pinia/nuxt", "vuetify-nuxt-module"],

    devtools: { enabled: true },

    build: {
        transpile: ["vuetify"],
    },

    app: {
        head: {
            title: "Nuxt App Template",
            htmlAttrs: {
                lang: "en",
            },
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        },
    },

    css: [
        "~/assets/scss/main.scss",
        "~/assets/scss/vuetify-globals.scss",
        "@mdi/font/css/materialdesignicons.min.css",
    ],

    runtimeConfig: {
        public: {
            apiUrl: process.env.NUXT_API_URL,
        },
    },

    vite: {
        ssr: {
            noExternal: ["vuetify"],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/scss/global.scss" as *;',
                },
            },
        },
    },

    vuetify: {
        moduleOptions: {
            disableVuetifyStyles: true,
            styles: {
                configFile: "assets/scss/vuetify-components.scss",
            },
        },

        vuetifyOptions: {
            theme: theme,

            locale: {
                locale: "en", // default only
                ...vuetifyLocaleConfig,
            },

            icons: {
                defaultSet: "mdi",
            },
        },
    },

    features: {
        // inlineStyles: false,
    },

    compatibilityDate: "2025-07-15",
});
