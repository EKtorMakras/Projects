<template>
  <div>
    <v-menu
      bottom
      left
    >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="handleClick(index)"
          >
          <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-menu>

    <actions-dialog 
      :dialogShown="dialog.shown" 
      :dialogType="dialog.type"
      :task="task" 
      @dialog-closed="hideDialog"
    >
    </actions-dialog>

    <date-dialog 
      :dialogShown="dateDialog.shown" 
      :task="task"
      @dialog-closed="hideDialog"
      @dialog-opened="openDateDialog"
    >
    </date-dialog>
  </div>
</template>

<script>
import ActionsDialog from '@/components/Todo/ActionsDialog.vue'
import DateDialog from '@/components/Todo/DateDialog.vue'

export default {
  name: 'TaskMenu',

  props: ['task'],

  components: {
    ActionsDialog,
    DateDialog
  },

  data: () => ({
    dialog: {
      shown: false,
      type: ''
    },

    dateDialog: {
      shown: false
    },

    items: [
        { 
          title: 'Edit' ,
          icon: 'mdi-pencil',
          click() {
            this.dialog.shown = true
            this.dialog.type = 'edit'
          }
        },
        { 
          title: 'Due Date' ,
          icon: 'mdi-calendar',
          click() {
            this.dateDialog.shown = true
          }
        },

        { 
          title: 'Delete',
          icon: 'mdi-delete',
          click() {
            this.dialog.shown = true
            this.dialog.type = 'delete'
          }
        },
    ],

    
  }),

  methods: {
    handleClick(index) {
      this.items[index].click.call(this)
    },

    showDialog() {
      this.dialog.shown = true
    },

    hideDialog() {
      this.dialog.shown = false
      this.dateDialog.shown = false
    },

    openDateDialog() {
      this.dateDialog.shown = true
    }
  },
}
</script>

<style lang="scss" scoped>

</style>