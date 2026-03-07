export default defineNuxtConfig({
    modules: ["@nuxt/eslint", "@pinia/nuxt"],

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
