<template>
    <div>
          <v-list-item
            @click="doneTask(task.id)"
            class="py-2"
            :class="{'blue lighten-5': task.done}"
            :ripple="false"
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

               <v-list-item-action v-if="$store.getters.sorting">
                <v-btn
                  color="primary"
                  icon
                  class="handle"
                >
                    <v-icon>mdi-drag-horizontal-variant</v-icon>
                 </v-btn>
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

<style lang="scss" scoped>
  .sortable-chosen {
     box-shadow: 0 0 10px rgba(0,0,0,.15);
  }
</style>