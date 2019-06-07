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

import 'aos/dist/aos.css';
import router from './router.js'

//My styles
import './styles/main.scss'
import './styles/shells.scss'

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