<script setup>
const props = defineProps({
    type: {
        type: String,
        default: "image",
    },
    height: {
        type: String,
        default: "250",
    },
});
</script>

<template>
    <v-skeleton-loader
        class="mx-auto border base-skeleton-loader"
        :type="props.type"
        :height="props.height"
    />
</template>

<style scoped lang="scss">
.base-skeleton-loader {
    :deep(.v-skeleton-loader__image) {
        height: 100% !important;
    }
}
</style>
