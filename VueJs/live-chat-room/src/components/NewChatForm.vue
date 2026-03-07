<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { timestamp } from "@/firebase";
import { useCollection } from "@/composables/useCollection";
import BaseButtonPrimary from "./base/BaseButtonPrimary.vue";

const authStore = useAuthStore();
const { addDoc, error } = useCollection("messages");

const message = ref("");
const loading = ref(false);

async function handleSubmit(event) {
    event.preventDefault();
    loading.value = true;

    const chatObj = {
        message: message.value,
        user: authStore.user.displayName,
        createdAt: timestamp(),
    };

    await addDoc(chatObj);

    if(!error.value) {

        message.value = "";
    }

    loading.value = false;
}
</script>

<template>
    <form @submit="handleSubmit">
        <textarea
            v-model="message"
            placeholder="Type your message here..."
            rows="3"
            @keydown.enter.prevent="handleSubmit"
        ></textarea>
        <div
            v-if="error"
            class="error"
        >
            {{ error }}
        </div>
        <BaseButtonPrimary
            type="submit"
            :loading="loading"
            :disabled="!message.trim() || loading"
        >
            Send
        </BaseButtonPrimary>
    </form>
</template>

<style lang="scss" scoped>
form {
    margin: 10px;
    padding-bottom: 20px;
}
textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
}
</style>
