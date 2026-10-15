<script setup>
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
</script>

<template>
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
</template>

<style lang="scss" scoped>
.notification-item {
    min-width: 300px;
    max-width: 400px;
    pointer-events: auto;
}
</style>
