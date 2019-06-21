<template>
  <div class="recoverPassword">
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
            <div v-if="!validToken">
              <p class="recuperar-pass solicitud-ex">Enlace no disponible</p>
              <p>El enlace no está disponible. Por favor inténtelo nuevamente.</p>
            </div>
            <div v-else>
              <div v-if="!successChange">
                <p class="recuperar-pass">Recuperar contraseña</p>
                <h3 class="input-title" id="email">
                  Introduce tu nueva contraseña.
                  <br>Recuerda que debe contener mínimo 6 caracteres.
                </h3>

                <div class="input-group">
                  <input
                    placeholder="Nueva contraseña"
                    type="password"
                    class="form-control inputStyles"
                    v-model="password"
                    v-validate="'required|min:6'"
                    :class="{'has-error': errors.has('password_invalid')}"
                    name="password"
                    @keydown.space.prevent
                    ref="password"
                  >
                </div>
                <p
                  v-if="errors.has('password')"
                  class="incorrectInput"
                >La contraseña debe ser minimo de 6 caracteres</p>
                <div v-else>
                  <br>
                </div>
                <div class="input-group">
                  <input
                    placeholder="Confirmar contraseña"
                    type="password"
                    class="form-control inputStyles"
                    v-model="passwordConfirm"
                    v-validate="'required|confirmed:password'"
                    :class="{'has-error': errors.has('password_confirm_invalid')}"
                    name="password_confirm"
                    v-on:keyup.enter="userLogin()"
                  >
                </div>
                <p v-if="errors.has('password_confirm')" class="incorrectInput">Tu contraseña no coincide</p>

                <button
                  type="button"
                  class="btn btn-primary btn-lg btn-block btnContinueStyle"
                  v-on:click.prevent="confirmPassword()"
                  :disabled="!validRecover()"
                >Aceptar</button>
              </div>
              <div v-else>
                <p class="recuperar-pass solicitud-ex">¡Cambio Exitoso!</p>
                <p>Tu contraseña se ha cambiado exitosamente.</p>
                <router-link to="/login">Ir a inicio de sesión.</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import api from "../requests.js";
import Alert from "./Alert.vue";
export default {
  data() {
    return {
      password: "",
      passwordConfirm: "",
      validToken: true,
      successChange: false,
      token: ""
    };
  },
  components: {
    Alert
  },
  created() {
    this.token = this.$route.params.token;
    api.password
      .validate(this.token)
      .then(() => {
        this.validToken = true;
      })
      .catch(() => {
        this.validToken = false;
      });
  },
  methods: {
    validRecover() {
      if (
        this.errors.count() == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    confirmPassword() {
      api.password
        .change(this.token, {
          password: this.password
        })
        .then(() => {
          this.successChange = true;
        })
        .catch(() => {
          this.$refs.alert.network_error();
        });
    }
  }
};
</script>

<style scoped style lang="scss">
.recoverPassword {
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
    .recuperar-pass {
      font-size: 31px !important;
    }
  }
  @media (max-width: 345px) {
    .input-title {
      margin-bottom: 65px !important;
    }
  }
  @media (max-width: 410px) {
    .recuperar-pass {
      margin-bottom: 50px !important;
    }
  }
  // @media (max-width: 321px) {
  //   #email {
  //     margin-bottom: 40px !important;
  //   }
  // }
  .fieldsContainer {
    text-align: left;
    padding: 23px;
    margin: auto;
    margin-top: 20px !important;

    padding: 60px;

    min-height: 440px;
    width: 521px;

    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 0 14px 0 rgba(20, 20, 20, 0.3);
  }
  @media (max-width: 341px) {
    .btnContinueStyle {
      height: 75px !important;
    }
  }
  .btnContinueStyle {
    height: 50px;
    border-radius: 5px;
    border-color: #0e2469;
    background-color: #0e2469;
    margin-top: 17px;
    margin-bottom: 17px;
  }
  .btnCancelStyle {
    height: 50px;
    border-radius: 5px;
    border-color: #0e2469;
    color: #0e2469;
    background-color: white;
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
  .recuperar-pass {
    height: 44px;
    color: #0e2469;
    font-size: 30px;
    font-weight: bold;
    line-height: 44px;
  }
  .input-title {
    height: 27px;
    color: #6a6a6a;
    font-size: 17px;
    font-weight: 300;
    line-height: 27px;
    margin-top: 17px;
    margin-bottom: 37px;
  }
}
</style>