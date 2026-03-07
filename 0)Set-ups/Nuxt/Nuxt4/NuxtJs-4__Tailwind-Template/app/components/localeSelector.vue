<script setup>
import { useLocaleStore } from "@/stores/useLocaleStore";
import { useI18n } from "vue-i18n";

const localeStore = useLocaleStore();
const { locale } = useI18n();

const languages = [
    { code: "en", name: "English" },
    { code: "el", name: "Ελληνικά" },
];

const handleLocaleChange = (event) => {
    localeStore.setLocale(event.target.value);
};
</script>

<template>
    <div class="inline-block">
        <select
            :value="locale"
            class="py-2 px-4 border border-surface-variant-dark rounded-md bg-card text-surface-fg text-sm cursor-pointer transition-all duration-200 hover:border-primary-600 focus:outline-none focus:border-primary-600 focus:ring-[3px] focus:ring-primary-600/10"
            @change="handleLocaleChange"
        >
            <option
                v-for="lang in languages"
                :key="lang.code"
                :value="lang.code"
            >
                {{ lang.name }}
            </option>
        </select>
    </div>
</template>
