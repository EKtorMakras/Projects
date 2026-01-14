<script>
import { useI18n } from "vue-i18n";
import { auth } from "@/includes/firebase";
import useUserStore from "@/stores/user";

export default {
  name: "UserMenu",

  setup() {
    const { t } = useI18n();
    const userStore = useUserStore();
    return { t, userStore };
  },

  computed: {
    currentUser() {
      return this.userStore.currentUser;
    },

    userInitials() {
      const name = this.currentUser.displayName || "";
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    },
  },

  data() {
    return {
      isMenuOpen: false,
    };
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    async handleLogout() {
      await this.userStore.signOut();
      this.isMenuOpen = false;
      this.$router.push("/");
    },
  },

  created() {
    // Initialize user data from auth on component creation
    this.userStore.initializeUser();

    // Listen for auth state changes and update store
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.userStore.updateCurrentUser(user);
      }
    });
  },
};
</script>

<template>
  <div class="relative">
    <!-- User Avatar Button -->
    <button
      @click="toggleMenu"
      class="w-10 h-10 rounded-full bg-sky-500 text-white font-bold text-sm flex items-center justify-center hover:bg-sky-600 transition-colors"
    >
      {{ userInitials }}
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isMenuOpen"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-slate-700"
    >
      <!-- User Info -->
      <div class="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
        <p class="font-semibold text-gray-900 dark:text-white">
          {{ currentUser.displayName || "User" }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ currentUser.email }}
        </p>
      </div>

      <!-- Menu Items -->
      <div class="py-2">
        <router-link
          :to="{ name: 'settings' }"
          class="flex items-center gap-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          @click="isMenuOpen = false"
        >
          <i class="fas fa-cog text-gray-600 dark:text-gray-400 w-5" />
          <span>{{ t("settings.title") }}</span>
        </router-link>

        <button
          @click="handleLogout"
          class="flex items-center gap-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        >
          <i class="fas fa-sign-out-alt text-gray-600 dark:text-gray-400 w-5" />
          <span>{{ t("auth.signOut") }}</span>
        </button>
      </div>
    </div>

    <!-- Overlay to close menu -->
    <div
      v-if="isMenuOpen"
      @click="isMenuOpen = false"
      class="fixed inset-0 z-40"
    />
  </div>
</template>
