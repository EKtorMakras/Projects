<template>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ dialogTitle}}
        </v-card-title>
        <v-card-text>
          {{ dialogQuestion }}
          <v-text-field 
            v-if="dialogType === 'edit'" 
            v-model="taskTitle"
            @keyup.enter.exact="handleConfirm"
          >
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="gray"
            text
            @click="dialog = false"
          >
            {{ cancelBtnText }}
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            :disabled="!validation"
            @click="handleConfirm"
          >
            {{ confirmBtnText  }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>

  export default {
  name: 'ActionsDialog',

  props: ['task','dialogShown','dialogType'],

  data () {
      return {
        taskTitle: null
      }
  },

  computed: {

    dialog:{
      get(){
        return this.dialogShown
      },

      set(val) {
        this.$emit('dialog-closed')
      }
    },

    validation() {
      if (this.dialogType !== 'edit') return true;

      else {
        if (!this.taskTitle || this.taskTitle === this.task.title) return false;

        return true;
      }
    },

    // Dialog text
    dialogTitle() {
      let text

      switch (this.dialogType) {
        case 'delete':
          text = 'Delete task'
          break;

        case 'edit':
          text = 'Edit task'
          break;
        default:
          break;
      }

      return text;
    },

    dialogQuestion() {
      let text

      switch (this.dialogType) {
        case 'delete':
          text = 'Are you sure you want to delete this task?'
          break;

        case 'edit':
          text = 'Edit the title of this task'
          break;
        default:
          break;
      }

      return text;
    },

    cancelBtnText() {
      let text

      switch (this.dialogType) {
        case 'delete':
          text = 'No'
          break;

        case 'edit':
          text = 'Cancel'
          break;
        default:
          break;
      }

      return text;
    },

    confirmBtnText() {
      let text

      switch (this.dialogType) {
        case 'delete':
          text = 'Yes'
          break;

        case 'edit':
          text = 'Save'
          break;
        default:
          break;
      }

      return text;
    },
  },

  methods: {
    deleteTask(id) {

      this.dialog = false;

      this.$store.dispatch('deleteTask', {
        id,
        snackbarText: 'Task deleted successfully',
        snackbarColor:'#D32F2F'
      })
    },


    saveTask(id) {
      if (!this.validation) return;

      this.dialog = false;

      this.$store.dispatch('editTask', {
        id,
        title: this.taskTitle,
        snackbarText: 'Task edited successfully',
        snackbarColor:'success'
      })
    },




    handleConfirm() {
      switch (this.dialogType) {
        case 'delete':
          this.deleteTask(this.task.id)
          break;

        case 'edit':
          this.saveTask(this.task.id)
          break;
        default:
          break;
      }
    }
  },

  mounted() {
    this.taskTitle = this.task.title
  }

  
}
</script>

<style lang="scss" scoped>

</style>