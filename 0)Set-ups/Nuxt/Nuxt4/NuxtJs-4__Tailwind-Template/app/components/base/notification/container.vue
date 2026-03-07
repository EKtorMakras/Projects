<script setup>
import { useNotifications } from "@/composables/useNotifications";

defineOptions({ inheritAttrs: false })

const { notifications } = useNotifications();
</script>

<template>
    <Teleport to="body">
        <div
            v-bind="$attrs"
            class="fixed bottom-5 right-5 z-9999 flex flex-col-reverse gap-2.5 pointer-events-none"
        >
            <TransitionGroup
                enter-active-class="transition-all duration-300 ease-[ease]"
                leave-active-class="transition-all duration-300 ease-[ease]"
                enter-from-class="opacity-0 translate-x-[100px]"
                leave-to-class="opacity-0 translate-x-[100px]"
                move-class="transition-transform duration-300 ease-[ease]"
            >
                <BaseNotificationItem
                    v-for="notification in notifications"
                    :key="notification.id"
                    :notification="notification"
                />
            </TransitionGroup>
        </div>
    </Teleport>
</template>
