<template>
  <div class="no-tasks d-flex flex-column align-center justify-center"
    >
      <v-icon
        v-if="!searchIsActive"
        size="60"
        color="grey"
      >
        mdi-check
      </v-icon>
      <p class="text-h5 text-center grey--text pt-4">
       {{ searchIsActive? 'No tasks found...' : 'No tasks added...' }} 
      </p>
    </div>
</template>

<script>
  export default {
  name: 'NoTasks',


  computed: {
    searchIsActive() {
        return this.$store.getters.search
      }
    }
  }
</script>

<style lang="scss" scoped>
.no-tasks {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  opacity: .6;
  
}
</style>