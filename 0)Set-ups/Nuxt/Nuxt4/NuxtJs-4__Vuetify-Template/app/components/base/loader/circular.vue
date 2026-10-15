<script setup>
defineProps({
    size: { type: [String, Number], default: "default" },
    color: { type: String, default: "primary" },
});
</script>

<template>
    <v-progress-circular
        indeterminate
        :size="size"
        :color="color"
    />
</template>
