import "./assets/css/main.css";
import "./assets/scss/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import i18n from "@/plugins/i18n/index.js";

// Plugins
// eslint-disable-next-line no-unused-vars
import dayjs from "./plugins/dayjs";

// ECharts setup
import ECharts from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from "echarts/components";

// Register only what you need
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent]);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

// Register the <v-chart> component globally
app.component("VChart", ECharts);

app.mount("#app");
