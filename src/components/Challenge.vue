<template>
  <section>
    <Header></Header>
    <Idea></Idea>
    <div data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="100" class="main-container container-fluid">
      <div
        :style="'background-image: url(' + challenge.challenge_pictures[0].url + ')'"
        class="row first"
      >
        <div class="col-md-6 align-self-center main-image">
          <h1 class="main-title">{{challenge.title}}</h1>
        </div>
      </div>
      <router-link to="/retos" tag="div" class="row back">
        <font-awesome-icon icon="arrow-left" class="arrow-back"></font-awesome-icon>
      </router-link>
      <div class="short-description row justify-content-center">
        <div class="col-md-10">
          <h3>{{challenge.short_description}}</h3>
        </div>
      </div>
      <div class="description row justify-content-center">
        <div class="col-md-10 description">
          <p class="jump">{{challenge.description}}</p>
        </div>
      </div>
      <div class="row search justify-content-center" v-if="ideas != ''">
        <div class="input-group col-md-8">
          <input
            type="text"
            class="form-control inputStyles"
            placeholder="Buscar ideas"
            v-model="search"
          >
        </div>
      </div>
      <div class="row second justify-content-center" v-if="ideas != '' && ideasReceived">
        <router-link
          :class="ideaClass('idea container-fluid')"
          v-for="(idea, index) in filter()"
          data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="100"
          tag="div"
          :key="index"
          :to="{name: 'Idea', params: { iId: idea.id } }"
        >
          <font-awesome-icon class="icon" icon='star'></font-awesome-icon>
          <div class="row image">
            <img v-bind:src="idea.idea_pictures[0].url">
          </div>
          <div class="row data">
            <h3>{{idea.title}}</h3>
            <h6 v-if="stage == 3">Votos: {{idea.votes}}</h6>
            <p class="parag">{{getDescription(idea.description)}}</p>
          </div>
          <div class="row show-more">
            <b-button>Ver más</b-button>
          </div>
        </router-link>
        <div v-if="filter().length == 0">
          <h2>Ups no hay ideas que coincidan con tu búsqueda</h2>
        </div>
      </div>
      <div v-else>
        <b-col v-if="!ideasReceived" align="center">
          <b-spinner v-if="ideas == ''" class="d-flex align-items-center" label="Loading..."></b-spinner>
        </b-col>
        <h2 class="title">¡Anímate! Sé el primero en postular una idea.</h2>
      </div>
    </div>
    <Alert ref="alert"></Alert>
    <Foot></Foot>
  </section>
</template>

<script>
import api from "../requests.js";
import auth from "../authentication.js";
import Alert from "./Alert.vue";
import Header from "./Header.vue";
import Idea from "./AddIdea.vue";
import Foot from "./Foot.vue";

export default {
  components: {
    Header,
    Idea,
    Alert,
    Foot
  },
  data() {
    return {
      challenge: {},
      ideas: [],
      search: "",
      page: 1,
      size: 10,
      stage: 0,
      ideasReceived: false
    };
  },
  methods: {
    gotoIdea() {
      this.$router.push("/idea");
    },
    getChallengeInfo() {
      var challengeID = this.$route.params.cId;

      api.challenge
        .getInfo(challengeID)
        .then(response => {
          this.challenge = response.data;
        })
        .catch(() => {
          this.$refs.alert.network_error();
        });
    },
    ideaClass(cls) {
      if (this.stage == "4") return cls + " win";
      else return cls;
    },
    filter() {
      var list = [];
      if (this.search != "" && this.search != null) {
        var here = this;
        list = here.ideas.filter(function(idea) {
          return (
            idea.title.toLowerCase().includes(here.search.toLowerCase()) ||
            idea.description.toLowerCase().includes(here.search.toLowerCase())
          );
        });
      } else {
        list = this.ideas;
      }
      // return list.slice(0, this.page * this.size)
      return list;
    },
    getDescription(desc) {
      if (desc.length <= 100) return desc;
      else return desc.slice(0, 100) + "...";
    },
    getIdeas() {
      var challengeID = this.$route.params.cId;
      switch (this.stage) {
        case "1":
        case "2":
          api.challenge
            .getIdeas(challengeID)
            .then(response => {
              this.ideas = response.data;
              this.ideasReceived = true
            })
            .catch(() => {
              this.$refs.alert.network_error();
            });
          break;
        case "3":
          api.idea
            .picked(challengeID)
            .then(response => {
              this.ideas = response.data;
              this.ideasReceived = true
            })
            .catch(() => {
              this.$refs.alert.network_error();
            });
          break;
        case "4":
          api.idea
            .winers(challengeID)
            .then(response => {
              this.ideas = response.data;
              this.ideasReceived = true
            })
            .catch(() => {
              this.$refs.alert.network_error();
            });
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.stage = auth.storage.get("stage");
    this.getChallengeInfo();
    this.getIdeas();
  }
};
</script>

<style lang="scss" scoped>
.arrow-back {
  cursor: pointer;
}
.main-container {
  margin-top: 90px;
  .main-image {
    width: 100%;
    text-align: center;
  }
  .back {
    text-align: center;
    color: #0e2469;
    font-size: 30px;
    padding-top: 10px;
    padding-left: calc(100vw * 0.11);
    @media (max-width: 768px) {
      padding-left: 30px;
    }
  }
  .inputStyles {
    border: 1px solid #0e2469;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 #ffffff;
    height: 50px;
    font-size: 21px;
    color: #0e2469;
    &:focus {
      border: 2px solid #0e2469;
    }
  }
  .main-title {
    color: #0e2469;
    h1 {
      font-size: 2.5rem;
    }
  }
  .title {
    color: #0e2469;
    width: 100%;
  }
  .parag {
    color: #020202;
    text-align: justify;
  }
  .description {
    text-align: justify;
    margin: 20px 0px;
  }
  .short-description {
    margin: 20px 0px;
  }
  .search {
    margin: 20px 0px;
  }
  .first {
    padding: 50px;
    min-height: 400px;
    background-size: 100%;
    height: calc(100vw * 0.33);
    background-repeat: no-repeat;
    background-position: right bottom;
  }
  .second {
    padding: 50px;
    padding-top: 0px;
    background-color: white;

    .win {
      &:first-child {
        -webkit-box-shadow: 0px 0px 61px -3px rgba(14, 52, 105, 0.75);
        -moz-box-shadow: 0px 0px 61px -3px rgba(14, 52, 105, 0.75);
        box-shadow: 0px 0px 61px -3px rgba(14, 52, 105, 0.75);
        .icon{
          display: inline;
        }
      }
    }

    .idea {
      margin: 10px;
      background-color: white;
      border: 1px solid #ededed;
      color: #6d6d6d;
      border-radius: 5px;
      width: 300px;
      height: 420px;
      position: relative;
      cursor: pointer;
      .parag {
        color: #020202;
        text-align: justify;
      }
      .icon{
        display: none;
        position: absolute;
        top: -20px;
        right: -20px;
        font-size: 50px;
        transform: rotate(25deg);
        color: #0e2469;
      }

      .image {
        height: 150px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        overflow: hidden;
        img {
          width: 300px;
          margin: auto;
        }
      }
      .data {
        word-wrap: break-word;
        overflow-wrap: break-word;
        width: 298px;
        padding: 20px;
        height: 210px;
        h3 {
          font-size: 1.3rem;
          color: #0e2469;
          width: 100%;
        }
        p {
          width: 258px;
          word-wrap: break-word;
          overflow-wrap: break-word;
          color: #262626;
          margin-top: 5px;
          margin-bottom: 5px;
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

