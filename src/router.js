import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from './components/LandingPage.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Challenges from './components/Challenges.vue'
import Challenge from './components/Challenge.vue'

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
        },
        {
            path: '/retos',
            name: 'Challenges',
            component: Challenges
        },
        {
            path: '/reto',
            name: 'Challenge',
            component: Challenge
        }
    ]
})