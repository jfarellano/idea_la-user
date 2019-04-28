<template>
    <div class="landing">
        <Header></Header>
        <div class="main-container container-fluid">
            <div class="first row">
                <div class="col-md-6 align-self-end">
                    <img src="../assets/FS_FC.svg">
                </div>
                <div class="col-md-6 align-self-end">
                    <div class="left-cont">
                        <img src="../assets/aduana.svg">
                        <p class="parag">Idéala es una iniciativa liderada por la Cámara de Comercio de Barranquilla en alianza con distintos actores locales con el fin de trabajar en el fomento y fortalecimiento de la ciudadanía activa de tal modo que sean los propios ciudadanos quienes prioricen los grandes desafíos que afronta nuestro territorio frente a los Objetivos del Desarrollo Sostenible de frente a las elecciones locales.</p>
                        <div class="over-border">
                            <b-button class="option title" v-on:click.prevent="goToChallenges">Conoce las ideas</b-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row second">
                <div class="col-md-8 align-self-center info">
                    <h1 class="title">Comprometidos con los ODS</h1>
                    <p class="parag">Estamos convencidos de que la participación ciudadana es pieza fundamental para emprender un nuevo camino en el que se focalice el mejoramiento de la vida de todos, sin dejar a nadie atrás. Tomando como base la necesidad de cumplir los Objetivos del Desarrollo Sostenible como modelo para alcanzar un mejor y sostenible futuro para todos.</p>
                </div>

                <div class="col-md-4 align-self-center">
                    <img src="../assets/ODS.svg" alt="ODS">
                </div>
            </div>
            <div class="row third">
                <div class="col-md-4 align-self-center">
                    <img src="../assets/miss.svg" alt="Miss">
                </div>
                <div class="col-md-8 align-self-center info">
                    <h1 class="title">Avanzamos a pasos agigantados</h1>
                    <p class="parag">La ciudad avanza a pasos agigantados, cada uno de los ciudadanos tenemos mucho que aportar y así hacer de Barranquilla una mejor y sostenible ciudad para todos. Todos podemos convertirnos en protagonistas de ciudad, imaginando nuevas ideas de ciudad y realizando acciones de ciudad.</p>
                </div>
            </div>
            <div class="row fourth">
                <div class="col-md-4 align-self-center">
                    <img src="../assets/dream.svg" alt="Dream">
                </div>
                <div class="col-md-8 align-self-center info">
                    <h1 class="title">Podemos hacer un sueño realidad</h1>
                    <p class="parag">Este es un espacio para que juntos construyamos una mejor ciudad con el apoyo de nuestros ciudadanos motivados por su desarrollo que nos brinden su mirada al futuro para que todos creemos la Barranquilla que soñamos.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {SERVER_URL} from '../variables.js'
import Header from './Header.vue'
export default {
    components: {
        Header
    },
    data(){
        return{
            tokenExists: false,
            userCookie: {
                id: '',
                secret: '',
                expire_at: '',
                name: ''
            },
        }
    },
    methods: {
        checkToken(){
            if (this.$cookie.get('secret') == null){
                this.tokenExists = false;
            }else{
                this.tokenExists = true;
                console.log("COOKIE: " + this.$cookie.get('secret'));
                var userInfo = JSON.parse(this.$cookie.get('secret'));
                this.userCookie.id = userInfo.user_id;
                this.userCookie.secret = userInfo.secret;
                this.userCookie.expire_at = userInfo.expire_at;
                this.userCookie.name = userInfo.name

                this.nameOfUser = userInfo.name;
            }
        },
        goToChallenges(){
            this.$router.push('/retos')
        }
    },
    created(){
        this.checkToken();
    }
}
</script>