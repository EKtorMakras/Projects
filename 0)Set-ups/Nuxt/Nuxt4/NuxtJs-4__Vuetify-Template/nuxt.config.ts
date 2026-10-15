import { theme, vuetifyLocaleConfig } from "./app/modules/vuetify/index";
import { breakpoints } from "./app/config/breakpoints";
import { generateBreakpointsScss } from "./scripts/generateBreakpointsScss";

// Regenerate `_breakpoints.scss` from the TS source of truth every time Nuxt
// evaluates this config (dev/build). Runs before Vite's Sass pipeline, so
// SCSS compilation always sees up-to-date values.
generateBreakpointsScss();

export default defineNuxtConfig({
    modules: ["@nuxt/eslint", "@pinia/nuxt", "vuetify-nuxt-module"],

    devtools: { enabled: true },

    devServer: { port: 3000 },

    ssr: true,

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

    css: ["~/assets/scss/main.scss"],

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
        optimizeDeps: {
            include: [
                "@mdi/font/css/materialdesignicons.min.css",
                "@vue/devtools-core",
                "@vue/devtools-kit",
                "vue-i18n",
                "dayjs",
                "dayjs/plugin/objectSupport",
                "dayjs/plugin/localizedFormat",
                "dayjs/plugin/utc",
                "dayjs/plugin/duration",
                "dayjs/locale/el",
                "echarts/core",
                "echarts/renderers",
                "echarts/charts",
                "echarts/components",
                "vue-echarts",
                "chroma-js",
                "lodash-es",
            ],
        },
    },

    vuetify: {
        moduleOptions: {
            // Nuxt already ships a built-in `useLayout`; prefix Vuetify's to avoid the auto-import clash.
            prefixComposables: ["useLayout"],
            styles: {
                configFile: "assets/scss/vuetify-settings.scss",
            },
        },

        vuetifyOptions: {
            theme: theme,

            locale: {
                locale: "en",
                ...vuetifyLocaleConfig,
            },

            icons: {
                defaultSet: "mdi",
            },

            // Runtime thresholds for `useDisplay()`. Sourced from the same TS
            // config that generates `_breakpoints.scss`, so SASS grid and JS
            // display layer always agree on every value.
            display: {
                thresholds: { ...breakpoints },
            },
        },
    },

    features: {
        inlineStyles: false,
    },

    compatibilityDate: "2025-07-15",
});
