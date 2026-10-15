<script setup>
import { useLocaleStore } from "@/stores/useLocaleStore.js";

defineProps({
    color: { type: String, default: null },
});

const localeStore = useLocaleStore();

const langs = [
    { value: "en", label: "EN", flag: "/flags/gb.svg" },
    { value: "el", label: "EL", flag: "/flags/gr.svg" },
];

function handleUpdate(value) {
    if (value) localeStore.setLocale(value);
}
</script>

<template>
    <v-btn-toggle
        :model-value="localeStore.locale"
        :color="color"
        density="compact"
        variant="outlined"
        mandatory
        divided
        rounded="xs"
        @update:model-value="handleUpdate"
    >
        <v-btn
            v-for="lang in langs"
            :key="lang.value"
            :value="lang.value"
            :base-color="color"
            size="x-small"
            class="px-2 text-caption font-weight-medium"
        >
            <img
                :src="lang.flag"
                :alt="lang.label"
                class="flag d-block me-1"
            />
            <span>{{ lang.label }}</span>
        </v-btn>
    </v-btn-toggle>
</template>

<style lang="scss" scoped>
.flag {
    width: 1.25em;
    height: auto;
    border-radius: 1px;
}

:deep(.v-btn) {
    &.v-btn--variant-outlined {
        --v-border-opacity: 0.1;
    }

    &.v-btn--active {
        --v-activated-opacity: 0.06;
    }

    &:not(.v-btn--active) {
        opacity: 0.85;
    }
}
</style>
