<template>
  <div class="home">

    <field-add-task></field-add-task>

    <list-tasks v-if="tasks.length"></list-tasks>

    <no-tasks v-else></no-tasks>

    
  </div>
</template>

<script>
import FieldAddTask from '@/components/Todo/FieldAddTask.vue'
import ListTasks from '@/components/Todo/ListTasks.vue'
import NoTasks from '@/components/Todo/NoTasks.vue'


export default {
  name: 'TodoView',

  components: {
    FieldAddTask,
    ListTasks,
    NoTasks,
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


