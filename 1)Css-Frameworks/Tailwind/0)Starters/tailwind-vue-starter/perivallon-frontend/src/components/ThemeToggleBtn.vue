<script setup>
import { Switch } from "@headlessui/vue";
import { useThemeStore } from "@/stores/themeStore.js";
import { computed } from "vue";

const themeStore = useThemeStore();
const isDark = computed({
    get: () => themeStore.currentTheme === "dark",
    set: (val) => themeStore.setTheme(val ? "dark" : "light"),
});
</script>

<template>
    <Switch
        v-model="isDark"
        class="focus-state relative inline-flex h-8 w-16 cursor-pointer items-center rounded-full bg-surface-variant transition-colors duration-300"
    >
        <!-- Thumb -->
        <span
            class="flex h-6 w-6 transform items-center justify-center rounded-full transition duration-300"
            :class="[
                isDark
                    ? 'translate-x-9 text-[14px] text-yellow-300 shadow-[0_2px_6px_rgba(255,255,255,0.3)]'
                    : 'translate-x-1 text-yellow-500 shadow-md',
            ]"
        >
            <span>{{ isDark ? "🌙" : "☀️" }}</span>
        </span>
    </Switch>
</template>
