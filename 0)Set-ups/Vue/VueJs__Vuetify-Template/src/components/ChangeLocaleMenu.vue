<script setup>
import { useLocaleStore } from "@/stores/useLocaleStore.js";
import { useColor } from "@/composables/useColor.js";

const localeStore = useLocaleStore();
const { getColor } = useColor();

const langs = [
    {
        name: "English",
        value: "en",
    },
    {
        name: "Ελληνικά",
        value: "el",
    },
];
</script>

<template>
    <div>
        <v-menu location="bottom">
            <template #activator="{ props }">
                <v-btn
                    icon="mdi-translate"
                    variant="text"
                    :color="getColor('on-surface', 0.6)"
                    v-bind="props"
                />
            </template>

            <v-list
                nav
                density="compact"
            >
                <v-list-subheader class="text-subtitle-2 font-weight-bold mb-1"> Language </v-list-subheader>

                <v-list-item
                    v-for="lang in langs"
                    :key="lang.value"
                    link
                    rounded="xl"
                    :active="lang.value === localeStore.locale"
                    color="primary"
                    @click="localeStore.setLocale(lang.value)"
                >
                    {{ lang.name }}
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
