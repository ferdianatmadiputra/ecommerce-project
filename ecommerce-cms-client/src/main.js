import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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
