<template>
  <section>
    <Header></Header>
    <Idea></Idea>
    <div class="main-container container-fluid">
      <div class="row main-title">
        <h1>Mis Ideas</h1>
      </div>
      <div class="row search justify-content-center" v-if="ideas != []">
        <div class="input-group col-md-8">
          <input
            type="text"
            class="form-control inputStyles"
            placeholder="Buscar ideas"
            v-model="search"
          >
        </div>
      </div>
      <div class="row second justify-content-center" v-if="ideas.length != 0">
        <router-link
          class="idea container-fluid"
          v-for="(idea, index) in filter()"
          data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="100"
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
          <div v-if="stage(1)" class="row modifiy align-self-justify">
            <font-awesome-icon @click.prevent="erase(idea.id)" class="col" icon="trash-alt"></font-awesome-icon>
          </div>
        </router-link>
      </div>
      <div v-else>
        <h2 class="title">Parece que no tienes ideas, ¡anímate a postular!</h2>
      </div>
    </div>
    <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import api from "../requests.js";
import auth from '../authentication.js'
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
    erase(id) {
      this.$refs.alert.confirm(
        "Borrar",
        "¿Estás seguro que quieres borrar tu idea?",
        () => {
          api.ideas
            .erase(id)
            .then(() => {
							this.$refs.alert.success("La idea ha sido eliminada")
							this.getIdeas()
            })
            .catch(() => {
              this.$refs.alert.error(
                "No se pudo borrar tu idea intenta de nuevo"
              );
            });
        },
        function() {}
      );
		},
		edit(id){
			this.$router.push('/creareditaridea')
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
      api.ideas
        .user()
        .then(response => {
          this.ideas = response.data;
        })
        .catch(() => {
          this.$refs.alert.network_error();
        });
    },
    stage(stage) {
      return auth.storage.get("stage") == stage;
    },
    stage_from(stage) {
      return auth.storage.get("stage") >= stage;
    }
  },
  created() {
    this.getIdeas();
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  margin-top: 120px;
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
    text-align: center;
    h1 {
      width: 100%;
    }
  }
  .title {
    color: #0e2469;
    width: 100%;
    text-align: center;
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
  .second {
    padding: 50px;
    padding-top: 0px;
    background-color: white;

    .idea {
      margin: 10px;
      background-color: white;
      border: 1px solid #ededed;
      border-radius: 5px;
      color: #0e2469;
      width: 300px;
      height: 400px;
      cursor: pointer;
      .parag {
        color: #020202;
        text-align: justify;
      }
      .modify {
        width: 100%;
        font-size: 30px;
        position: relative;
        bottom: 10px;
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
    }
  }
}
</style>

