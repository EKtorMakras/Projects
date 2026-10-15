<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
    router.push({ name: "home" });
}
</script>

<template>
    <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <button @click="goHome">Go to Home</button>
    </div>
</template>

<style scoped></style>
