<script setup>
defineProps({
    size: {
        type: Number,
        default: 40,
    },
    color: {
        type: String,
        default: '#42b983',
    },
});
</script>

<template>
    <div
        class="loader"
        :style="{ width: size + 'px', height: size + 'px' }"
    >
        <svg
            class="circular"
            viewBox="25 25 50 50"
        >
            <circle
                class="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                :stroke="color"
                stroke-width="3"
                stroke-miterlimit="10"
            />
        </svg>
    </div>
</template>

<style lang="scss" scoped>
.loader {
    position: relative;
    display: inline-block;
}

.circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
}

.path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
}
</style>
