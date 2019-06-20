<template>
  <section>
    <Header></Header>
    <Idea></Idea>
    <div class="main-container container-fluid">
      <div class="row first">
        <div class="col-md-6 align-self-center main-image">
          <img src="../assets/challenges.png">
        </div>
        <div class="col-md-6 align-self-center">
          <h1 class="main-title">Conoce los retos y ayuda a crecer a Barranquilla</h1>
          <p
            class="parag"
          >Para lograrlo necesitamos que tú seas parte del cambio. Sabemos que tienesmucho que aportar. Tus ideas, experiencia y tiempo nos ayudarán a encontrarsoluciones sostenibles a los desafíos que afrontamos. ¡Todos podemosconvertirnos en protagonistas de nuestra ciudad!</p>
        </div>
      </div>
      <!-- INICIO DE CHALLENGES -->
      <div v-if="challenges != ''" class="row second justify-content-center">
        <div v-for="(challenge, index) in challenges" :key="index">
          <router-link
            tag="div"
            :to="{name: 'Challenge', params: { cId: challenge.id } }"
            class="challenge container-fluid"
          >
            <div class="row image">
              <img :src="challenge.challenge_pictures[0].url" alt="Imagen de reto">
            </div>
            <div class="row data">
              <h3 class="title">{{challenge.title}}</h3>
              <p class="parag">{{challenge.short_description}}</p>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        <h2 class="title">No se han encontrado retos</h2>
      </div>
    </div>
    <Alert ref="alert"></Alert>
  </section>
</template>
<script>
import api from "../requests.js"
import Alert from './Alert.vue'
import Header from "./Header.vue"
import Idea from "./AddIdea.vue"

export default {
  components: {
    Header,
    Idea,
    Alert
  },
  data() {
    return {
      challenges: []
    };
  },
  methods: {
    getChallenges() {
      api.challenges
        .index()
        .then(response => {
          this.challenges = response.data;
        })
        .catch(() => {
          this.$refs.alert.network_error()
        });
    }
  },
  created() {
    this.getChallenges();
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  margin-top: 90px;
  .main-image{
    width: 100%;
    text-align: center;
    img{
      width: 70%;
    }
  }
  .main-title{
    color: #0E2469;
    margin:0px;
  }
  .title{
    color: #0E2469;
    font-size: 1.1rem;
    margin:0px;
    width: 100%;
  }
  .parag{
    color: #9B9B9B;
    margin:0px;
    white-space: normal;
    text-align: justify;
  }
  .first {
    padding: 30px;
  }
  .second {
    padding: 10px;

    .challenge {
      margin: 10px;
      background-color: white;
      border: 1px solid #EDEDED;
      border-radius: 5px;
      box-shadow: 0 0 15px 0 rgba(232,232,232,0.4);
      width: 300px;
      height: 350px;
      cursor: pointer;
      .image {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        height: 100px;
        margin-top: 15px;
        background-color: white;
        img {
          overflow: hidden;
          height: 100px;
          width: auto;
          margin: auto;
        }
      }
      .data {
        padding: 20px;
        padding-top: 0px;
        h3 {
          margin-top: 5px;
          padding-bottom: 0.5px;
          text-align: justify;
        }
        p {
          margin-top: 5px;
          text-align: justify;
        }
      }
    }
  }
}
</style>
