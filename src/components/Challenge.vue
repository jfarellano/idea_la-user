<template>
  <div class="challenge-page">
    <Header></Header>
    <Idea></Idea>
    <div class="main-container container-fluid">
      <div class="row first">
        <div class="col-md-3 align-self-center">
          <h1 class="title">{{challenge.title}}</h1>
        </div>
        <div class="col-md-9 align-self-center">
          <p class="parag">{{challenge.description}}</p>
        </div>
      </div>
      <div class="row second justify-content-around" v-if="ideas != ''">
          <router-link class="idea container-fluid" v-for="(idea, index) in ideas" :key="index" :to="{name: 'Idea', params: { iId: idea.id } }">
            <div v-if="idea.picture != null">
              <div class="row image">
                <img v-bind:src="idea.picture.url">
              </div>
            </div>
            <div v-else>
              <div class="row image">
                <img src="https://ep01.epimg.net/internacional/imagenes/2018/07/23/billete_a_macondo/1532310440_143390_1532310884_noticia_normal.jpg">
              </div>
            </div>
            <div class="row data">
              <h3 class="title">{{idea.title}}</h3>
              <p class="parag">{{idea.description}}</p>
            </div>
          </router-link>
      </div>
        <div v-else>
          <h2 class="title">No se han encontrado ideas</h2>
        </div>
    </div>
  </div>
</template>

<script>
import api from '../requests.js'

import Header from "./Header.vue";
import Idea from "./AddIdea.vue";

export default {
  components: {
		Header,
		Idea
  },
  data(){
    return{
      challengeID:'',
      challenge: '',
      ideas: []
    }
  },
  methods: {
    gotoIdea(){
      this.$router.push('/idea')
    },
    getChallengeInfo(){
      this.challengeID = this.$route.params.cId
      api.challenge.getInfo(this.challengeID).then((response) => {
        this.challenge = reponse.data
      }).catch((err) => {
        console.log(err.data)
      })
    
    // this.$http.get(SERVER_URL + '/challenges/' + this.id).then(function(response){
    //   this.challenge = response.data;
    // })
    },
    getIdeas(){
      api.challenge.getIdeas(this.challengeID).then((response) => {
        this.ideas = response.data
      }).catch((err) => {
        console.log(err)
      })
      
    // this.$http.get(SERVER_URL + '/challenges/' + this.challengeID + '/ideas').then(function(response){
    //   this.ideas = response.data;
    // })
    }
  },
  created(){
    this.getChallengeInfo();
    this.getIdeas();
  }
};
</script>
