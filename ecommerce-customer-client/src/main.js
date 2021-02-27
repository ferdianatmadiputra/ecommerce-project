import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Toasted)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

require('@/assets/style/bootstrap.min.css')
require('@/assets/style/lux-bootstrap.css')
require('@/assets/style/custom.css')
require('@/assets/style/bootstrap.bundle.js')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
