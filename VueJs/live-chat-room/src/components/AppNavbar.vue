<script setup>
import BaseButtonPrimary from "./base/BaseButtonPrimary.vue";
import { withAsync } from "@/api/helpers/withAsync";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

async function handleLogout() {
    const { error } = await withAsync(authStore.logout);

    if (error) {
        console.error("Logout error:", error);
        return;
    }

    router.push("/");
}
</script>

<template>
    <nav>
        <div v-if="authStore.user">
            <p class="title">
                Hey there, {{ authStore.user?.displayName }}!
            </p>
            <p class="email">
                Currently logged in as {{ authStore.user?.email }}
            </p>
        </div>
        <BaseButtonPrimary
            v-if="authStore.user"
            :loading="authStore.loading"
            @click="handleLogout"
        >
            Logout
        </BaseButtonPrimary>
        <BaseButtonPrimary
            v-else
            style="margin-left: auto;"
            @click="router.push('/')"
        >
            Login
        </BaseButtonPrimary>
    </nav>
</template>

<style lang="scss">
    nav {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
            margin: 2px auto;
            font-size: 16px;
            color: #444;

            &.email {
                font-size: 14px;
                color: #999;
            }

            &.title {
                font-size: 20px !important;
                margin-bottom: 5px;
            }
        }
    }
</style>
