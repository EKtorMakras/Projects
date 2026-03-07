<script setup>
defineProps({
    size: {
        type: [String, Number],
        default: 40,
    },
    color: {
        type: String,
        default: "#42b983",
    },
});
</script>

<template>
    <div
        class="circular-loader"
        :style="{
            width: `${size}px`,
            height: `${size}px`,
            borderColor: `${color} transparent transparent transparent`,
        }"
    ></div>
</template>

<style scoped>
.circular-loader {
    border-radius: 50%;
    border-width: 4px;
    border-style: solid;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
