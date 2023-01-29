<template>
  <v-text-field
      v-model="newTaskTitle"
      class="pa-4"
      outlined
      label="Add task"
      hide-details
      clearable
      @keyup.enter="addTask"
    >
    <template v-slot:append>
        <v-icon
          @click="addTask"
          color="primary"
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
