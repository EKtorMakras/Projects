<template>
  <div>
    <the-header @sidenavToggle="toggleSideNav" />
    <the-sidenav :show="sideNav" @close="sideNav = false" />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '../components/navigation/TheHeader.vue'
import TheSidenav from '../components/navigation/TheSidenav.vue'

export default {
  components: {
    TheHeader,
    TheSidenav
  },


  data () {
    return {
      sideNav: false
    }
  },

  methods: {
    toggleSideNav () {
      this.sideNav = !this.sideNav
    }
  }
}
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
}
</style>
