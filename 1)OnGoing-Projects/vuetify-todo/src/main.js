import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// Global Components
import BaseSnackbar from '@/components/Base/BaseSnackbar.vue'
Vue.component('BaseSnackbar',BaseSnackbar)

import BaseSearchbar from '@/components/Base/BaseSearchbar.vue'
Vue.component('BaseSearchbar',BaseSearchbar)

import BaseLiveDate from '@/components/Base/BaseLiveDate.vue'
Vue.component('BaseLiveDate',BaseLiveDate)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
