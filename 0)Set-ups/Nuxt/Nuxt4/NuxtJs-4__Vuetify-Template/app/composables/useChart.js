import { merge } from "lodash-es";
import { useDateUtils } from "~/composables/useDateUtils";

const ONE_DAY_MS = 86400000;

function normalizeFileNamePart(value) {
    return String(value ?? "")
        .trim()
        .replace(/[\\/:*?"<>|]+/g, "-")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

function centeredWindowAvg(dailyAverages, timestamps, centerTs, halfWindowMs) {
    const windowAvgs = dailyAverages
        .filter((_, j) => Math.abs(timestamps[j] - centerTs) <= halfWindowMs)
        .map((d) => d.avg);

    if (windowAvgs.length === 0) return null;

    return windowAvgs.reduce((sum, v) => sum + v, 0) / windowAvgs.length;
}

/**
 * Composable for chart-related utilities
 * Provides helper functions for merging chart options
 */
export function useChart() {
    const { formatDate } = useDateUtils();

    /**
     * Locale-aware date formatter for chart axes and tooltips.
     * Accepts anything dayjs can parse; returns the input unchanged if it doesn't look like a date.
     * @param {*} value
     * @param {string} [format="L"] - dayjs format token (default: localized short date)
     * @returns {string}
     */
    function formatChartDate(value, format = "L") {
        if (value == null || value === "") return "";
        if (typeof value === "number") return Number.isFinite(value) ? formatDate(value, format) : "";

        if (value instanceof Date) return formatDate(value, format);

        if (typeof value === "string") return /^\d/.test(value) ? formatDate(value, format) : value;

        return String(value);
    }

    // General Utils
    /**
     * Merges chart options with special handling for series arrays
     *
     * @param {Object} defaultOptions - Default chart options (without series)
     * @param {Object} defaultSeriesOptions - Default options to apply to each series
     * @param {Object} passedOptions - User-provided chart options
     * @returns {Object} Merged chart options with series properly handled
     */
    function mergeChartOptions(defaultOptions, defaultSeriesOptions, passedOptions) {
        // First, merge the main chart options (everything except series)
        const merged = merge({}, defaultOptions, passedOptions);

        if (!passedOptions.series) {
            return merged;
        }

        // Multiple series — apply defaults to each series in the array
        if (Array.isArray(passedOptions.series)) {
            merged.series = passedOptions.series.map((series) => merge({}, defaultSeriesOptions, series));
            return merged;
        }

        // Single series object — merge with defaults
        merged.series = merge({}, defaultSeriesOptions, passedOptions.series);
        return merged;
    }

    // Export Chart as PNG
    async function exportChartAsPng(instance, fileName, options) {
        if (!instance) {
            return false;
        }

        // Yield two frames so the caller's loading state actually paints before
        // getDataURL() blocks the main thread on large charts.
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        const dataUrl = instance.getDataURL({
            type: "png",
            pixelRatio: 2,
            ...options,
        });

        if (!dataUrl) {
            return false;
        }

        const downloadLink = document.createElement("a");
        const normalizedFileName = normalizeFileNamePart(fileName) || "chart";

        downloadLink.href = dataUrl;
        downloadLink.download = `${normalizedFileName}.png`;
        downloadLink.click();

        return true;
    }

    /**
     * Shared ECharts tooltip config — every chart uses the same visual shell
     * (rounded corners, soft shadow); only the formatter body differs.
     *
     * @param {Function} formatter - ECharts tooltip formatter callback
     * @param {Object} [options]
     * @param {string} [options.trigger="axis"] - ECharts tooltip trigger ("axis" | "item")
     * @returns {Object} ECharts tooltip config object
     */
    function makeTooltipConfig(formatter, options = {}) {
        const defaultOptions = {
            trigger: "axis",
            shadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
        };

        const { trigger, shadow } = { ...defaultOptions, ...options };

        return {
            trigger,
            extraCssText: `border-radius: 14px; box-shadow: ${shadow};`,
            formatter,
        };
    }

    /**
     * Calculates a centered moving average over a date-grouped window.
     * Each day is weighted equally regardless of sample count.
     * @param {Array} rows - Objects with `{ date, value }` (date: ISO "YYYY-MM-DD").
     * @returns {Array} - `[{ date, avg }]` sorted ascending. Empty input → [].
     */
    function movingAverageByDate(rows, windowDays = 30) {
        if (!Array.isArray(rows) || rows.length === 0) return [];

        const dailyBuckets = new Map();

        for (const row of rows) {
            if (!row?.date) continue;

            const value = row.value;
            if (value == null || !Number.isFinite(value)) continue;

            let bucket = dailyBuckets.get(row.date);

            if (!bucket) {
                bucket = { date: row.date, sum: 0, count: 0 };
                dailyBuckets.set(row.date, bucket);
            }

            bucket.sum += value;
            bucket.count += 1;
        }

        const dailyAverages = Array.from(dailyBuckets.values())
            .map((b) => ({ date: b.date, avg: b.sum / b.count }))
            .sort((a, b) => a.date.localeCompare(b.date));

        if (dailyAverages.length === 0) return [];

        const halfWindowMs = (windowDays / 2) * ONE_DAY_MS;
        const timestamps = dailyAverages.map((d) => new Date(d.date).getTime());

        return dailyAverages.map((day, i) => ({
            date: day.date,
            avg: centeredWindowAvg(dailyAverages, timestamps, timestamps[i], halfWindowMs),
        }));
    }

    return {
        mergeChartOptions,
        exportChartAsPng,
        makeTooltipConfig,
        formatChartDate,
        movingAverageByDate,
    };
}
