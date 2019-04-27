import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from './components/LandingPage.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'LandingPage',
            component: LandingPage
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        }
    ]
})