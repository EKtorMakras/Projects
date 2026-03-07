<template>
  <v-text-field
      :value="search"
      class="expanding-searchbar mt-2"
      :class="{ 'closed' : searchClosed && !search }"
      :disabled="$store.state.sorting"
      placeholder="Search..."
      prepend-inner-icon="mdi-magnify"
      filled
      dense
      clearable
      @input="updateSearch"
      @focus="searchClosed = false"
      @blur="searchClosed = true"
  ></v-text-field>
</template>

<script>
export default {
  name: 'BaseSearchbar',

  data() {
    return {
      searchClosed: true,
    }
  },

  computed: {
    search() {
      return this.$store.getters.search
    },
  },

  methods: {
    updateSearch(evt) {
      this.$store.dispatch('updateSearch',evt)
    }
  }
}
</script>

<style lang="scss">

.expanding-searchbar {
  transition: max-width .4s ease;
  max-width: min(40rem,70%);

  &.closed {
    max-width: 45px;
  }

  &.closed .v-input__slot{
    background-color: transparent !important;
    cursor: pointer !important;
  }

  .v-input__slot {

    &::before,&::after{
      border-color: transparent !important;
    }
  }

}
</style>