<template>
  <section>
    <Header></Header>
    <div class="main-container container-fluid">
      <div class="row first">
        <div class="col-md-6 align-self-center main-image">
          <img v-if="idea.idea_pictures != null" :src="idea.idea_pictures[0].url">
        </div>
        <div class="col-md-6 align-self-center">
          <div class="row">
            <h1 class="title">{{idea.title}}</h1>
          </div>
          <div class="row icons">
            <div class="col wapp">
              <font-awesome-icon @click="share('wap')" :icon="['fab', 'whatsapp']"></font-awesome-icon>
            </div>
            <div class="col face">
              <font-awesome-icon @click="share('face')" :icon="['fab', 'facebook']"></font-awesome-icon>
            </div>
            <div class="col tw">
              <font-awesome-icon @click="share('tw')" :icon="['fab', 'twitter']"></font-awesome-icon>
            </div>
          </div>
          <div class="row">
            <b-button @click='vote()' class="vote">Votar por esta idea</b-button>
          </div>
        </div>
      </div>
      <div class="row third">
        <div class="container-desc">
          <p class="parag">{{idea.description}}</p>
        </div>
      </div>

      <div class="row sixth">
        <b-button-group class="comment-box" v-if="logged()">
          <b-button class="user">
            <b-img
              rounded="circle"
              class="avatar img-responsive"
              :src="getPic()"
              alt="Circle image"
            ></b-img>
          </b-button>
          <div class="comment">
            <input type="text" v-model="comment.description" placeholder="Escribe tu comentario">
          </div>
          <div class="opt-wrap">
            <b-button @click='commentIdea()' class="option" :disabled="comment.description == null || comment.description == ''">
              <font-awesome-icon icon="paper-plane"></font-awesome-icon>
            </b-button>
          </div>
        </b-button-group>
        <h2 v-else>Si quieres poder comentar registate</h2>
      </div>

      <div class="row comments">
        <b-button-group class="comment-box" v-for="comment in comments" :key='comment.id'>
          <b-button class="user">
            <b-img
              rounded="circle"
              class="avatar img-responsive"
              src="http://placehold.it/30x30"
              alt="Circle image"
            ></b-img>
          </b-button>
          <div class="comment">
            <p class="name">{{comment.user_name}}</p>
            <p>{{comment.description}}</p>
          </div>
        </b-button-group>
      </div>
    </div>
    <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import api from "../requests.js";
import Header from "./Header.vue";
import auth from "../authentication";
import Alert from './Alert.vue'

export default {
  components: {
    Header,
    Alert
  },
  data() {
    return {
      ideaID: "",
      idea: {},
      comments: [],
      comment: {},
      err: {}
    };
  },
  methods: {
    loadIdeaInfo() {
      this.ideaID = this.$route.params.iId;
      api.idea
        .getInfo(this.ideaID)
        .then(response => {
          this.idea = response.data;
        })
        .catch(() => {
          this.$refs.alert.network_error()
        });
    },
    share(sn) {
      if (sn == "wap")
        window.location =
          "whatsapp://send?text=Te comparto esta idea de #ImaginaTuCiudá " +
          api.variable.WEB +
          "idea/" +
          this.$route.params.iId;
      if (sn == "face")
        window.location =
          "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(
            api.variable.WEB + "idea/" + this.$route.params.iId
          );
      if (sn == "tw")
        window.location =
          "https://twitter.com/home?status=" +
          encodeURIComponent(
            "Te comparto esta idea de #ImaginaTuCiudá " +
              api.variable.WEB +
              "idea/" +
              this.$route.params.iId
          );
    },
    getPic() {
      return auth.storage.get("picture");
    },
    vote() {
      if (this.logged()) {
        this.$refs.alert.success('Tu voto se ha enviado, gracias por votar')
      } else {
        this.$router.push("/register");
      }
    },
    loadComments() {
      api.comments.index(this.ideaID)
        .then(response => {
          this.comments = response.data;
        })
        .catch(() => {
          this.$refs.alert.network_error()
        });
    },
    commentIdea() {
      api.comments.create
      (this.ideaID, this.comment)
        .then(() => {
          this.loadComments()
          this.comment = {}
          this.$refs.alert.success('¡Tu comentario se ha enviado!')
        })
        .catch(() => {
          this.$refs.alert.error('No pudimos enviar tu comentario intenta de nuevo mas tarde')
        });
    },
    logged() {
      return auth.storage.logged();
    }
  },
  created() {
    this.loadIdeaInfo();
    this.loadComments();
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
      width: 100%;
    }
  }
  .title {
    color: #0e2469;
    font-size: 37px;
    margin: 0px;
  }
  .parag {
    color: #9b9b9b;
    margin: 0px;
    text-align: justify;
  }
  .first {
    padding: 30px;
    .icons {
      text-align: center;
      font-size: 30px;
      .wapp {
        color: #25d366 !important;
      }
      .face {
        color: #3c5a99 !important;
      }
      .tw {
        color: #38a1f3 !important;
      }
    }
    .vote {
      width: 100%;
      border-radius: 5px;
      border-color: #0e2469;
      background-color: #0e2469;
    }
  }
  .second {
    padding: 50px;
  }
  .third {
    padding: 0px 50px;
    .container-desc {
      box-shadow: 0 0 6px 0 rgba(188, 188, 188, 0.5);
      padding: 30px;
    }
  }
  .fourth {
    margin-top: 40px;
    height: 200px;
  }
  .fifth {
    padding: 50px;
    button {
      width: 100%;
      border: 2px solid #4d4d4d;
      background-color: #ffe01b;
      color: #4d4d4d;
      border-radius: 0px;
      font-size: 2em;
    }
  }
  .sixth {
    padding: 0px 50px 20px 50px;
    h2{
      margin-top: 10px;
      text-align: center;
      width: 100%
    }
    .comment-box {
      width: 100%;
      height: 50px;
      border: none;
      color: #0e2469;
      margin-top: 20px;
      .user {
        width: 50px;
        background-color: transparent;
        border: none;
        color: #0e2469;
        flex: 0 1 auto;
        text-align: left;
      }
      .comment {
        width: 100%;
        border: none;
        background-color: #f8f8f8;
        border-radius: 50px;
        color: black;
        input {
          width: calc(100% - 25px);
          position: relative;
          left: 25px;
          height: 100%;
          border: none;
          background-color: #f8f8f8;
          color: black;
        }
      }
      .opt-wrap {
        background-color: #f8f8f8;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
      }
      .option {
        width: 80px;
        height: 50px;
        background-color: #0e2469;
        color: white;
        border: none;
        border-radius: 50px;
      }
      .block {
        width: 50px;
        background-color: transparent;
        color: #6a6a6a;
      }
      .avatar {
        width: 34px;
        height: 34px;
      }
      .extra {
        color: #6a6a6a;
        font-size: 12px;
      }
    }
  }
  .comments {
    padding: 0px 50px 0px 50px;
    margin-bottom: 30px;
    .comment-box {
      width: 100%;
      border: none;
      color: #0e2469;
      margin-top: 20px;
      .user {
        width: 50px;
        background-color: transparent;
        border: none;
        color: #0e2469;
        flex: 0 1 auto;
        text-align: left;
      }
      .comment {
        width: 100%;
        border: none;
        background-color: white;
        color: black;
        .name{
          color: #0e2469;
        }
        p {
          border: none;
          color: black;
          margin: 0px;
        }
      }
      .avatar {
        width: 34px;
        height: 34px;
      }
    }
  }
}
</style>
