import Vue from 'vue'
import Router from 'vue-router'
// Components
import LandingPage from './components/LandingPage.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Challenges from './components/Challenges.vue'
import Challenge from './components/Challenge.vue'
import Idea from './components/Idea.vue'
import MyProfile from './components/MyProfile.vue'
import CreateEditIdea from './components/CreateEditIdea.vue'
import RecoverPassword from './components/RecoverPassword.vue'
import RecoverPasswordRequest from './components/RecoverPasswordRequest.vue'
import Profile from './components/Profile.vue'
import MyIdeas from './components/MyIdeas.vue'

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
            path: '/creareditaridea/:eId',
            name: 'CreateEditIdea',
            component: CreateEditIdea
        },
        {
            path: '/request-password-change',
            name: 'RecoverPasswordRequest',
            component: RecoverPasswordRequest
        },
        {
            path: '/recover-password/:token',
            name: 'RecoverPassword',
            component: RecoverPassword
        },
        {
            path: '/perfil',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/mis-ideas',
            name: 'MyIdeas',
            component: MyIdeas
        }
    ]
})