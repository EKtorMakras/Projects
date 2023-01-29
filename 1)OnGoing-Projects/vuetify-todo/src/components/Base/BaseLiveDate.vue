<template>
  <div class=" pl-4 mt-2 text-subtitle-2">
    {{ liveDate }}
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'BaseLiveDate',

  data() {
    return {
      liveDate: ''
    }
  },


  methods: {
    getDate() {
      this.liveDate =  format(new Date(), 'MMMM d, H:mm:ss')

      setInterval(() => {
        this.getDate()
      }, 1000);
    }
  },


  mounted() {
    this.getDate()
  }
  
}
</script>

<style lang="scss" scoped>

</style> 