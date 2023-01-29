<template>
  <v-list
      flat
      class="pt-0"
    >

        <div v-for="task in tasks" :key="task.id">
          <single-task :task="task"></single-task>
        </div>

  </v-list>
</template>

<script>
import SingleTask from './SingleTask.vue'

export default {
  name: 'ListTasks',

  components: {
    SingleTask
  },

  computed: {
    tasks() {
      return this.$store.getters.tasks
    }
  },
}
</script>
