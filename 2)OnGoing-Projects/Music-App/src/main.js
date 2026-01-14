import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import veeValidatePlugin from "./includes/validation.js";

import GlobalComponents from "./includes/_globals.js";
import progressBar from "./includes/progress-bar.js";

import "./assets/base.css";
import "./assets/main.css";
import "nprogress/nprogress.css";

import { auth } from "./includes/firebase.js";
import Icon from "./directives/icon.js";
import i18n from "./includes/i18n.js";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });
progressBar(router);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(veeValidatePlugin);
    app.use(i18n);
    app.use(GlobalComponents);
    app.directive("icon", Icon);

    app.mount("#app");
  }
});
