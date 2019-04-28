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
          id:'',
          challenge: '',
          ideas: []
      }
  },
  methods: {
      gotoIdea(){
          this.$router.push('/idea')
      },
      loadChallengeInfo(){
        this.id = this.$route.params.cId;
        this.$http.get(SERVER_URL + '/challenges/' + this.id).then(function(response){
            this.challenge = response.data;
            // console.log('RESPONSE: ' + this.product);
        })
      },
      loadIdeas(){
          this.$http.get(SERVER_URL + '/challenges/' + this.id + '/ideas').then(function(response){
            this.ideas = response.data;
            // console.log('RESPONSE: ' + this.product);
        })
      }
  },
  created(){
      this.loadChallengeInfo();
      this.loadIdeas();
  }
};
</script>
