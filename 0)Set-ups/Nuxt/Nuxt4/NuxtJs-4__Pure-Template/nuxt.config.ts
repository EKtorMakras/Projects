export default defineNuxtConfig({
    modules: ["@nuxt/eslint", "@pinia/nuxt"],

    devServer: { port: 3000 },

    devtools: { enabled: true },

    app: {
        head: {
            title: "Nuxt App Template",
            htmlAttrs: {
                lang: "en",
            },
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        },
    },

    runtimeConfig: {
        public: {
            apiUrl: process.env.NUXT_API_URL,
        },
    },

    css: ["~/assets/scss/main.scss"],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/scss/global.scss" as *;',
                },
            },
        },
    },

    compatibilityDate: "2025-07-15",
});
