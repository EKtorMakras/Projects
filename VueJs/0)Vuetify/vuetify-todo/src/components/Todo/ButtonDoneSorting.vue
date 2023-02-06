<template>
  <v-btn 
  @click="toggleSorting" 
  color="primary"
  class="btn-done-sorting"
  >
    Done Sorting
  </v-btn>
</template>

<script>
  export default {
    name: 'ButtonDoneSorting',

  methods: {
    toggleSorting() {
        this.$store.dispatch('toggleSorting')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn-done-sorting {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>