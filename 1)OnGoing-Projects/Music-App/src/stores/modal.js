import { defineStore } from "pinia";

export default defineStore("modal", {
  state() {
    return {
      isOpen: false,
    };
  },

  getters: {
    hiddenClass(state) {
      return !state.isOpen ? "hidden" : "";
    },
  },
});
