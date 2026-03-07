<script setup>
defineProps({
    size: {
        type: [String, Number],
        default: 40,
    },
    color: {
        type: String,
        default: "primary-600",
    },
});
</script>

<template>
    <div
        class="rounded-full border-4 border-solid animate-spin"
        :style="{
            width: `${size}px`,
            height: `${size}px`,
            borderColor: 'transparent',
            borderTopColor: `var(--color-${color})`,
        }"
    ></div>
</template>
