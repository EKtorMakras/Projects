/* eslint no-unused-vars: "off" */
import "./assets/scss/main.scss";
import "@mdi/font/css/materialdesignicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import dayjs from "@/plugins/dayjs";
import vuetify from "@/plugins/vuetify";

import App from "./App.vue";
import router from "./router";
import i18n from "@/plugins/i18n/index.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(vuetify);

app.mount("#app");
