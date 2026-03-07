import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const useLocaleStore = defineStore("locale", () => {
    const { locale } = useI18n({ useScope: "global" });

    function setLocale(newLocale) {
        locale.value = newLocale;
        localStorage.setItem("locale", newLocale);
    }

    return { locale, setLocale };
});
