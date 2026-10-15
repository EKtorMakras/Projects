<script setup>
import { computed, useTemplateRef } from "vue";
import { merge } from "lodash-es";
import { useTheme } from "vuetify";
import { useColor } from "~/composables/useColor";

// ======== Props ======== //
const props = defineProps({
    option: {
        type: Object,
        required: true,
    },
    autoresize: {
        type: Boolean,
        default: true,
    },
    width: {
        type: String,
        default: "100%",
    },
    height: {
        type: String,
        default: "400px",
    },
});

// ======== Composables ======== //
const theme = useTheme();
const { adjustAlpha } = useColor();

// ======== Variables ======== //
const chartRef = useTemplateRef("chartRef");

// ======== Computed ======== //
const themedOption = computed(() => {
    const colors = theme.current.value.colors;
    const surfaceColor = colors.surface || "transparent";
    const textColor = colors["on-surface"] || "#1f2532";
    const axisColor = adjustAlpha(textColor, 0.25) || textColor;
    const labelColor = adjustAlpha(textColor, 0.7) || textColor;
    const gridColor = adjustAlpha(textColor, 0.12) || textColor;
    const tooltipBorderColor = adjustAlpha(textColor, 0.12) || textColor;
    const tooltipBackgroundColor = adjustAlpha(surfaceColor, 0.96) || surfaceColor;

    const defaultOptions = {
        backgroundColor: surfaceColor,
        textStyle: {
            color: textColor,
        },
        tooltip: {
            backgroundColor: tooltipBackgroundColor,
            borderColor: tooltipBorderColor,
            textStyle: {
                color: textColor,
            },
        },
        legend: {
            textStyle: {
                color: labelColor,
            },
        },
    };

    if (props.option.xAxis || props.option.yAxis) {
        defaultOptions.xAxis = {
            axisLine: {
                lineStyle: {
                    color: axisColor,
                },
            },
            axisLabel: {
                color: labelColor,
            },
            splitLine: {
                lineStyle: {
                    color: gridColor,
                },
            },
        };

        defaultOptions.yAxis = {
            axisLine: {
                lineStyle: {
                    color: axisColor,
                },
            },
            axisLabel: {
                color: labelColor,
                formatter: (value) => {
                    const rounded = parseFloat(value.toFixed(2));
                    return String(rounded);
                },
            },
            nameTextStyle: {
                color: labelColor,
            },
            splitLine: {
                lineStyle: {
                    color: gridColor,
                },
            },
        };
    }

    return merge({}, defaultOptions, props.option);
});

function getEchartsInstance() {
    const chartComponent = chartRef.value;
    return chartComponent?.chart ?? null;
}

// ======== Expose ======== //
defineExpose({
    getEchartsInstance,
});
</script>

<template>
    <ClientOnly>
        <VChart
            ref="chartRef"
            :option="themedOption"
            :autoresize="autoresize"
            :style="{ width, height }"
        />
    </ClientOnly>
</template>
