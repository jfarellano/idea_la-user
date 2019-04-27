//Vue dependencies
import Vue from 'vue'
import App from './App.vue'
//Bootstrap dependencies
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './router.js'

//My styles
import './styles/main.scss'
import './styles/shells.scss'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
