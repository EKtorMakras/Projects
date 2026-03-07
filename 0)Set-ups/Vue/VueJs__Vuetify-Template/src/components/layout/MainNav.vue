<script setup>
import { useRoute } from "vue-router";
import ChangeLocaleMenu from "@/components/ChangeLocaleMenu.vue";
import ChangeThemeBtn from "@/components/ChangeThemeBtn.vue";

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
                <ChangeLocaleMenu />

                <!-- Change Theme -->
                <ChangeThemeBtn />
            </div>
        </template>
    </v-app-bar>
</template>
