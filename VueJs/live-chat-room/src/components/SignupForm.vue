<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { withAsync } from "@/api/helpers/withAsync";
import BaseButtonPrimary from "@/components/base/BaseButtonPrimary.vue";

const authStore = useAuthStore();
const router = useRouter();

const formData = ref({
    displayName: "",
    email: "",
    password: "",
});

async function handleSubmit() {
    const { response, error } = await withAsync(
        authStore.signup,
        formData.value.displayName,
        formData.value.email,
        formData.value.password
    );

    if (!error && response) {
        // Optionally update display name here if needed
        // await authStore.user.updateProfile({ displayName: formData.value.displayName });
        router.push("/chatroom"); // Redirect after successful signup
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input
            v-model="formData.displayName"
            type="text"
            required
            placeholder="display name"
        />
        <input
            v-model="formData.email"
            type="email"
            required
            placeholder="email"
        />
        <input
            v-model="formData.password"
            type="password"
            required
            placeholder="password"
        />
        <div
            v-if="authStore.error"
            class="error"
        >
            {{ authStore.error }}
        </div>
        <BaseButtonPrimary
            type="submit"
            :loading="authStore.loading"
        >
            Sign Up
        </BaseButtonPrimary>
    </form>
</template>

<style lang="scss"></style>
