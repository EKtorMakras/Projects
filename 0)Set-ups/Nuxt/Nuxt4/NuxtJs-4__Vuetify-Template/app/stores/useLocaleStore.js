import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const useLocaleStore = defineStore("locale", () => {
    const { $dayjs, $vuetify } = useNuxtApp();
    const { locale } = useI18n({ useScope: "global" });

    const localeCookie = useCookie("locale");

    function setLocale(newLocale) {
        locale.value = newLocale;
        $dayjs.locale(newLocale);

        // Update Vuetify locale only on client-side
        if (import.meta.client && $vuetify) {
            $vuetify.locale.current.value = newLocale;
        }

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
