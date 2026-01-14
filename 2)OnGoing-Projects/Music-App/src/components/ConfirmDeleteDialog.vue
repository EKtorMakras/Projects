<template>
  <Transition name="modal">
    <div v-if="modelValue">
      <!-- Background Overlay and Modal Container -->
      <div
        @click="handleCancel"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <!-- Modal Card -->
        <div
          @click.stop
          class="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        >
          <!-- Title -->
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            {{ title }}
          </h3>

          <!-- Message -->
          <p class="text-gray-600 mb-6">
            {{ message }}
          </p>

          <!-- Actions -->
          <div class="flex justify-end space-x-3">
            <button
              @click="handleCancel"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              @click="handleDelete"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "ConfirmDeleteDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Confirm Delete",
    },
    message: {
      type: String,
      default:
        "Are you sure you want to delete this item? This action cannot be undone.",
    },
  },

  emits: ["update:modelValue", "delete-confirm"],

  watch: {
    modelValue(newValue) {
      if (newValue) {
        window.addEventListener("keydown", this.handleEscape);
      } else {
        window.removeEventListener("keydown", this.handleEscape);
      }
    },
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.handleEscape);
  },

  methods: {
    handleEscape(event) {
      if (event.key === "Escape") {
        this.handleCancel();
      }
    },
    handleCancel() {
      this.$emit("update:modelValue", false);
    },
    handleDelete() {
      this.$emit("delete-confirm");
      this.$emit("update:modelValue", false);
    },
  },
};
</script>

<style scoped>
/* Fade and scale transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-out;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: all 0.2s ease-out;
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-from .bg-white {
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-to .bg-white {
  transform: scale(0.9);
}
</style>
