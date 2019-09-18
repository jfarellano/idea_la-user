<template>
  <div class="loginComponent">
    <div class="container-fluid">
      <div class="row align-items-center rowStyle">
        <div class="col align-self-center">
          <div
            class="fieldsContainer"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="10"
          >
            <router-link to="/">
              <img src="../assets/CamaraBaq-Blue.svg" alt height="54px" class="iconImage">
            </router-link>

            <p class="iniciar-sesion">Iniciar Sesión</p>

            <h3 class="input-title" id="email">Correo electrónico</h3>
            <div class="input-group">
              <input
                type="email"
                class="form-control inputStyles"
                placeholder="ej. example@email.com"
                v-model="userCredentials.email"
                v-validate="'required|email'"
                :class="{'has-error': errors.has('email_invalid')}"
                name="email"
                @keydown.space.prevent
              >
            </div>
            <p v-if="errors.has('email')" class="incorrectInput">El correo ingresado no es válido.</p>

            <h3 class="input-title">Contraseña</h3>
            <div class="input-group">
              <input
                type="password"
                class="form-control inputStyles"
                v-model="userCredentials.password"
                v-validate="'required'"
                :class="{'has-error': errors.has('password_invalid')}"
                name="password"
                @keyup.enter="userLogin()"
              >
            </div>
            <p v-if="errors.has('password')" class="incorrectInput">Este campo es obligatorio.</p>
            <router-link class="parag" to="/request-password-change">¿Olvidaste tu contraseña? No te preocupes, ya mismo lo solucionamos.</router-link>
            <p style="color: red;" v-if="blocked">Estás bloqueado por {{time}} segundos</p>
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block btnLoginStyle"
              v-on:click.prevent="userLogin()"
              :disabled="!validLogin() || !active || blocked"
            >Iniciar Sesión</button>

            <router-link
              tag="button"
              class="btn btn-primary btn-lg btn-block cancel"
              to="/"
            >Cancelar</router-link>
            <p class="parag" id="registerStyle">
              ¿No tienes cuenta?, solucionemos eso de inmediato. 
              <router-link to="/register">Registrate aquí.</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Alert ref="alert"></Alert>
  </div>
</template>


<script>
import auth from "../authentication.js";
import Alert from "./Alert.vue";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      userCredentials: {},
      active: true,
      blocked: false,
      time: 0,
      lastIdeaID: ''
    };
  },
  components: {
    Alert
  },
  methods: {
    validLogin() {
      if(this.errors.items == null) return false
      if (this.errors.items.length != 0 || this.userCredentials.email == ''|| this.userCredentials.password == '' || this.userCredentials.email == null|| this.userCredentials.password == null) {
        return false;
      } else {
        return true
      }
    },
    blockedTime() {
        setTimeout(() => {
          auth.session.blocked();
          this.blocked = auth.session.blocked();
          if (!this.blocked){
            this.active = true
          }else{
            this.time = Math.trunc(60.0 - ((Date.now() - this.blocked) / 1000))
            this.blockedTime()
          }
        }, 1000);
    },
    userLogin() {
      this.active = false;
      auth.session
        .login({
          email: this.userCredentials.email,
          password: this.userCredentials.password
        })
        .then(response => {
          auth.storage.set(
            response.data.user.id,
            response.data.secret,
            response.data.expire_at
          );
          auth.session.stage().then(response => {
            auth.storage.set_stage(response.data.number);
          });
          if (localStorage.getItem('lastPath') === null) {
            this.$router.push("/");
          } else {
            var lastPath = localStorage.getItem('lastPath');
            localStorage.removeItem('lastPath');
            this.$router.push(lastPath);
          }
        })
        .catch(err => {
          setTimeout(()=>{this.active = true;}, 1000)
          if (err.response == null) {
            this.$refs.alert.network_error();
          } else {
            auth.session.wrong_attempt()
            this.blocked = auth.session.blocked()
            if (this.blocked){
              this.active = false
              this.blockedTime()
              this.time = Math.trunc(60.0 - ((Date.now() - this.blocked) / 1000))
            }
            if (
              err.response.data.single_authentication == "invalid credentials"
            ) {
              this.$refs.alert.credentials_error();
              this.userCredentials.password = "";
            } else if (
              err.response.data.single_authentication == "user is blocked"
            ) {
              this.$refs.alert.blocked_user();
              this.userCredentials.username = "";
              this.userCredentials.password = "";
            } else {
              this.$refs.alert.network_error();
            }
          }
        });
    },
  },
  created() {
    this.userCredentials = {}
    if (auth.storage.logged()) this.$router.push("/");
    this.blocked = auth.session.blocked();
    if (this.blocked) {
      this.active = false;
      this.time = Math.trunc(60.0 - ((Date.now() - this.blocked) / 1000))
      this.blockedTime()
    }
  },
  mounted() {}
};
</script>

<style scoped style lang="scss">
.parag{
  font-size: 16px;
}
.loginComponent {
  background-color: #0e2469;
  height: 100%;
  text-align: center;
  .rowStyle {
    height: 100%;
    min-height: 100vh;
  }
  .iconImage {
    margin-bottom: 15px;
    fill: #0e2469;
  }
  @media (max-width: 800px) {
    .fieldsContainer {
      max-width: 100% !important;
      padding: 21px !important;
    }
    .input-title {
      font-size: 17px !important;
    }
    .iniciar-sesion {
      font-size: 31px !important;
    }
  }
  @media (max-width: 365px) {
    .iniciar-sesion {
      margin-bottom: 50px !important;
    }
  }
  @media (max-width: 321px) {
    #email {
      margin-bottom: 40px !important;
    }
  }
  .fieldsContainer {
    text-align: left;
    padding: 23px;
    margin: auto;
    margin-top: 20px !important;

    padding: 60px;

    min-height: 708px;
    width: 521px;

    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 0 14px 0 rgba(20, 20, 20, 0.3);
  }
  @media (max-width: 341px) {
    .btnLoginStyle {
      height: 75px !important;
    }
  }
  .btnLoginStyle {
    height: 50px;
    border-radius: 5px;
    border-color: #0e2469;
    background-color: #0e2469;
    margin-top: 17px;
    margin-bottom: 17px;
  }
  .cancel {
    height: 50px;
    border-radius: 5px;
    border: solid 1px #0e2469;
    background-color: transparent;
    color: #0e2469;
    margin-top: 17px;
    margin-bottom: 17px;
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

  .incorrectInput {
    color: #ed1d24;
  }
  .iniciar-sesion {
    height: 44px;
    color: #0e2469;
    font-size: 35px;
    font-weight: bold;
    line-height: 44px;
  }
  .input-title {
    height: 27px;
    color: #6a6a6a;
    font-size: 21px;
    font-weight: 300;
    line-height: 27px;
    margin-top: 17px;
  }
  .orSocialMedia {
    margin-left: -17px;
    margin-right: -17px;
  }
}
</style>