<template>
  <!-- Header -->
  <TheHeader />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <AppPlayer />

  <!-- Auth Modal -->
  <AppAuth />
</template>

<script>
import useModalStore from "@/stores/modal";
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
import { auth } from "./includes/firebase";
import { useLocaleStore } from "@/stores/locale";

import TheHeader from "./components/TheHeader.vue";
import AppAuth from "./components/AppAuth.vue";
import AppPlayer from "./components/Player.vue";
import usePlayerStore from "@/stores/player";

export default {
  name: "App",

  components: {
    TheHeader,
    AppAuth,
    AppPlayer,
  },

  computed: {
    ...mapWritableState(useModalStore, {
      modalVisibility: "isOpen",
    }),
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },

  created() {
    // Initialize locale on app load
    const localeStore = useLocaleStore();
    localeStore.initLocale();

    const playerStore = usePlayerStore();

    window.addEventListener("keydown", (evt) => {
      // Close modal on Escape
      if (evt.code === "Escape") {
        this.modalVisibility = false;
        return;
      }

      // Toggle play/pause on Space, but ignore when user is typing in an input
      if (evt.code === "Space") {
        const active = document.activeElement;
        const tag =
          active && active.tagName ? active.tagName.toLowerCase() : null;
        const isEditable =
          tag === "input" || tag === "textarea" || active?.isContentEditable;

        if (!isEditable) {
          evt.preventDefault();
          playerStore.togglePlay();
        }
      }
    });

    // Check if user is logged in
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
