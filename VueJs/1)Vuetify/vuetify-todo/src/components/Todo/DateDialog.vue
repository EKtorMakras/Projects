<template>
    <v-dialog
        ref="dateDialog"
        v-model="dialog"
        :return-value.sync="date"
        width="290px"
      >
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="saveDate"
          >
            OK
          </v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
  export default {
  name: 'DateDialog',

  props: ['dialogShown','task'],

  data: () => ({
      date: null
  }),

  computed: {
    dialog:{
      get(){
        return this.dialogShown
      },

      set(val) {
        this.closeDialog()
      }
    },
  },

  methods: {
    closeDialog() {
      this.$emit('dialog-closed')
    },

    openDialog() {
      this.$emit('dialog-opened')
    },

    saveDate() {
      let payload = {
        id: this.task.id,
        dueDate: this.date,
        snackbarText: this.task.dueDate ? 'Date updated successfully' : 'Date added successfully',
        snackbarColor:'success'
      }

      this.$store.dispatch('updateDate', payload)

      this.closeDialog()
    }
  },

  mounted() {
    if (this.task.dueDate) {
      this.date =  this.task.dueDate
    }
  }
}
</script>

<style lang="scss" scoped>

</style>