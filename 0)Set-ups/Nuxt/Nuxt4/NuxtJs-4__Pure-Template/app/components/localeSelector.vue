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
    <div class="locale-switcher">
        <select
            :value="locale"
            class="locale-switcher__select"
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

<style lang="scss" scoped>
.locale-switcher {
    display: inline-block;

    &__select {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        border-radius: 6px;

        border: 1px solid var(--clr-surface-variant-dark, #444);
        background-color: var(--clr-card, #1e1e1e);
        color: var(--clr-surface-fg, #f5f5f5);

        cursor: pointer;
        transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;

        appearance: none;

        &:hover {
            border-color: var(--clr-primary-600, #4f46e5);
        }

        &:focus {
            outline: none;
            border-color: var(--clr-primary-600, #4f46e5);
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
    }
}
</style>
