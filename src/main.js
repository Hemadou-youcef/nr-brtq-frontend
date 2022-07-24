import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins/axios'
import store from './store'



Vue.config.productionTip = false
Vue.prototype.$store = store

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
