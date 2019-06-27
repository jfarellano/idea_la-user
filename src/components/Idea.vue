<template>
  <section>
    <Header></Header>
    <div class="container-wraper container-fluid">
      <div class="row justify-content-center main-row">
        <div class="main-col">
          <div class="main-container container-fluid">
            <div class="row back">
              <font-awesome-icon @click="back()" icon="arrow-left"></font-awesome-icon>
            </div>
            <div class="row first">
              <div class="col-md-6 align-self-end main-image">
                <img v-if="idea.idea_pictures != null" :src="idea.idea_pictures[0].url">
              </div>
              <div class="col-md-6 align-self-center">
                <div class="row">
                  <h1 class="title">{{idea.title}}</h1>
                </div>
                <div class="row icons justify-content-left">
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
                <div v-if="stage(3)" class="row">
                  <b-button @click="vote()" class="vote">Votar por esta idea</b-button>
                </div>
              </div>
            </div>
            <div class="row third">
              <div class="container-desc">
                <p class="parag jump">{{idea.description}}</p>
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
                  <input
                    type="text"
                    v-model="comment.description"
                    placeholder="Escribe tu comentario"
                  >
                </div>
                <div class="opt-wrap">
                  <b-button
                    @click="commentIdea()"
                    class="option"
                    :disabled="comment.description == null || comment.description == ''"
                  >
                    <font-awesome-icon icon="paper-plane"></font-awesome-icon>
                  </b-button>
                </div>
              </b-button-group>
              <h2 v-else>Regístrate y podrás comentar</h2>
            </div>

            <div class="row comments">
              <b-button-group class="comment-box" v-for="comment in comments" :key="comment.id">
                <b-button class="user">
                  <img
                    class="avatar"
                    :src="getCPic(comment.user_profile_picture)"
                    alt="Circle image"
                  >
                </b-button>
                <div class="comment">
                  <p class="name">{{comment.user_name}}</p>
                  <p>{{comment.description}}</p>
                </div>
              </b-button-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import api from "../requests.js";
import Header from "./Header.vue";
import auth from "../authentication";
import Alert from "./Alert.vue";

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
          this.$refs.alert.network_error();
        });
    },
    getCPic(pic) {
      if (typeof pic == "object") return pic.url;
      else return pic;
    },
    share(sn) {
      var url = "";
      if (sn == "wap")
        url =
          "whatsapp://send?text=Te comparto esta idea de #ImaginaTuCiudá " +
          api.variable.WEB +
          "idea/" +
          this.$route.params.iId;
      else if (sn == "face")
        url =
          "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(
            api.variable.WEB + "idea/" + this.$route.params.iId
          );
      else if (sn == "tw")
        url =
          "https://twitter.com/home?status=" +
          encodeURIComponent(
            "Te comparto esta idea de #ImaginaTuCiudá " +
              api.variable.WEB +
              "idea/" +
              this.$route.params.iId
          );
      window.open(url, "_blank");
    },
    getPic() {
      return auth.storage.get("picture");
    },
    vote() {
      if (this.logged()) {
        this.$refs.alert.confirm(
          "¿Estas seguro?",
          "Recuerda que solo puedes votar por una idea en cada reto, y es irreversible el voto",
          () => {
            api.idea
              .vote(this.idea.id)
              .then(() => {
                this.$refs.alert.success(
                  "Tu voto se ha enviado, gracias por votar"
                );
              })
              .catch(err => {
                if (
                  err.response.data.authorization ==
                  "you already voted for this challenge!"
                ) {
                  this.$refs.alert.error(
                    "Lo sentimos ya has votado por una idea de este reto"
                  );
                } else {
                  this.$refs.alert.network_error();
                }
              });
          },
          () => {}
        );
      } else {
        this.$router.push("/register");
      }
    },
    loadComments() {
      api.comments
        .index(this.ideaID)
        .then(response => {
          this.comments = response.data;
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
    },
    commentIdea() {
      api.comments
        .create(this.ideaID, this.comment)
        .then(() => {
          this.loadComments();
          this.comment = {};
          this.$refs.alert.success("¡Tu comentario se ha enviado!");
        })
        .catch(() => {
          this.$refs.alert.error(
            "No pudimos enviar tu comentario intenta de nuevo mas tarde"
          );
        });
    },
    logged() {
      return auth.storage.logged();
    },
    back() {
      var route = "/reto/" + this.idea.challenge.id;
      this.$router.push(route);
    }
  },
  created() {
    this.loadIdeaInfo();
    this.loadComments();
  }
};
</script>

<style lang="scss" scoped>
.container-wraper {
  padding: 0px;
  .main-row {
    margin: 0px;
  }
}
.main-col {
  @media (min-width: 1100px) {
    width: 1100px !important;
  }
}
.main-container {
  margin-top: 90px;
  .main-image {
    width: 100%;
    height: calc(100vw * 0.3);
    overflow: hidden;
    text-align: center;
    position: relative;
    img {
      overflow: hidden;
      width: calc(100% - 30px);
    }
    @media (max-width: 768px) {
      height: auto !important;
    }
    @media (min-width: 768px) {
      img {
        position: absolute;
        bottom: 0px;
        right: 0px;
      }
    }
    @media (min-width: 1100px) {
      height: 293px !important;
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
    padding-top: 10px;
    .title {
      margin: 10px 15px;
    }
    .icons {
      text-align: center;
      font-size: 30px;
      cursor: pointer;
      .col {
        width: 30px;
        flex-grow: unset;
      }
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
      margin: 0px 15px;
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
  .back {
    text-align: center;
    color: #0e2469;
    font-size: 30px;
    padding-top: 10px;
    padding-left: 45px;
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
    h2 {
      margin-top: 10px;
      text-align: center;
      width: 100%;
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
        border-radius: 50%;
        img {
          border-radius: 50%;
        }
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
        .name {
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
        border-radius: 50%;
      }
    }
  }
}
</style>
