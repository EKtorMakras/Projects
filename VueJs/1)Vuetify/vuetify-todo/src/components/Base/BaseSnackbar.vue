<template>
   <v-snackbar
      v-model="snackbar"
      :color="color"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="#333"
          text
          v-bind="attrs"
          @click="closeSnackbar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
  export default {
  data() {
      return {
        timeout: 2500,
      }
  },

  computed: {
    snackbar:{
      get() {
        return this.$store.getters.snackbar.show
      },
      
      set(val) {
        this.$store.dispatch('closeSnackbar')
     } 
    },

    text() {
      return this.$store.getters.snackbar.text
    },

    color() {
      return this.$store.getters.snackbar.color
    }
  },

  methods: {
    closeSnackbar() {
      this.$store.dispatch('closeSnackbar')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>