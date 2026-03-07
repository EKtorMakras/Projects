<script setup>
import { computed } from "vue";
import { useNotifications } from "@/composables/useNotifications";

const props = defineProps({
    notification: {
        type: Object,
        required: true,
    },
});

const { removeNotification } = useNotifications();

function close() {
    removeNotification(props.notification.id);
}

const colorMap = {
    success: "rgba(var(--v-theme-success-darken-1), 0.5)",
    error: "rgba(var(--v-theme-error-darken-1), 1)",
    warning: "rgba(var(--v-theme-warning-darken-1), 1)",
    info: "rgba(var(--v-theme-info-darken-1), 0.5)",
};

const progressStyle = computed(() => ({
    animationDuration: `${props.notification.duration}ms`,
    backgroundColor: colorMap[props.notification.type] || "rgba(0,0,0,0.2)",
}));
</script>

<template>
    <div class="notification-wrapper">
        <v-alert
            :type="notification.type"
            :title="notification.title"
            :text="notification.message"
            closable
            variant="elevated"
            elevation="4"
            class="notification-item"
            @click:close="close"
        />
        <div
            v-if="notification.duration > 0"
            class="notification-progress"
            :style="progressStyle"
        ></div>
    </div>
</template>

<style lang="scss" scoped>
.notification-wrapper {
    position: relative;
    min-width: 300px;
    max-width: 400px;
    pointer-events: auto;
}

.notification-item {
    padding-bottom: 10px;
}

.notification-progress {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    width: 100%;
    border-radius: 0 0 4px 4px;

    animation-name: notification-progress;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
}

@keyframes notification-progress {
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
}
</style>
