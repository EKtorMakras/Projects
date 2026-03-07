import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    modules: ["@nuxt/eslint", "@pinia/nuxt"],
    devtools: { enabled: false },

    app: {
        head: {
            title: "Nuxt App Template",
            htmlAttrs: {
                lang: "en",
            },
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        },
    },

    css: ["~/assets/scss/main.scss", "~/assets/css/main.css"],

    vite: {
        // @ts-expect-error - Tailwind plugin type mismatch with Vite
        plugins: [tailwindcss()],
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
