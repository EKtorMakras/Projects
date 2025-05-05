import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import dayjs from "@/plugins/dayjs";

export const useLocaleStore = defineStore("locale", () => {
    const { locale } = useI18n({ useScope: "global" });

    function setLocale(newLocale) {
        locale.value = newLocale;
        dayjs.locale(newLocale);
        localStorage.setItem("locale", newLocale);
    }

    function initLocale() {
        const startingLocale = localStorage.getItem("locale") || "el";
        setLocale(startingLocale);
    }

    return { locale, setLocale, initLocale };
});
