import { createI18n } from "vue-i18n";
import el from "@/locales/el.js";
import en from "@/locales/en.js";

export default defineNuxtPlugin(({ vueApp }) => {
    // Get locale from cookie (works on both server and client)
    const localeCookie = useCookie("locale");
    const initialLocale = localeCookie.value || "el";

    const i18n = createI18n({
        legacy: false,
        locale: initialLocale,
        fallbackLocale: "en",
        messages: {
            en,
            el,
        },
    });

    vueApp.use(i18n);

    return {
        provide: {
            i18n,
        },
    };
});
