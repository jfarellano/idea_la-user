<template>
  <!-- MODAL -->
  <div class="main-container">
    <b-modal
      id="survey"
      centered
      scrollable
      title="Priorización de Retos"
      class="modalStyle"
      hide-footer
      hide-header
      @hide="prevent"
    >
      <div v-if="selected.length != challenges.length">
        <p class="parag">Selecciona en orden cuáles retos te parecen más importantes</p>
        <b-button
          data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="100"
          @click="selectChallenge(challenge)"
          class="challenge"
          v-for="challenge in availableChallenges()"
          :key="challenge.id"
          v-b-tooltip.hover
          :title="challenge.short_description"
        >{{challenge.title}}</b-button>
      </div>
      <div v-else>
        <p>Este fue el orden que elegiste:</p>
        <ol>
          <li data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="100" v-for="(challenge, i) in selected" :key="i">{{getElement(challenge).title}}</li>
        </ol>
        <b-button @click="clear()" class="clear">Reorganizar retos</b-button>
        <b-button @click="save()" class="challenge">Guardar mi selección</b-button>
      </div>
      <b-button @click="logout()" class="logout">Cerrar sesión</b-button>
    </b-modal>
    <Alert ref="alert"></Alert >
  </div>
</template>

<script>
import auth from '../authentication.js'
import api from "../requests.js";
import Alert from './Alert.vue'
export default {
  data() {
    return {
      challenges: [],
      selected: [],
      saved: false,
      err: {}
    };
  },
  components:{
    Alert
  },
  methods: {
    open() {
      this.$bvModal.show("survey");
    },
    prevent(bvModalEvt) {
      if (this.saved) {
        this.$bvModal.hide("survey");
      } else {
        bvModalEvt.preventDefault();
      }
    },
    availableChallenges() {
      var here = this;
      return here.challenges.filter(function(challenge) {
        return !here.selected.includes(challenge.id);
      });
    },
    selectChallenge(challenge) {
      this.selected.push(challenge.id);
    },
    getElement(id) {
      return this.challenges.filter(function(challenge) {
        return challenge.id == id;
      })[0];
    },
    clear() {
      this.selected = [];
    },
    save() {
      api.user
        .save_survey({ array: this.selected })
        .then(() => {
          this.saved = true;
          this.$bvModal.hide("survey");
        })
        .catch(() => {
          this.$refs.alert.network_error()
        });
    },
    logout(){
      auth.session.logout().then(() => {
        auth.storage.clear()
        location.reload()
      }).catch(() => {
        auth.storage.clear()
        location.reload()
      })
    }
  },
  created() {
    api.challenges
      .index()
      .then(response => {
        this.challenges = response.data;
      })
      .catch(err => {
        this.err = err
      });
  }
};
</script>

<style lang="scss" scoped>
.challenge {
  width: 100%;
  margin-bottom: 7px;
  background-color: #0e2469;
  color: white;
}
.logout {
  width: 100%;
  margin-bottom: 7px;
  background-color: transparent;
  border: solid 1px red;
  color: red;
}
.clear {
  width: 100%;
  margin-bottom: 7px;
  background-color: transparent;
  border: solid 1px #0e2469;
  color: #0e2469;
}
p{
  color:#0e2469;
}
li{
  color:#0e2469;
}
</style>

