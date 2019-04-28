<template>
  <div class="challenges">
    <Header></Header>
		<Idea></Idea>
    <div class="main-container container-fluid">
      <div class="row first">
        <div class="col-md-3 align-self-center">
          <h1 class="title">Retos</h1>
        </div>
        <div class="col-md-9 align-self-center">
          <p
            class="parag"
          >¡Tú eres el actor principal! Ahora nos ayudarás en la elección de los 5 desafíos de cara a los Objetivos del Desarrollo Sostenible que nuestra ciudad debe afrontar al tiempo que se fomenta el involucramiento ciudadano en el proceso electoral local. Junto a ti, encontraremos las soluciones más innovadoras para hacer frente a estos desafíos. Los Objetivos del Desarrollo Sostenible conllevan un espíritu de colaboración y pragmatismo para elegir las mejores opciones con el fin de mejorar la vida de manera sostenible para las generaciones futuras. Se abordan las causas sociales fundamentales y nos unen para para emprender un nuevo camino en el que se focalice el mejoramiento de la vida de todos, sin dejar a nadie atrás.</p>
        </div>
      </div>
      <!-- INICIO DE CHALLENGES -->
      <div class="row second justify-content-around">

        <router-link tag="div" to="/reto" class="challenge container-fluid" v-for="(challenge, index) in challenges" :key="index">
          <div class="row image">
            <img v-bind:src="challenge.picture.url" alt="Imagen de reto">
          </div>
          <div class="row data">
            <h3 class="title">{{challenge.title}}</h3>
            <p class="parag">{{challenge.description}}</p>
          </div>
        </router-link>

      </div>
    </div>
  </div>
</template>
<script>
import {SERVER_URL} from '../variables.js'

import Header from "./Header.vue";
import Idea from "./addIdea.vue";

export default {
  components: {
		Header,
		Idea
  },
  data(){
    return{
      challenges: []
    }
  },
  methods: {
    loadChallenges(){
        this.$http.get(SERVER_URL + '/challenges').then(function(response){
            this.challenges = response.data;
            // this.challenges = response.data.slice().reverse();
        })
    },
  },
  created(){
    this.loadChallenges();
  }
};
</script>
