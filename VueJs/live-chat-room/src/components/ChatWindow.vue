<script setup>
import { onMounted, computed, ref, onUpdated } from "vue";
import { useCollection } from "@/composables/useCollection";
import { formatDistanceToNow } from "date-fns";

const { error, documents, getCollection } = useCollection("messages");

const messagesRef = ref(null);

const formattedMessages = computed(() => {
    if (!documents) return [];

    return documents.value.map((doc) => ({
        ...doc,
        formattedTime: formatDistanceToNow(doc.createdAt.toDate(), {
            addSuffix: true,
        }),
    }));
});

// Start listening to messages when component mounts
onMounted(() => {
    getCollection();
});

// Auto-scroll to bottom on new messages
onUpdated(() => {
    if (messagesRef.value) {
        messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
    }
});
</script>

<template>
    <div class="chat-window">
        <div v-if="error">
            {{ error }}
        </div>

        <div
            v-if="documents"
            ref="messagesRef"
            class="messages"
        >
            <div
                v-for="doc in formattedMessages"
                :key="doc.id"
                class="message"
            >
                <span class="created-at">{{ doc.formattedTime }}</span>
                <span class="name">{{ doc.user }}</span>
                <span class="message-text">{{ doc.message }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-window {
    background: #fafafa;
    padding: 30px 20px;
}
.single {
    margin: 18px 0;
}
.created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
}
.name {
    font-weight: bold;
    margin-right: 6px;
}
.messages {
    max-height: 400px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
}
</style>
