<template>
  <section>
    <Header></Header>
    <Idea></Idea>
    <div class="main-container container-fluid">
      <div class="row first">
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="10"
          class="col-md-6 align-self-center main-image"
        >
          <img src="../assets/challenges.svg" />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="100"
          class="col-md-6 align-self-center"
        >
          <h1 class="main-title">{{title}}</h1>
          <p class="parag jump">{{desc}}</p>
        </div>
      </div>
      <!-- INICIO DE CHALLENGES -->
      <div v-if="challenges != ''" class="row second justify-content-center">
        <div v-for="(challenge, index) in challenges" :key="index">
          <router-link
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="100"
            tag="div"
            :to="{name: 'Challenge', params: { cId: challenge.id } }"
            class="challenge container-fluid"
          >
            <div class="row image">
              <img :src="challenge.challenge_pictures[0].url" alt="Imagen de reto" />
            </div>
            <div class="row data">
              <h3 class="title">{{challenge.title}}</h3>
              <p class="parag">{{challenge.short_description}}</p>
            </div>
            <div class="row show-more">
              <b-button>Ver más</b-button>
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
import api from "../requests.js";
import auth from "../authentication.js";
import Alert from "./Alert.vue";
import Header from "./Header.vue";
import Idea from "./AddIdea.vue";

export default {
  components: {
    Header,
    Idea,
    Alert
  },
  data() {
    return {
      challenges: [],
      title: "",
      desc: ""
    };
  },
  methods: {
    getChallenges() {
      api.challenges
        .index()
        .then(response => {
          this.challenges = response.data;
          this.title = auth.storage.get("title");
          this.desc = auth.storage.get("desc");
        })
        .catch(() => {
          this.$refs.alert.network_error();
        });
    }
  },
  created() {
    this.getChallenges();
    this.title = auth.storage.get("title");
    this.desc = auth.storage.get("desc");
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  margin-top: 90px;
  .main-image {
    width: 100%;
    text-align: center;
    img {
      width: 70%;
    }
  }
  .main-title {
    color: #0e2469;
    margin: 0px;
  }
  .title {
    color: #0e2469;
    font-size: 1.1rem;
    margin: 0px;
    width: 100%;
  }
  .parag {
    color: #9b9b9b;
    margin: 0px;
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
      border: 1px solid #ededed;
      border-radius: 5px;
      box-shadow: 0 0 15px 0 rgba(232, 232, 232, 0.4);
      width: 300px;
      height: 420px;
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
        padding: 0px 20px;
        height: 250px;
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
      .show-more {
        padding: 0px 20px;
        button {
          background-color: #0e2469;
          color: white;
          border-radius: 5px;
          width: 100%;
        }
      }
    }
  }
}
</style>
