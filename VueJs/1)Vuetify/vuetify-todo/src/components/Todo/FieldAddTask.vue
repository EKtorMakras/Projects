<template>
  <v-text-field
      v-model="newTaskTitle"
      class="field-add-task pa-4"
      outlined
      placeholder="Add task"
      hide-details
      clearable
      @keyup.enter="addTask"
    >
    <template v-slot:append>
        <v-icon
          @click="addTask"
          :disabled="!validation"
        >
          mdi-plus
        </v-icon>    
    </template>
  </v-text-field>
</template>

<script>
  export default {
  name: 'FieldAddTask',

  data() {
    return {
      newTaskTitle: ''
    }
  },

  computed: {
    validation() {
      if(!this.newTaskTitle) return false;

      return true;
    }
  },

  methods: {

    addTask() {

      if (!this.validation) return;

      this.$store.dispatch('addTask', {
        taskTitle: this.newTaskTitle,
        snackbarText: 'Task added successfully',
        snackbarColor:'success'
      })
      this.newTaskTitle = ''
    },

   }
  }
</script>


<style lang="scss">

.field-add-task {
    
  &.v-input--is-focused {
    
    & .v-input__slot {
      background-color: rgb(31,94,129,.5);
    }
  }
}
</style>