<template>
  <div class="loginComponent">
    <div class="container-fluid divStyle">
      <div class="row align-items-center rowStyle">
        <div class="col align-self-center">
          <router-link to="/">
            <img src="../assets/CS_BC.svg" alt height="140px" class="iconImage">
          </router-link>
          <div
            class="fieldsContainer"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="10"
          >
            <h3 class="title">Correo electrónico</h3>
            <div class="input-group">
              <input
                type="email"
                class="form-control inputStyles"
                placeholder="ej. example@email.com"
                v-model="userCredentials.email"
              >
            </div>
            <div class="divSeparator"></div>
            <h3 class="title">Contraseña</h3>
            <div class="input-group">
              <input
                type="password"
                class="form-control inputStyles"
                v-model="userCredentials.password"
              >
            </div>
            <div class="divSeparator"></div>
            <p class="parag" id="registerStyle">
              ¿No tienes una cuenta todavía?
              <router-link to="/register">Registrate aquí.</router-link>
            </p>
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block"
              id="btnLoginStyle"
              v-on:click.prevent="userLogin()"
            >Ingresar</button>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="modalPopover credentials" title="Atención" ok-only>
      <p class="parag">Credenciales Inválidas.</p>
    </b-modal>
    <b-modal id="modalPopover blocked" title="Atención" ok-only>
      <p class="parag">Usuario bloqueado.</p>
    </b-modal>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import auth from "../authentication.js";

export default {
  data() {
    return {
      userCredentials: {}
    };
  },
  methods: {
    userLogin() {

      auth.session
        .login({
          email: this.userCredentials.email,
          password: this.userCredentials.password
        })
        .then(response => {
          auth.storage.set(
            response.data.user_id,
            response.data.secret,
            response.data.expire_at
          )
          this.extraData(response.data.user_id)
        })
        .catch(err => {
          if (err.response.data.single_authentication == "invalid credentials") {
            this.$snotify.error("Credenciales inválidas.", "Atención", {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true
            });
          } else if (err.response.data.single_authentication == "user is blocked") {
            // ALERT NOTIFICATION USER BLOCKED
            this.$snotify.error("Usuario bloqueado", "Atención", {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true
            });
            this.userCredentials.username = "";
            this.userCredentials.password = "";
          } else {
            setTimeout(() => this.$router.push("/"), 500);
          }
        });
    },

    extraData(user_id) {
      auth.session
        .user_info(user_id)
        .then(response => {
          auth.storage.set_name(response.data.name, response.data.lastname);
          this.$router.push("/");
        })
        .catch(err => {
          this.$snotify.error(
            "Error obteniendo informacion del usuario",
            "Atención",
            {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true
            }
          );
        });
    }
  }
};
</script>

<style scoped style lang="scss">
.loginComponent {
  background-color: #ffe01b;
  height: 100vh;
  text-align: center;
  .divStyle {
    height: 100vh;
  }
  .rowStyle {
    height: 100%;
  }
  .iconImage {
    margin-bottom: 15px;
  }
  @media (max-width: 800px) {
    .fieldsContainer {
      max-width: 90% !important;
    }
  }
  .fieldsContainer {
    background-color: white;
    text-align: left;
    padding: 23px;
    margin: auto;
    max-width: 35%;
  }
  .divSeparator {
    height: 13px;
  }
  #btnLoginStyle {
    background-color: grey;
    border: grey;
    box-shadow: 0px 5px #ffe01b;
    border-radius: 0px;
  }
  .inputStyles {
    border-radius: 0px;
  }
}
</style>