<script>
const VARIANTS = {
    sparkline: "Sparkline",
    analytic: "Analytic Line Chart",
};
</script>

<script setup>
import { computed, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";
import { useChart } from "~/composables/useChart";
import { useForwardExpose } from "~/composables/useForwardExpose";

const props = defineProps({
    /**
     * Chart options to merge with defaults
     */
    option: {
        type: Object,
        required: true,
    },
    /**
     * Chart height
     */
    height: {
        type: String,
        default: "80px",
    },
    /**
     * Chart width
     */
    width: {
        type: String,
        default: "100%",
    },
    /**
     * Preset visual variant
     */
    variant: {
        type: String,
        default: "sparkline",
        validator: (value) => Object.keys(VARIANTS).includes(value),
    },
});

const { mergeChartOptions, formatChartDate } = useChart();
const { locale } = useI18n({ useScope: "global" });
const chartLineRef = useTemplateRef("chartLineRef");

const forwardedExpose = useForwardExpose(chartLineRef, ["getEchartsInstance"]);
defineExpose(forwardedExpose);

/**
 * Default options for simple line charts (sparklines)
 * No axes, no grid, minimal UI - just the line
 */
const defaultLineChartOptions = {
    grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    xAxis: {
        type: "category",
        show: false,
        boundaryGap: false,
    },
    yAxis: {
        type: "value",
        show: false,
    },
};

/**
 * Default options for full analytical line charts
 */
const defaultAnalyticLineChartOptions = {
    tooltip: {
        trigger: "axis",
        borderWidth: 1,
    },
    legend: {
        bottom: 0,
        left: "center",
        itemWidth: 14,
        itemHeight: 4,
        itemGap: 24,
        icon: "roundRect",
        textStyle: {
            fontSize: 12,
            fontWeight: 600,
        },
    },
    grid: {
        left: 35,
        right: 16,
        top: 8,
        bottom: 32,
        containLabel: true,
    },
    xAxis: {
        type: "category",
        boundaryGap: false,
        axisTick: {
            show: false,
        },
        axisLabel: {
            fontSize: 12,
            margin: 12,
            // Auto-drop overlapping ticks instead of cramming them together
            // (ECharts 5.3+). Without this, dense time axes render unreadable.
            hideOverlap: true,
            // Default locale-aware formatter — no-ops for non-date category
            // labels (formatChartDate passes non-numeric, non-ISO-ish strings
            // through unchanged). Users can override via their own formatter.
            formatter: (value) => formatChartDate(value),
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: "dashed",
            },
        },
    },
    yAxis: {
        type: "value",
        nameLocation: "middle",
        nameRotate: 90,
        nameGap: 45,
        nameTextStyle: {
            fontSize: 12,
            fontWeight: 600,
        },
        axisLine: {
            show: true,
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            fontSize: 12,
            margin: 10,
        },
        splitLine: {
            lineStyle: {
                type: "dashed",
            },
        },
        minorTick: {
            show: false,
        },
    },
};

/**
 * Default series options for sparkline charts
 */
const defaultSeriesOptions = {
    type: "line",
    smooth: 0.4,
    symbol: "none",
    lineStyle: {
        width: 2,
    },
    areaStyle: {
        opacity: 0.1,
    },
};

/**
 * Default series options for analytical line charts
 */
const defaultAnalyticSeriesOptions = {
    type: "line",
    smooth: 0.42,
    symbol: "circle",
    symbolSize: 6,
    showSymbol: true,
    lineStyle: {
        width: 2,
        cap: "round",
        join: "round",
    },
    itemStyle: {
        borderColor: "#ffffff",
        borderWidth: 2,
    },
    emphasis: {
        focus: "series",
    },
};

const optionDefaults = computed(() => {
    if (props.variant === "analytic") {
        return {
            chart: defaultAnalyticLineChartOptions,
            series: defaultAnalyticSeriesOptions,
        };
    }

    return {
        chart: defaultLineChartOptions,
        series: defaultSeriesOptions,
    };
});

/**
 * Merge default options with passed options
 * Passed options will override defaults
 */
const mergedOption = computed(() => {
    void locale.value;
    return mergeChartOptions(optionDefaults.value.chart, optionDefaults.value.series, props.option);
});
</script>

<template>
    <BaseChart
        ref="chartLineRef"
        :option="mergedOption"
        :height="height"
        :width="width"
    />
</template>
