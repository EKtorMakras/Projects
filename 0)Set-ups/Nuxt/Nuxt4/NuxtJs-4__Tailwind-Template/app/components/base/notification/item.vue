<script setup>
import { ref, onMounted } from "vue";
import { useNotifications } from "@/composables/useNotifications";

const props = defineProps({
    notification: {
        type: Object,
        required: true,
    },
});

const { removeNotification } = useNotifications();
const progressWidth = ref(100);

function close() {
    removeNotification(props.notification.id);
}

onMounted(() => {
    // Start the countdown animation if duration is set
    if (props.notification.duration > 0) {
        // Small delay to ensure the transition triggers properly
        setTimeout(() => {
            progressWidth.value = 0;
        }, 10);
    }
});
</script>

<template>
    <div
        class="min-w-75 max-w-md p-4 bg-card rounded-lg shadow-lg flex gap-3 pointer-events-auto border-l-4 relative overflow-hidden"
        :class="{
            'border-l-success-500': notification.type === 'success',
            'border-l-error-500': notification.type === 'error',
            'border-l-[#ff9800]': notification.type === 'warning',
            'border-l-primary-500': notification.type === 'info',
        }"
    >
        <div class="flex-1">
            <strong
                v-if="notification.title"
                class="block mb-1 text-sm font-semibold"
            >
                {{ notification.title }}
            </strong>
            <p
                v-if="notification.message"
                class="m-0 text-sm text-surface-fg-low-emphasis leading-relaxed"
            >
                {{ notification.message }}
            </p>
        </div>
        <button
            class="bg-transparent border-none text-2xl leading-none cursor-pointer text-surface-fg-low-emphasis p-0 w-6 h-6 flex items-center justify-center hover:text-surface-fg-high-emphasis"
            @click="close"
        >
            ×
        </button>
        <div
            v-if="notification.duration > 0"
            class="absolute bottom-0 left-0 right-0 h-1 bg-black/5 overflow-hidden"
        >
            <div
                class="h-full"
                :class="{
                    'bg-success-500/30': notification.type === 'success',
                    'bg-error-500/30': notification.type === 'error',
                    'bg-[#ff9800]/30': notification.type === 'warning',
                    'bg-primary-500/30': notification.type === 'info',
                }"
                :style="{
                    width: `${progressWidth}%`,
                    transition: `width ${notification.duration}ms linear`,
                }"
            ></div>
        </div>
    </div>
</template>
