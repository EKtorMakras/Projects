<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        {{ $t("header.appName") }}
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }">
              {{ $t("header.about") }}
            </router-link>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="toggleAuthModal"
            >
              {{ $t("header.loginRegister") }}
            </a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">
                {{ $t("header.manage") }}
              </router-link>
            </li>
          </template>
        </ul>

        <!-- Spacer and Right-side Controls -->
        <div class="ml-auto flex items-center gap-4">
          <!-- Language Switcher -->
          <LanguageSwitcher />

          <!-- User Menu (only show when logged in) -->
          <UserMenu class="ml-3" v-if="userStore.userLoggedIn" />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import useModalStore from "@/stores/modal";
import useUserStore from "@/stores/user";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import UserMenu from "./UserMenu.vue";

export default {
  name: "TheHeader",

  components: {
    LanguageSwitcher,
    UserMenu,
  },

  computed: {
    ...mapStores(useModalStore, useUserStore),
  },

  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
      console.log(this.modalStore.isOpen);
    },
  },
};
</script>

<style lang="scss" scoped></style>
