export function useDate() {
    const { $dayjs } = useNuxtApp();

    /**
     * Formats a given date into a string using Day.js with Greek locale
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
     * Converts a given date to a UTC-formatted string.
     * This method ensures that the date is properly formatted and adjusted to Coordinated Universal Time (UTC).
     * It uses Geoint Geoserver's expected date format (YYYY-MM-DDTHH:mm:ss[Z]) by default, making it particularly useful for working with global timestamps in Geoint applications.
     *
     * @param {string|number|Date|dayjs.Dayjs} date - The date to format. Can be an ISO string, timestamp, Date object, or dayjs instance.
     * @param {string} format - The desired format for the output. Defaults to the Geoint Geoserver format. Uses Day.js format tokens. (default: "YYYY-MM-DDTHH:mm:ss[Z]")
     * @returns {string} The formatted UTC date string
     *
     * @example
     * formatUtc("2024-01-15T12:00:00", "YYYY-MM-DD HH:mm:ss") // Output: "2024-01-15 12:00:00"
     * formatUtc(new Date()) // Output: "2024-01-15T10:30:00Z"
     */
    function formatUtc(date, format = "YYYY-MM-DDTHH:mm:ss[Z]") {
        if (!date) return "";

        return $dayjs(date).utc().format(format);
    }

    /**
     * Converts a UTC date string to local timezone and formats it.
     * This method parses the date as UTC and then converts it to the browser's local timezone.
     * Useful when the backend sends UTC timestamps and you want to display them in the user's local time.
     *
     * @param {string|number|Date|dayjs.Dayjs} date - The UTC date to convert. Can be an ISO string, timestamp, Date object, or dayjs instance.
     * @param {string} format - The desired format for the output. Uses Day.js format tokens. (default: "L")
     * @returns {string} The formatted date string in local timezone
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
