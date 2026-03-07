import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const useLocaleStore = defineStore("locale", () => {
    const { locale } = useI18n({ useScope: "global" });
    const localeCookie = useCookie("locale");
    const { $dayjs } = useNuxtApp();

    function setLocale(newLocale) {
        locale.value = newLocale;
        $dayjs.locale(newLocale);
        localeCookie.value = newLocale;
    }

    function initLocale() {
        const startingLocale = localeCookie.value || "el";
        setLocale(startingLocale);
    }

    return {
        locale,
        setLocale,
        initLocale,
    };
});
