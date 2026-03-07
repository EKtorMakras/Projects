import "./assets/scss/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import i18n from "@/plugins/i18n/index.js";

import { projectAuth } from "@/firebase";

let app;

// Wait firebase to load auth before creating the app
projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App);
        app.use(createPinia());
        app.use(router);
        app.use(i18n);

        app.mount("#app");
    }
});
