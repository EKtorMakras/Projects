<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium tracking-wide cursor-pointer focus-state transition-all disabled:opacity-40 disabled:pointer-events-none border border-transparent',
      customClass,
    ]"
    :disabled="disabled || loading"
  >
    <slot name="left" />

    <span v-if="loading">
      <BaseSpinnerLoader :customClass="spinnerClass" />
    </span>

    <template v-else>
      <slot />
    </template>

    <slot name="right" />
  </button>
</template>

<script>
export default {
  name: "BaseButton",

  props: {
    customClass: {
      type: String,
      default:
        "bg-sky-600 text-white hover:bg-sky-700 px-4 py-2 rounded-md text-base",
    },
    spinnerClass: {
      type: String,
      default: "w-4 h-4 text-white",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
