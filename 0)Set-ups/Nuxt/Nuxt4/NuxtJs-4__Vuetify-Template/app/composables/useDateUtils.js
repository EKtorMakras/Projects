export function useDateUtils() {
    const { $dayjs } = useNuxtApp();

    /**
     * Formats a given date into a string using Day.js with the active app locale.
     *
     * @param {string|number|Date|dayjs.Dayjs} date - The date to format (ISO string, timestamp, Date object, or Day.js instance)
     * @param {string} format - The format to use (default: "L" for localized date)
     * @returns {string} The formatted date string
     *
     * @example
     * formatDate("2024-01-15") // Output: "15/01/2024"
     * formatDate(new Date(), "DD/MM/YYYY") // Output: "15/01/2024"
     * formatDate(1705286400000, "DD/MM/YYYY, HH:mm") // Output: "15/01/2024, 00:00"
     * formatDate("2024-01-15", "MMMM D, YYYY") // Output: "Ιανουαρίου 15, 2024"
     */
    function formatDate(date, format = "L") {
        if (!date) return "";

        return $dayjs(date).format(format);
    }

    /**
     * Formats a date as a UTC string (default: `YYYY-MM-DDTHH:mm:ss[Z]`).
     *
     * @param {string|number|Date|dayjs.Dayjs} date
     * @param {string} format - Day.js format tokens
     * @returns {string}
     */
    function formatUtc(date, format = "YYYY-MM-DDTHH:mm:ss[Z]") {
        if (!date) return "";

        return $dayjs(date).utc().format(format);
    }

    /**
     * Parses a date as UTC, converts it to the browser's local timezone and formats it.
     *
     * @param {string|number|Date|dayjs.Dayjs} date
     * @param {string} format - Day.js format tokens (default: "L")
     * @returns {string}
     */
    function formatUtcToLocal(date, format = "L") {
        if (!date) return "";

        return $dayjs.utc(date).local().format(format);
    }

    return {
        formatDate,
        formatUtc,
        formatUtcToLocal,
    };
}
