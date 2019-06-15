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
import api from '../requests.js'

import Header from "./Header.vue";

export default {
  components: {
  Header
  },
  data() {
    return {
      challenges: [],
      idea: {},
      tokenExists: false,
      userInfo: {},
      err: {}
    };
  },
  methods: {

  getChallenges() {
    api.challenges.index().then((response)=>{
      this.challenges = response.data
    }).catch((err) => {
      this.err = err
    })
  },
  createIdea(){
    api.createEditIdea.createIdea({
      image: this.idea.image,
      title: this.idea.title,
      description: this.idea.description,
      videLink: this.idea.videLink,
      edition: this.idea.edition,
      challenge_id: this.idea.challenge_id
    }).then((response) => {
      this.misc = response.data
    }).catch((err) => {
      this.err = err
    })
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

<style scoped style lang="scss">
.createEditIdeaComponent {
  .titleStyle {
    margin-bottom: 30px;
  }
  .idea-create {
    margin-top: 130px;
  }
   .ideaButton{
     width: 100%;
     border: 2px solid #4d4d4d;
     color: #4d4d4d;
     background-color: transparent;
     border-radius: 0px;
     font-size: 1.3em;
     margin-bottom: 10px;
   }
   .form{
     width: 85%;
   }
   .descStyle {
     height: 130px;
   }
   .squareInput {
     border-radius: 0px;
   }
}
</style>