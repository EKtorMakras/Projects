<script setup>
import { ref } from "vue";
import SignupForm from "@/components/SignupForm.vue";
import LoginForm from "@/components/LoginForm.vue";

const showLogin = ref(true);
</script>

<template>
    <div class="welcome container">
        <p>Welcome</p>

        <div v-if="!showLogin">
            <SignupForm />
            <p>Already have an account? Please <span @click="showLogin = true">log in</span>.</p>
        </div>

        <div v-if="showLogin">
            <h2>Login</h2>
            <LoginForm />
            <p>No account? Please <span @click="showLogin = false">sign up</span>.</p>
        </div>
    </div>
</template>

<style lang="scss">
.welcome {
    text-align: center;
    padding: 20px 0;

    form {
        width: 300px;
        margin: 20px auto;
    }

    label {
        display: block;
        margin: 20px 0 10px;
    }

    input {
        width: 100%;
        padding: 10px;
        border-radius: 20px;
        border: 1px solid #eee;
        outline: none;
        color: #999;
        margin: 10px auto;
    }

    span{
        color: var(--color-primary);
        font-weight: bold;
        text-decoration: underline;
        cursor: pointer;
    }

    button {
        margin: 20px auto;
    }
}
</style>
