<template>
  <v-app id="inspire">

    <!-- Nav Drawer -->
    <v-navigation-drawer 
      v-model="drawer"
      :mobile-breakpoint="768"
      app
    >
      <v-img
        src="@/assets/images/mountains.jpg"
        height="250"
        class="pa-4"
        gradient="to top right, rgba(19,84,122,.4), rgba(19,84,122,.4)"
      >
      <v-avatar size="60" class="mb-4">
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
      </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">John Doe</div>
        <div class="white--text text-subtitle-2">John_Doe</div>
      </v-img>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Header -->
    <v-app-bar
      app
      color="primary"
      dark
      prominent
      :height="headerHeight"
      src="@/assets/images/mountains.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.7), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row class="pt-2">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <base-searchbar></base-searchbar>
        </v-row>

        <v-row>
          <v-app-bar-title class="pl-4 text-h4">
            {{ $store.state.appTitle }}
          </v-app-bar-title>
        </v-row>

        <v-row>
          <base-live-date></base-live-date>
        </v-row>

        <v-row v-if="$route.path === '/'">
          <field-add-task/>
        </v-row>
      </v-container>

    </v-app-bar>


    <!-- Main -->
    <v-main>
      <router-view></router-view>
      <base-snackbar></base-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import FieldAddTask from './components/Todo/FieldAddTask.vue';

export default {

  components: {
    FieldAddTask
  },
    
  data: () => ({
      drawer: null,

      items: [
          { title: 'Todo', icon: 'mdi-format-list-checks',to: '/' },
          { title: 'About', icon: 'mdi-help-box',to: '/about' },
        ],
        right: null,
  }),


  computed: {
    headerHeight() {
      return this.$route.path === '/' ? 240 : 180;
    }
  }

}
</script>

<style lang="scss" scoped>
  .header-container {
    max-width: none !important;
  }

</style>