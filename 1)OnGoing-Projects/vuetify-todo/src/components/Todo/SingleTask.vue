<template>
    <div>
          <v-list-item
            @click="doneTask(task.id)"
            class="py-2"
            :class="{'blue lighten-5': task.done}"
          >
              <v-list-item-action>
                <v-checkbox :input-value="task.done"></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title :class="{'text-decoration-line-through': task.done}">
                  {{ task.title }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action v-if="task.dueDate">
                <v-list-item-action-text class="d-flex align-center justify-center">
                  <v-icon small class="mr-2">mdi-calendar</v-icon>
                    <span>{{ task.dueDate | properDate }}</span>
                </v-list-item-action-text>
              </v-list-item-action>

              <v-list-item-action>
                <task-menu :task="task"></task-menu>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          
         
        </div>
</template>

<script>
import { format } from 'date-fns'
import TaskMenu from './TaskMenu.vue'

  export default {
  name: 'SingleTask',

  components: {
    TaskMenu
  },

  props: {
    task: {
      type: Object,
      required: true
    }
  },


  filters: {
    properDate(value) {
      return format(new Date(value), '	MMM/dd/yyyy')
    }
  },


  methods: {
    
    doneTask(id) {
      this.$store.dispatch('doneTask', id)
    },
   }
  }
</script>
