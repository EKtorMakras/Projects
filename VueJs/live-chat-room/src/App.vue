<script setup>
import { onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

onMounted(() => {
    console.log("App mounted - authStore.user:", authStore.user);
});

watch(
    () => authStore.user,
    (newUser) => {
        console.log("authStore.user changed:", newUser);
    }
);
</script>

<template>
    <RouterView />
</template>

<style scoped></style>
