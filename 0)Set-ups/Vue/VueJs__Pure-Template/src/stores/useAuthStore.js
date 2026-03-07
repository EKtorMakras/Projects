import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(null);

    const isAuthenticated = computed(() => user.value !== null);

    function login(username, password) {
        // Simulate an API call to authenticate the user
        if (username === "admin" && password === "password") {
            user.value = { username: "admin", role: "administrator" };
            return true;
        }

        return false;
    }

    function logout() {
        user.value = null;
    }

    return {
        user,
        isAuthenticated,
        login,
        logout,
    };
});
