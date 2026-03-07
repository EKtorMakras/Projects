<template>
  <v-list
      flat
      class="pt-0"
    >

        <draggable 
          v-model="tasks"
          handle=".handle"
        >
            <single-task v-for="task in tasks" :key="task.id" :task="task"></single-task>
        </draggable>

  </v-list>
</template>

<script>
import draggable from 'vuedraggable'
import SingleTask from './SingleTask.vue'

export default {
  name: 'ListTasks',

  components: {
    SingleTask,
    draggable
  },

  computed: {

    tasks: {

      get() {
        return this.$store.getters.tasks
      },

      set(value) {
        this.$store.dispatch('setTasks', value)
      }
    }
  },
}
</script>
