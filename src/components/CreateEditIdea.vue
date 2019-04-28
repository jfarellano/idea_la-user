<template>
  <div class="createEditIdeaComponent">
    <Header></Header>

    <div class="container-fluid idea-create">
      <div class="row justify-content-center">
        <h1 class="title titleStyle">Postula tu idea</h1>
      </div>
      <div class="container-fluid form">
        <div class="row">
          <div class="col-sm">
            <b-form-group class="title" label="Título">
              <b-form-input class="squareInput" type="text" v-model="idea.title"></b-form-input>
            </b-form-group>
            <b-form-group class="title" label="Descripción">
              <b-form-textarea class="descStyle squareInput" type="text" v-model="idea.description"></b-form-textarea>
            </b-form-group>
          </div>
          <div class="col-sm">
            <b-form-group class="title" label="Seleccionar Reto">
                <b-form-select
                    class="mb-2 mr-sm-2 mb-sm-0 squareInput"
                    :value="null"
                    id="inline-form-custom-select-pref"
                    v-model="idea.challenge_id"
                    >
                    <option slot="first" v-for="(challenge, index) in challenges" v-bind:value="challenge.id" :key="index">{{ challenge.title }}</option>
                </b-form-select>
            </b-form-group>
            <b-form-group class="title" label="Cargar Imagen">
              <b-form-file class="squareInput" v-model="idea.image"></b-form-file>
            </b-form-group>
            <b-form-group class="title" label="URL de Video">
              <b-form-input class="squareInput" type="text" v-model="idea.videoLink"></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <b-button class="ideaButton title" v-on:click.prevent="createIdea()">Aceptar</b-button>
            </div>
            <div class="col-sm">
                <b-button class="ideaButton title" v-on:click.prevent="cancelCreateIdea()">Cancelar</b-button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {SERVER_URL} from '../variables.js'

import Header from "./Header.vue";

export default {
  components: {
    Header
  },
  data() {
    return {
      challenges: [],
      idea: {
        title: '',
        description: '',
        challenge_id: '',
        videoLink: '',
        image: null
      },
      tokenExists: false,
      userInfo: {
        id:'',
        secret:'',
        expire_at:'',
        name:'',
        lastname:'',
        fullname:''
      }
    };
  },
  methods: {
    checkToken(){
      if (this.$cookie.get('secret') == null){
          this.tokenExists = false;
      }else{
          this.tokenExists = true;
          console.log("COOKIE: " + this.$cookie.get('secret'));
          var userInfo = JSON.parse(this.$cookie.get('secret'));
          this.userInfo.id = userInfo.user_id;
          this.userInfo.secret = userInfo.secret;
          this.userInfo.expire_at = userInfo.expire_at;
          this.userInfo.name = userInfo.name;
          this.userInfo.lastname = userInfo.lastname;
      }
    },
    getChallenges() {
      this.$http.get(SERVER_URL + '/challenges').then(function(response){
          this.challenges = response.data;
      }),
      (err) => {
      console.log("Err", err);
      };
      console.log(JSON.stringify(this.challenges.title))
    },
    createIdea(){
      // this.$http.post((SERVER_URL + '/ideas'),{
        // image: this.idea.image,
        // title: this.idea.title,
        // description: this.idea.description,
        // videLink: this.idea.videLink,
        // edition: this.idea.edition,
        // challenge_id: this.idea.challenge_id
      // }
      // , {headers: {'Authorization': 'Token token=' + this.secret}})
      // .then(response => response.json())
      // .then(function(json){
      //   console.log(json);
      //   },
      //   (err) => {
      //   console.log("Err", err);
      //   }
      // );


      // this.$http.post((SERVER_URL + '/ideas'),{
      //     image: this.idea.image,
      //     title: this.idea.title,
      //     description: this.idea.description,
      //     videLink: this.idea.videLink,
      //     edition: this.idea.edition,
      //     challenge_id: this.idea.challenge_id
      // }
      // , {headers: {Authorization: 'Token token=' + this.userInfo.secret}})
      // .then(function(response){
      //     console.log(response)
      // },
      // (err) => {
      //     console.log("Err", err);
      // }
      // );

      this.$http.post((SERVER_URL + '/ideas'),{
        image: this.idea.image,
        title: this.idea.title,
        description: this.idea.description,
        videLink: this.idea.videLink,
        edition: this.idea.edition,
        challenge_id: this.idea.challenge_id
      }, { headers: {Authorization: 'Token token="' + this.userInfo.secret + '"'}}).then(response => response.json())
        .then(function(json){
          console.log(json);
          this.$router.push('/miperfil');
        },
        (err) => {
          console.log("Err", err);
          this.$router.push('/miperfil');
        }
      );

      // console.log(this.idea)
      console.log(this.userInfo.secret)
    },
    cancelCreateIdea(){
      this.$router.push('/miperfil');
    }
  },
  created(){
    this.checkToken();
    this.getChallenges();
  }
};
</script>