<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { withAsync } from "@/api/helpers/withAsync";
import BaseButtonPrimary from "@/components/base/BaseButtonPrimary.vue";

const authStore = useAuthStore();
const router = useRouter();

const formData = ref({
    email: "",
    password: "",
});

async function handleSubmit() {
    const { response, error } = await withAsync(
        authStore.login,
        formData.value.email,
        formData.value.password
    );

    if (!error && response) {
        router.push("/chatroom"); // Redirect after successful login
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
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
            Login
        </BaseButtonPrimary>
    </form>
</template>

<style lang="scss"></style>
