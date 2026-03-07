<script setup>
import MainNav from "@/components/layout/MainNav.vue";
import SideNav from "@/components/layout/SideNav.vue";
</script>

<template>
    <v-app>
        <!-- Header -->
        <MainNav />

        <!-- Sidebar -->
        <SideNav />

        <!-- Main Content -->
        <v-main>
            <v-container class="px-md-10 py-5">
                <slot></slot>
            </v-container>
        </v-main>
    </v-app>
</template>
