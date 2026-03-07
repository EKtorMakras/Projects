<script setup></script>

<template>
    <v-app>
        <!-- Header -->
        <LayoutMainNav />

        <!-- Sidebar -->
        <LayoutSideNav />

        <!-- Main Content -->
        <v-main>
            <v-container class="px-md-10 py-5">
                <slot></slot>
            </v-container>
        </v-main>
    </v-app>
</template>
