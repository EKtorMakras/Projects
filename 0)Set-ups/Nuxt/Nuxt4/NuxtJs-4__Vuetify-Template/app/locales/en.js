export default {
    siteName: "Nuxt Template",
    welcome: "Welcome",
    home: "Home",
    about: "About",
    aboutPage: {
        title: "About This Template",
        description: "This is a clean Nuxt starter template with i18n support.",
        features: "Features",
        selectLanguage: "Select Language",
    },
    admin: {
        title: "Admin Panel",
        description: "This is a protected admin page.",
        protectedContent: "Protected Content",
        message: "Only authenticated users can see this page.",
    },
    close: "Close",
    scrollToTop: "Scroll to top",

    // Generic table strings
    baseTable: {
        searchPlaceholder: "Search table",
        loading: "Loading...",
        noData: "No records found.",
        status: {
            active: "Active",
            warning: "Warning",
            inactive: "Inactive",
        },
    },

    // Generic export button
    baseExportButton: {
        label: "Export",
        defaultTooltip: "Download data",
    },

    // Validation messages
    validationMessages: {
        required: "This field is required",
        email: "Please enter a valid email address",
        numeric: "Please enter a numeric value",
        alpha: "Please enter only alphabetic characters",
        alphaNumeric: "Please enter only alphanumeric characters",
        date: "Please enter a valid date",
        minLength: "Minimum length is {min} characters",
        maxLength: "Maximum length is {max} characters",
        minValue: "Minimum value is {min}",
        maxValue: "Maximum value is {max}",
        confirmPassword: "Passwords do not match",
        invalidFormat: "Invalid format",
        valueRequired: "This field is required when the related field has a value",
    },

    // Autocomplete component
    autocompleteServer: {
        noMoreResults: "No more results",
        noResults: "No results found",
    },

    // Clipboard
    clipboard: {
        copied: "Copied to clipboard",
        copyTooltip: "Copy",
    },

    // Error page
    errorPage: {
        title: "Page not found.",
        description: "The page you are looking for does not exist. Return to the homepage.",
        button: "Return to homepage",
    },

    // Language names (for locale selector)
    languages: {
        en: "English",
        el: "Greek",
    },
};
