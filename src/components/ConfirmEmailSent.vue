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
            <p class="recuperar-pass">Confirma tu correo</p>
            <h3 class="input-title">Se ha enviado un enlace a tu correo electrónico. Por favor revisa tu bandeja de entrada y haz click en el link para confirmar tu cuenta. </h3>
            <br>
            <h3 class="input-title">Si no lo has recibido, puedes reenviarlo ingresando tu correo.</h3>
            <br>
            <div class="input-group">
              <input
                type="email"
                class="form-control inputStyles"
                placeholder="ej. example@email.com"
                v-model="emailResendLink"
                v-validate="'required|email'"
                :class="{'has-error': errors.has('email_invalid')}"
                name="email"
                @keydown.space.prevent
              >
            </div>
            <p v-if="errors.has('email')" class="incorrectInput">
              El correo ingresado no es válido.
            </p>
            
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block btnContinueStyle"
              v-on:click.prevent="resendConfirmLink()"
              :disabled="!validRecover()"
            >Enviar</button>

            <router-link
              to="/login" 
              tag="button" 
              class="btn btn-primary btn-lg btn-block btnCancelStyle"
            >Cancelar</router-link>
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
      emailResendLink: '',
      active: true
    };
  },
  components: {
    Alert
  },
  created() {
  },
  methods: {
    resendConfirmLink(){
      // Bloquear boton mientras se hace peticion
      this.active = false
      api.user
        .confirm({
          email: this.emailResendLink
        })
        .then(() => {
          setTimeout(location.reload(), 1000)
        })
        .catch(() => {
          setTimeout(() => {
            this.active = true
          }, 1000)
          this.$refs.alert.network_error();
        })
    },
    validRecover() {
      if (this.errors.count() == 0 && this.emailResendLink != '' && this.active) {
        return true;
      } else {
        return false;
      }
    },
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