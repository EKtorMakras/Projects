import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    define: {
        // Replace feature flag globals with boolean literals
        __VUE_I18N_FULL_INSTALL__: false,
        __VUE_I18N_LEGACY_API__: false,
        __VUE_I18N_PROD_DEVTOOLS__: false,
    },
});
