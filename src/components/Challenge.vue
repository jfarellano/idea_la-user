<template>
  <section>
    <Header></Header>
    <Idea></Idea>
    <div class="main-container container-fluid">
      <div class="row first">
        <div class="col-md-6 align-self-center main-image">
          <h1 class="main-title">{{challenge.title}}</h1>
        </div>
      </div>
      <div class="short-description row justify-content-center">
        <div class="col-md-10">
          <h3>{{challenge.short_description}}</h3>
        </div>
      </div>
      <div class="description row justify-content-center">
        <div class="col-md-10">
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
      <div class="row second justify-content-center" v-if="ideas != ''">
        <router-link
          class="idea container-fluid"
          v-for="(idea, index) in filter()"
          tag="div"
          :key="index"
          :to="{name: 'Idea', params: { iId: idea.id } }"
        >
          <div class="row image">
            <img v-bind:src="idea.idea_pictures[0].url">
          </div>
          <div class="row data">
            <h3>{{idea.title}}</h3>
            <p class="parag">{{getDescription(idea.description)}}</p>
          </div>
        </router-link>
      </div>
      <div v-else>
        <h2 class="title">No se han encontrado ideas</h2>
      </div>
    </div>
    <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import api from "../requests.js";
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
      challenge: {},
      ideas: [],
      search: "",
      page: 1,
      size: 10
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
      api.challenge
        .getIdeas(challengeID)
        .then(response => {
          this.ideas = response.data;
        })
        .catch(() => {
          this.$refs.alert.network_error();
        });
    }
  },
  created() {
    this.getChallengeInfo();
    this.getIdeas();
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  margin-top: 90px;
  .main-image {
    width: 100%;
    text-align: center;
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
    background-image: url("../assets/group.svg");
    background-repeat: no-repeat;
    background-position: right bottom;
  }
  .second {
    padding: 50px;
    padding-top: 0px;
    background-color: white;

    .idea {
      margin: 10px;
      background-color: white;
      border: 1px solid #ededed;
      color: #6d6d6d;
      border-radius: 5px;
      width: 300px;
      height: 350px;
      cursor: pointer;
      .parag {
        color: #020202;
        text-align: justify;
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
        padding: 20px;
        h3 {
          font-size: 1.3rem;
          color: #0e2469;
          width: 100%;
        }
        p {
          color: #262626;
          margin-top: 5px;
          margin-bottom: 5px;
          white-space: normal;
          text-align: justify;
        }
      }
    }
  }
}
</style>

