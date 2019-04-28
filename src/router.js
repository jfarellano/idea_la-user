import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from './components/LandingPage.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Challenges from './components/Challenges.vue'
import Challenge from './components/Challenge.vue'
import Idea from './components/Idea.vue'
import MyProfile from './components/MyProfile.vue'
import CreateEditIdea from './components/CreateEditIdea.vue'

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
            path: '/reto/:cId',
            name: 'Challenge',
            component: Challenge
        },
        {
            path: '/idea/:iId',
            name: 'Idea',
            component: Idea
        },
        {
            path: '/miperfil',
            name: 'MiProfile',
            component: MyProfile
        },
        {
            path: '/creareditaridea',
            name: 'CreateEditIdea',
            component: CreateEditIdea
        },
    ]
})