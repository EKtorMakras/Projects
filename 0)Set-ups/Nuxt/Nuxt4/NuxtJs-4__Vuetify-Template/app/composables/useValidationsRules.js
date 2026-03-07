import { useI18n } from "vue-i18n";

export function useValidationRules() {
    const { t } = useI18n();

    const PATTERNS = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        alpha: /^[A-Za-z]+$/,
        alphaNumeric: /^[A-Za-z0-9]+$/,
    };
    const rules = {
        required: (value) =>
            !!value || value === 0 || t("validationMessages.required"),

        email: (value) =>
            PATTERNS.email.test(value) || t("validationMessages.email"),
        numeric: (value) =>
            (value !== null && value !== "" && !isNaN(Number(value))) ||
            t("validationMessages.numeric"),
        alpha: (value) =>
            PATTERNS.alpha.test(value) || t("validationMessages.alpha"),
        alphaNumeric: (value) =>
            PATTERNS.alphaNumeric.test(value) ||
            t("validationMessages.alphaNumeric"),
        date: (value) =>
            !isNaN(Date.parse(value)) || t("validationMessages.date"),

        minLength: (min) => (value) =>
            value?.length >= min || t("validationMessages.minLength", { min }),
        maxLength: (max) => (value) =>
            value?.length <= max || t("validationMessages.maxLength", { max }),
        minValue: (min, messageKey = "validationMessages.minValue") => {
            return (value) => value >= min || t(messageKey, { min });
        },
        maxValue: (max, messageKey = "validationMessages.maxValue") => {
            return (value) => value <= max || t(messageKey, { max });
        },

        confirmPassword: (getCompareValue) => {
            return (value) =>
                value === getCompareValue() ||
                t("validationMessages.confirmPassword");
        },

        customRegex: (
            regex,
            messageKey = "validationMessages.invalidFormat",
        ) => {
            return (value) => regex.test(value) || t(messageKey);
        },

        keyValuePairRequired: (getOtherValue) => {
            return (value) => {
                const other = getOtherValue();

                const hasValue = value?.trim?.() !== "";
                const hasOtherValue = other?.trim?.() !== "";

                if (hasOtherValue && !hasValue) {
                    return t("validationMessages.valueRequired");
                }

                return true;
            };
        },
    };

    return rules;
}
