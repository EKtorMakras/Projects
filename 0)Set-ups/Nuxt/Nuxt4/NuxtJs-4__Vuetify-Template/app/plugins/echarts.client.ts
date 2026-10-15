import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart, LineChart, ScatterChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from "echarts/components";
import VChart from "vue-echarts";

// Register ECharts components
use([
    CanvasRenderer,
    PieChart,
    BarChart,
    LineChart,
    ScatterChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
]);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("VChart", VChart);
});
