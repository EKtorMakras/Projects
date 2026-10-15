<script>
const VARIANTS = {
    sparkline: "Sparkline",
    analytic: "Analytic Bar Chart",
};
</script>

<script setup>
import { computed, useTemplateRef } from "vue";
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

const { mergeChartOptions } = useChart();
const chartBarRef = useTemplateRef("chartBarRef");

const forwardedExpose = useForwardExpose(chartBarRef, ["getEchartsInstance"]);
defineExpose(forwardedExpose);

/**
 * Default options for simple bar charts (sparklines)
 * No axes, no grid, minimal UI - just the bars
 */
const defaultBarChartOptions = {
    grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    xAxis: {
        type: "category",
        show: false,
    },
    yAxis: {
        type: "value",
        show: false,
    },
};

/**
 * Default options for full analytical bar charts
 */
const defaultAnalyticBarChartOptions = {
    tooltip: {
        trigger: "axis",
        borderWidth: 1,
        axisPointer: {
            type: "shadow",
        },
    },
    legend: {
        bottom: 0,
        left: "center",
        itemWidth: 14,
        itemHeight: 10,
        icon: "roundRect",
        textStyle: {
            fontSize: 12,
            fontWeight: 600,
        },
    },
    grid: {
        left: 20,
        right: 16,
        top: 8,
        bottom: 32,
        containLabel: true,
    },
    xAxis: {
        type: "category",
        axisTick: {
            show: false,
        },
        axisLabel: {
            fontSize: 12,
            margin: 12,
        },
        splitLine: {
            show: false,
        },
    },
    yAxis: {
        type: "value",
        nameLocation: "middle",
        nameRotate: 90,
        nameGap: 52,
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
    },
};

/**
 * Default series options for sparkline bar charts
 */
const defaultSeriesOptions = {
    type: "bar",
    barMaxWidth: 20,
};

/**
 * Default series options for analytical bar charts
 */
const defaultAnalyticSeriesOptions = {
    type: "bar",
    barMaxWidth: 48,
    barCategoryGap: "30%",
    itemStyle: {
        borderRadius: [4, 4, 0, 0],
    },
    emphasis: {
        focus: "series",
    },
};

const optionDefaults = computed(() => {
    if (props.variant === "analytic") {
        return {
            chart: defaultAnalyticBarChartOptions,
            series: defaultAnalyticSeriesOptions,
        };
    }

    return {
        chart: defaultBarChartOptions,
        series: defaultSeriesOptions,
    };
});

/**
 * Merge default options with passed options
 * Passed options will override defaults
 */
const mergedOption = computed(() => {
    return mergeChartOptions(optionDefaults.value.chart, optionDefaults.value.series, props.option);
});
</script>

<template>
    <BaseChart
        ref="chartBarRef"
        :option="mergedOption"
        :height="height"
        :width="width"
    />
</template>
