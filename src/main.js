//Vue dependencies
import Vue from 'vue'
import App from './App.vue'
//Bootstrap dependencies
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// AOS dependecies
import AOS from 'aos';
import 'aos/dist/aos.css';
// Snotify notifications dependencies
import Snotify from 'vue-snotify'
import 'vue-snotify/styles/simple.css';
// Router dependencies
import router from './router.js'
// Vee validate dependencies
import VeeValidate from 'vee-validate';
// Vue Awesome font dependencies
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Vue Awesome font dependencies
library.add(fas, fab, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VeeValidate);
Vue.use(Snotify, {
  global: {
    maxOnScreen: 2,
    preventDuplicates: true,
  },
})
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  created() {
    AOS.init();
  },
  router,
  render: h => h(App),
}).$mount('#app')