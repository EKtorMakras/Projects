/**
 * @documentation
 * -----------------------------------------------------------------------------
 * Utility function to convert a decimal number to a percentage string.
 *
 * Multiplies the input value by 100, formats it to the specified number of decimal
 * places, and appends a percent sign ("%").
 *
 * @param { number } value - The decimal value to convert (e.g., 0.25 for 25%).
 * @param { number } [decimals=0] - Number of decimal places to include in the result.
 *
 * @returns { string } The formatted percentage string (e.g., "25%", "12.5%").
 *
 * @example
 * toPercentage(0.5);        // "50%"
 * toPercentage(0.1234, 2);  // "12.34%"
 * toPercentage(1);          // "100%"
 */

export function toPercentage(value, decimals = 0) {
    return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * @documentation
 * -----------------------------------------------------------------------------
 * Converts a camelCase string to kebab-case.
 *
 * @param { string } str - The camelCase string to convert.
 *
 * @returns { string } The kebab-case formatted string.
 *
 * @example
 * toKebabCase("camelCaseString");  // "camel-case-string"
 * toKebabCase("myVariableName");   // "my-variable-name"
 */
export function toKebabCase(str) {
    if (typeof str !== "string") {
        console.warn("toKebabCase: Expected a string, got", typeof str);
        return "";
    }

    return str
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();
}

/**
 * @documentation
 * -----------------------------------------------------------------------------
 * Converts a kebab-case string to camelCase.
 *
 * @param { string } str - The kebab-case string to convert.
 *
 * @returns { string } The camelCase formatted string.
 *
 * @example
 * toCamelCase("kebab-case-string");  // "kebabCaseString"
 * toCamelCase("my-variable-name");   // "myVariableName"
 */
export function toCamelCase(str) {
    if (typeof str !== "string") {
        console.warn("toCamelCase: Expected a string, got", typeof str);
        return "";
    }

    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 * @documentation
 * -----------------------------------------------------------------------------
 * Converts any string format to PascalCase.
 *
 * Handles camelCase, kebab-case, snake_case, and space-separated strings.
 *
 * @param { string } str - The string to convert.
 *
 * @returns { string } The PascalCase formatted string.
 *
 * @example
 * toPascalCase("camelCaseString");   // "CamelCaseString"
 * toPascalCase("kebab-case-string"); // "KebabCaseString"
 * toPascalCase("snake_case_string"); // "SnakeCaseString"
 * toPascalCase("hello world");       // "HelloWorld"
 */
export function toPascalCase(str) {
    if (typeof str !== "string") {
        console.warn("toPascalCase: Expected a string, got", typeof str);
        return "";
    }

    return str
        .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
        .replace(/^(.)/, (char) => char.toUpperCase());
}

/**
 * @documentation
 * -----------------------------------------------------------------------------
 * Converts any string format to snake_case.
 *
 * Handles camelCase, PascalCase, kebab-case, and space-separated strings.
 *
 * @param { string } str - The string to convert.
 *
 * @returns { string } The snake_case formatted string.
 *
 * @example
 * toSnakeCase("camelCaseString");   // "camel_case_string"
 * toSnakeCase("PascalCaseString");  // "pascal_case_string"
 * toSnakeCase("kebab-case-string"); // "kebab_case_string"
 * toSnakeCase("Hello World");       // "hello_world"
 */
export function toSnakeCase(str) {
    if (typeof str !== "string") {
        console.warn("toSnakeCase: Expected a string, got", typeof str);
        return "";
    }

    return str
        .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
        .replace(/[-\s]+/g, "_")
        .toLowerCase();
}
