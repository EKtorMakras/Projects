<template>
  <span class="inline-flex items-center">
    <svg
      :class="['animate-spin', customClass]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  </span>
</template>

<script>
export default {
  name: "BaseSpinnerLoader",

  props: {
    customClass: {
      type: String,
      default: "w-6 h-6 text-sky-600",
    },
  },
};
</script>
