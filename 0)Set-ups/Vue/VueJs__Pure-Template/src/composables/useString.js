export function useString() {
    /**
     * Capitalizes the first character of a string and converts the rest to lowercase.
     *
     * @param {string} str - The input string.
     * @returns {string} The string with its first character in uppercase and the rest in lowercase.
     */
    function capitalize(str) {
        if (!str) return "";
        return str[0].toUpperCase() + str.substring(1).toLowerCase();
    }

    /**
     * Truncates a string to a specified length and adds an ellipsis if necessary.
     *
     * @param {string} str - The input string.
     * @param {number} maxLength - The maximum length of the string.
     * @param {string} [ellipsis="..."] - The ellipsis to append if the string is truncated.
     * @returns {string} The truncated string.
     */
    function truncate(str, maxLength, ellipsis = "...") {
        if (str.length <= maxLength) return str;
        return str.substring(0, maxLength - ellipsis.length) + ellipsis;
    }

    /**
     * Removes diacritical marks from a string and normalizes it.
     *
     * This function processes text by normalizing it to decompose characters into their base
     * and combining diacritical marks, then removes those marks, and finally recomposes the text.
     * It's particularly useful for languages like Greek or any text containing accented characters.
     *
     * @param {string} text - The input string to be cleaned and normalized.
     * @returns {string} The cleaned and normalized string without diacritical marks.
     */
    function removeDiacritics(text) {
        return text
            .normalize("NFD") // Decompose combined characters into base and diacritics
            .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
            .normalize("NFC"); // Recompose characters
    }

    /**
     * Cleans the input text by removing diacritical marks and converting it to lowercase.
     *
     * @param {string} text - The input string to be cleaned.
     * @returns {string} The cleaned text in lowercase.
     */
    function cleanText(text) {
        return removeDiacritics(text).toLowerCase();
    }

    return {
        capitalize,
        truncate,
        removeDiacritics,
        cleanText,
    };
}
