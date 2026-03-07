import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const authCookie = useCookie("auth_user");
    const user = ref(authCookie.value || null);

    const isAuthenticated = computed(() => user.value !== null);

    function login(username, password) {
        // Simulate an API call to authenticate the user
        // Case-insensitive comparison
        if (
            username.toLowerCase() === "admin" &&
            password.toLowerCase() === "password"
        ) {
            user.value = { username: "admin", role: "administrator" };
            authCookie.value = user.value;

            return true;
        }

        return false;
    }

    function logout() {
        user.value = null;
        authCookie.value = null;
    }

    return {
        user,
        isAuthenticated,
        login,
        logout,
    };
});
