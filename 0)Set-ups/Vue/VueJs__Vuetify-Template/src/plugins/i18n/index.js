import { createI18n } from "vue-i18n";
import el from "@/locales/el.js";
import en from "@/locales/en.js";

const i18n = createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: localStorage.getItem("locale") || "en",
    fallbackLocale: "en",
    messages: {
        en,
        el,
    },
});

export default i18n;
