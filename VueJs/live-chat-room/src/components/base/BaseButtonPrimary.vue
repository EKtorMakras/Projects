<script setup>
import BaseLoader from "./BaseLoader.vue";

defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: "button",
    },
});
</script>

<template>
    <button
        :type="type"
        :disabled="disabled || loading"
        class="btn btn--primary"
    >
        <BaseLoader v-if="loading" />
        <slot v-else></slot>
    </button>
</template>

<style lang="scss" scoped>
.btn {
    &--primary {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
}
</style>
