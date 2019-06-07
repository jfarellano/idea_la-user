//Vue dependencies
import Vue from 'vue'
import App from './App.vue'
//Bootstrap dependencies
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AOS from 'aos';
// Vue Resource dependencies
import VueResource from 'vue-resource'
// Vue Cookie dependencies
import VueCookie from 'vue-cookie'
// Vuetify notifications 
import Snotify from 'vue-snotify'
import 'vue-snotify/styles/simple.css';

import 'aos/dist/aos.css';
import router from './router.js'

Vue.use(Snotify)
Vue.use(VueCookie);
Vue.use(VueResource);
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  created() {
    AOS.init();
  },
  router,
  render: h => h(App),
}).$mount('#app')