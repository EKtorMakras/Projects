<template>
  <div class="home">


    <list-tasks v-if="tasks.length"></list-tasks>

    <no-tasks v-else></no-tasks>

    <button-done-sorting v-if="$store.getters.sorting" class="ma-8"></button-done-sorting>
  </div>
</template>

<script>
import FieldAddTask from '@/components/Todo/FieldAddTask.vue'
import ListTasks from '@/components/Todo/ListTasks.vue'
import NoTasks from '@/components/Todo/NoTasks.vue'
import ButtonDoneSorting from '@/components/Todo/ButtonDoneSorting.vue'

export default {
  name: 'TodoView',

  components: {
    FieldAddTask,
    ListTasks,
    NoTasks,
    ButtonDoneSorting
  },

  data () {
      return {
      }
  },

  computed: {
    tasks() {
      return this.$store.getters.tasks
    }
  },
}
</script>


