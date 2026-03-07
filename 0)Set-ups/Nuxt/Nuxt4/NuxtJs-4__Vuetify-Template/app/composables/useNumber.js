import { isDefined } from "@/utils/generalUtils";

/**
 * NUMBER HELPERS
 *
 * Composable for formatting and handling numeric values
 */

export function useNumber() {
    /**
     * Format a number with consistent precision and decimal handling
     * @param {number|string} value - The number to format
     * @param {Object} options - Formatting options
     * @param {number} options.maxDecimals - Maximum decimal places (default: 4)
     * @param {number} options.significantDigits - Use significant digits instead of decimals
     * @param {boolean} options.removeTrailingZeros - Remove trailing zeros (default: true)
     * @param {string} options.fallback - Fallback value if number is invalid (default: '-')
     * @returns {string} Formatted number string
     */
    function formatNumber(value, options = {}) {
        const {
            maxDecimals = 4,
            significantDigits = null,
            removeTrailingZeros = true,
            fallback = "-",
        } = options;

        // Handle null, undefined, or empty string
        if (!isDefined(value) || value === "") {
            return fallback;
        }

        // Convert to number
        const num = Number(value);

        // Check if valid number
        if (isNaN(num)) {
            return fallback;
        }

        let formatted;

        // Use significant digits if specified
        if (significantDigits !== null) {
            formatted = parseFloat(
                num.toPrecision(significantDigits),
            ).toString();
        } else {
            // Use fixed decimal places
            formatted = num.toFixed(maxDecimals);
        }

        // Remove trailing zeros if requested
        if (removeTrailingZeros) {
            formatted = parseFloat(formatted).toString();
        }

        return formatted;
    }

    return {
        formatNumber,
    };
}
