import { defineStore } from "pinia";
import { ref } from "vue";
import { projectAuth } from "@/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(null);
    const error = ref(null);
    const loading = ref(false);

    // Listen to Firebase auth state changes
    onAuthStateChanged(projectAuth, (_user) => {
        console.log("User state change. Current user is:", _user);
        user.value = _user;
    });

    async function signup(displayName, email, password) {
        loading.value = true;
        error.value = null;

        try {
            const response = await createUserWithEmailAndPassword(projectAuth, email, password);

            if (!response) {
                throw new Error("Could not complete signup");
            }

            user.value = response.user;
            await updateProfile(response.user, { displayName });
            return response;
        } catch (err) {
            error.value = err.message.replace("Firebase: ", "");
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function login(email, password) {
        loading.value = true;
        error.value = null;

        try {
            const response = await signInWithEmailAndPassword(projectAuth, email, password);
            user.value = response.user;
            return response;
        } catch (err) {
            error.value = err.message.replace("Firebase: ", "");
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function logout() {
        loading.value = true;
        error.value = null;

        try {
            const response = await signOut(projectAuth);
            console.log("Logout called", response);
            user.value = null;
        } catch (err) {
            error.value = err.message.replace("Firebase: ", "");
            throw err;
        } finally {
            loading.value = false;
        }
    }

    function getCurrentUser() {
        return projectAuth.currentUser;
    }

    function setUser(newUser) {
        user.value = newUser;
    }

    function clearError() {
        error.value = null;
    }

    return {
        user,
        error,
        loading,
        signup,
        login,
        logout,
        getCurrentUser,
        setUser,
        clearError,
    };
});
