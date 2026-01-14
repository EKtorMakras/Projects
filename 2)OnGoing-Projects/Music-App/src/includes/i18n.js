import { createI18n } from "vue-i18n";
import messages from "@/locales";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  messages,
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
      },
    },
    es: {
      currency: {
        style: "currency",
        currency: "EUR",
      },
    },
  },
});

export default i18n;
