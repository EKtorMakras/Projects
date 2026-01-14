<template>
  <div class="relative">
    <!-- Menu Button (Three Dots) -->
    <button
      @click="toggleMenu"
      class="text-gray-400 hover:text-gray-600 p-1 rounded transition"
      :title="menuOpen ? 'Close menu' : 'Actions menu'"
    >
      <i class="fas fa-ellipsis-v"></i>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="menuOpen"
      class="absolute right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-max"
    >
      <button
        v-for="(action, index) in actions"
        :key="action.id"
        @click="handleActionClick(action)"
        class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
        :class="{ 'border-t border-gray-200': index > 0 }"
      >
        <i
          v-if="action.icon"
          :class="`fas ${action.icon} mr-2`"
          :style="{ color: action.color || '#666' }"
        ></i>
        {{ action.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionMenu",

  props: {
    actions: {
      type: Array,
      required: true,
      validator: (actions) => {
        return actions.every((action) => action.id && action.label);
      },
    },
  },

  emits: ["action"],

  data() {
    return {
      menuOpen: false,
    };
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },

    closeMenu() {
      this.menuOpen = false;
    },

    handleActionClick(action) {
      this.$emit("action", action.id);
      this.closeMenu();
    },

    handleOutsideClick(e) {
      if (this.$el && !this.$el.contains(e.target)) {
        this.closeMenu();
      }
    },
  },

  mounted() {
    // Close menu when clicking outside
    document.addEventListener("click", this.handleOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>
