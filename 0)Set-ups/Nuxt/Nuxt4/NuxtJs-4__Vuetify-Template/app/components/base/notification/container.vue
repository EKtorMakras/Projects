<script setup>
import { useNotifications } from "@/composables/useNotifications";
import { Z_INDEXES } from "@/common/styles/zIndexes.js";

const { notifications } = useNotifications();
</script>

<template>
    <Teleport to="body">
        <div
            class="notification-container"
            :style="`z-index: ${Z_INDEXES.toast}`"
        >
            <TransitionGroup name="notification">
                <BaseNotificationItem
                    v-for="notification in notifications"
                    :key="notification.id"
                    :notification="notification"
                />
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
.notification-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    pointer-events: none;
}

.notification {
    &-enter-active,
    &-leave-active {
        transition: var(--transition-base);
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
        transform: translateX(100px);
    }

    &-move {
        transition: transform var(--duration-base) var(--easing-default);
    }
}
</style>
