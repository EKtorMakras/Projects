<script setup>
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/16/solid";
import { computed } from "vue";
import { useLocaleStore } from "@/stores/localeStore";

const localeStore = useLocaleStore();

const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "el", label: "Ελληνικά", flag: "🇬🇷" },
];

const selectedLang = computed({
    get: () => languages.find((lang) => lang.code === localeStore.locale),
    set: (lang) => localeStore.setLocale(lang.code),
});
</script>

<template>
    <div class="relative w-40">
        <Listbox v-model="selectedLang">
            <template #default="{ open }">
                <!-- ======== Button ======== -->
                <ListboxButton
                    class="focus-state bg-surface-variant-light flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-4 py-2 text-on-surface shadow transition dark:bg-surface-variant"
                >
                    <span class="flex items-center gap-2">
                        <span class="text-xl">{{ selectedLang.flag }}</span>
                        <span class="text-base">{{ selectedLang.label }}</span>
                    </span>
                    <ChevronDownIcon
                        :class="[
                            'transform text-on-surface-low-emphasis/60 transition-transform duration-200',
                            open ? 'rotate-180' : '',
                        ]"
                    />
                </ListboxButton>

                <!-- ======== Menu ======== -->
                <Transition
                    enter-active-class="transition ease-out duration-300"
                    enter-from-class="opacity-0 -translate-y-2 scale-95"
                    enter-to-class="opacity-100 translate-y-0 scale-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 translate-y-0 scale-100"
                    leave-to-class="opacity-0 -translate-y-2 scale-95"
                >
                    <ListboxOptions
                        class="bg-surface-variant-light absolute z-50 mt-1 w-full rounded-md py-1 text-on-surface shadow-lg focus:outline-none dark:bg-surface-variant"
                    >
                        <ListboxOption
                            v-for="lang in languages"
                            :key="lang.code"
                            :value="lang"
                        >
                            <template #default="{ selected, active }">
                                <div
                                    :class="[
                                        'flex cursor-pointer items-center gap-2 px-4 py-2 transition-colors duration-200',
                                        selected ? 'bg-primary-200/10' : '',
                                        active ? 'bg-primary-400/50' : '',
                                    ]"
                                >
                                    <span class="text-xl">{{ lang.flag }}</span>
                                    <span>{{ lang.label }}</span>
                                </div>
                            </template>
                        </ListboxOption>
                    </ListboxOptions>
                </Transition>
            </template>
        </Listbox>
    </div>
</template>
