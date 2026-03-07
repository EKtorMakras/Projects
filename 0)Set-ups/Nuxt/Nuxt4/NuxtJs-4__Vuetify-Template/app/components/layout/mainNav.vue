<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
    <v-app-bar
        height="80"
        class="shadow-dark"
    >
        <v-app-bar-title>{{ route.meta.title || route.name }}</v-app-bar-title>

        <template #append>
            <div class="d-flex align-center justify-space-around ga-2">
                <!-- Change Locale -->
                <LocaleSelector />

                <!-- Change Theme -->
                <ThemeSwitcher />
            </div>
        </template>
    </v-app-bar>
</template>
