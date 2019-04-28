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
            <div class="row second justify-content-around">
                <div v-if="ideas != ''">
                    <div class="idea container-fluid" v-for="(idea, index) in ideas" :key="index">
                        <div class="row image">
                            <img v-bind:src="idea.picture.url">
                        </div>
                        <div class="row data">
                            <h3 class="title">{{idea.title}}</h3>
                            <p class="parag">{{idea.description}}</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h2 class="title">No se han encontrado ideas</h2>
                </div>
                
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
