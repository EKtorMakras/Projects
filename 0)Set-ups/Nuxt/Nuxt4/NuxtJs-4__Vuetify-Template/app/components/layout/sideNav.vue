<script setup>
import { ref } from "vue";

const drawer = ref(true);

const navItems = [
    {
        name: "Home",
        path: "/",
        icon: "mdi-home",
    },
    {
        name: "About",
        path: "/about",
        icon: "mdi-information",
    },
    {
        name: "Playground",
        path: "/playground",
        icon: "mdi-play-circle",
    },
    {
        name: "Admin",
        path: "/admin",
        icon: "mdi-shield-account",
    },
];
</script>

<template>
    <v-navigation-drawer
        v-model="drawer"
    >
        <v-list class="pt-5">
            <v-list-item
                v-for="item in navItems"
                :key="`item-${item.name}`"
                :to="item.path"
                :prepend-icon="item.icon"
                :title="item.name"
                rounded="xl"
            />
        </v-list>
    </v-navigation-drawer>
</template>
