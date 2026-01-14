<template>
  <div class="relative">
    <div class="relative">
      <div
        class="flex items-center absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <img
          v-if="selectedCountryFlag"
          :src="selectedCountryFlag"
          :alt="selectedCountryFlagAlt"
          class="w-6 h-4 rounded mr-2"
        />
      </div>
      <input
        type="text"
        :class="inputClasses"
        :placeholder="$t('auth.selectCountry')"
        v-model="searchQuery"
        @focus="isOpen = true"
        @input="filterCountries"
        autocomplete="off"
        ref="inputRef"
      />
      <i
        class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
      ></i>
    </div>

    <!-- Dropdown - with dynamic positioning -->
    <div
      v-if="isOpen && filteredCountries.length > 0"
      :class="[
        dropdownClasses,
        direction === 'top' ? 'bottom-full mb-1' : 'top-full mt-1',
      ]"
    >
      <div
        v-for="country in filteredCountries"
        :key="country.cca2"
        :class="dropdownItemClasses"
        @click="selectCountry(country)"
      >
        <img
          :src="country.flags.svg"
          :alt="country.flags.alt"
          class="w-6 h-4 mr-3 rounded"
        />
        <span :class="dropdownTextClasses">{{ country.name.common }}</span>
      </div>
    </div>

    <!-- No results message -->
    <div
      v-if="isOpen && searchQuery && filteredCountries.length === 0"
      :class="[
        noResultsClasses,
        direction === 'top' ? 'bottom-full mb-1' : 'top-full mt-1',
      ]"
    >
      {{ $t("auth.noCountriesFound") }}
    </div>

    <!-- Hidden input for form submission -->
    <input
      type="hidden"
      :value="selectedCountry"
      @change="$emit('change', selectedCountry)"
    />
  </div>
</template>

<script>
export default {
  name: "CountrySelector",

  props: {
    modelValue: {
      type: String,
      default: "US",
    },
    direction: {
      type: String,
      default: "bottom",
      validator: (value) => ["top", "bottom"].includes(value),
    },
    variant: {
      type: String,
      default: "light",
      validator: (value) => ["light", "dark"].includes(value),
    },
  },

  emits: ["update:modelValue", "change"],

  data() {
    return {
      countries: [],
      filteredCountries: [],
      searchQuery: "",
      isOpen: false,
      selectedCountry: this.modelValue,
      selectedCountryFlag: "",
      selectedCountryFlagAlt: "",
      loading: false,
      variantStyles: {
        light: {
          input:
            "block w-full py-1.5 px-3 pl-14 border transition duration-500 focus:outline-none rounded text-gray-800 border-gray-300 bg-white focus:border-black",
          dropdown:
            "absolute left-0 right-0 border rounded shadow-lg max-h-60 overflow-y-auto z-[99999] bg-white border-gray-300",
          dropdownItem:
            "px-3 py-2 cursor-pointer transition flex items-center hover:bg-gray-100",
          dropdownText: "text-gray-800",
          noResults:
            "absolute left-0 right-0 border rounded shadow-lg p-3 text-center z-[99999] bg-white border-gray-300 text-gray-500",
        },
        dark: {
          input:
            "block w-full py-1.5 px-3 pl-14 border transition duration-500 focus:outline-none rounded border-sky-500 bg-slate-700 text-white placeholder-gray-400",
          dropdown:
            "absolute left-0 right-0 border rounded shadow-lg max-h-60 overflow-y-auto z-[99999] bg-slate-700 border-sky-500",
          dropdownItem:
            "px-3 py-2 cursor-pointer transition flex items-center hover:bg-slate-600",
          dropdownText: "text-white",
          noResults:
            "absolute left-0 right-0 border rounded shadow-lg p-3 text-center z-[99999] bg-slate-700 border-sky-500 text-gray-300",
        },
      },
    };
  },

  watch: {
    modelValue(newVal) {
      console.log("modelValue changed to:", newVal);
      this.selectedCountry = newVal;
      this.updateSelectedFlag();
    },
  },

  computed: {
    currentStyles() {
      return this.variantStyles[this.variant] || this.variantStyles.light;
    },

    inputClasses() {
      return this.currentStyles.input;
    },

    dropdownClasses() {
      return this.currentStyles.dropdown;
    },

    dropdownItemClasses() {
      return this.currentStyles.dropdownItem;
    },

    dropdownTextClasses() {
      return this.currentStyles.dropdownText;
    },

    noResultsClasses() {
      return this.currentStyles.noResults;
    },
  },

  methods: {
    async fetchCountries() {
      try {
        this.loading = true;
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,flags"
        );
        const data = await response.json();
        console.log("Fetched countries from API:", data);

        // Sort countries alphabetically by common name
        this.countries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        this.filteredCountries = this.countries;
        this.loading = false;

        console.log("Countries sorted:", this.countries.slice(0, 5));

        // Set the flag for the initially selected country
        this.updateSelectedFlag();
      } catch (error) {
        console.error("Error fetching countries:", error);
        this.loading = false;
      }
    },

    filterCountries() {
      if (!this.searchQuery) {
        this.filteredCountries = this.countries;
        return;
      }

      const query = this.searchQuery.toLowerCase();
      this.filteredCountries = this.countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      );
    },

    selectCountry(country) {
      console.log("selectCountry called with:", country);
      this.selectedCountry = country.name.common;
      this.selectedCountryFlag = country.flags.svg;
      this.selectedCountryFlagAlt = country.flags.alt;
      this.searchQuery = country.name.common;
      this.isOpen = false;
      console.log("selectedCountry:", this.selectedCountry);
      console.log("selectedCountryFlag:", this.selectedCountryFlag);
      console.log("searchQuery:", this.searchQuery);
      this.$emit("update:modelValue", country.name.common);
      this.$emit("change", country.name.common);
    },

    updateSelectedFlag() {
      console.log("updateSelectedFlag called");
      console.log("selectedCountry:", this.selectedCountry);
      console.log("countries array length:", this.countries.length);

      if (!this.selectedCountry || this.countries.length === 0) {
        console.log("No selectedCountry or countries not loaded yet");
        return;
      }

      // Find the flag for the currently selected country
      const country = this.countries.find(
        (c) => c.name.common === this.selectedCountry
      );

      console.log("Found country:", country);

      if (country) {
        this.selectedCountryFlag = country.flags.svg;
        this.selectedCountryFlagAlt = country.flags.alt;
        this.searchQuery = country.name.common;
        console.log("Set flag to:", this.selectedCountryFlag);
        console.log("Set searchQuery to:", this.searchQuery);
      } else {
        console.warn(
          `Could not find country matching "${this.selectedCountry}"`
        );
        // Show all available countries for debugging
        console.log(
          "Available countries:",
          this.countries.map((c) => c.name.common).slice(0, 10)
        );
      }
    },

    handleOutsideClick(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
      }
    },
  },

  mounted() {
    this.fetchCountries();

    // Close dropdown when clicking outside
    document.addEventListener("click", this.handleOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>
