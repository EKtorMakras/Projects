<template>
  <div class="ml-4">
    <select
      class="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500 rounded px-3 py-2 pe-10 text-sm font-medium cursor-pointer transition duration-300 ease-in-out focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
      :value="locale"
      @change="handleLanguageChange"
    >
      <option value="en">🇬🇧 English</option>
      <option value="es">🇪🇸 Español</option>
    </select>
  </div>
</template>

<script>
import { useLocaleStore } from "@/stores/locale";
import { mapState } from "pinia";

export default {
  name: "LanguageSwitcher",

  computed: {
    ...mapState(useLocaleStore, ["locale"]),
  },

  methods: {
    handleLanguageChange(event) {
      const localeStore = useLocaleStore();
      localeStore.setLocale(event.target.value);
    },
  },
};
</script>
