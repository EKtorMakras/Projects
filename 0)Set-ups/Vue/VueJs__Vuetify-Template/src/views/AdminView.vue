<script setup>
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useRouter } from "vue-router";
import LayoutDefault from "@/layouts/LayoutDefault.vue";

const authStore = useAuthStore();
const router = useRouter();

function handleLogout() {
    authStore.logout();
    router.push({ name: "login" });
}
</script>

<template>
    <LayoutDefault>
        <v-card class="mb-6 pa-6">
            <v-card-title class="text-h3 mb-4">
                Admin Dashboard
            </v-card-title>

            <v-card-text>
                <p class="text-body-1 mb-2">
                    Welcome, <strong>{{ authStore.user?.username }}</strong>!
                </p>
                <p class="text-body-1">
                    Role: <v-chip
                        color="primary"
                        size="small"
                    >
                        {{ authStore.user?.role }}
                    </v-chip>
                </p>
            </v-card-text>
        </v-card>

        <v-card
            class="mb-6 pa-6"
            variant="tonal"
            color="surface-variant"
        >
            <v-card-title class="text-h5 mb-3">
                Protected Content
            </v-card-title>
            <v-card-text>
                <p class="text-body-1 mb-2">
                    This page is only accessible to authenticated users.
                </p>
                <p class="text-body-1">
                    It demonstrates the navigation guard in action.
                </p>
            </v-card-text>
        </v-card>

        <v-btn
            color="error"
            prepend-icon="mdi-logout"
            @click="handleLogout"
        >
            Logout
        </v-btn>
    </LayoutDefault>
</template>
