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
            <div v-if="!emailValid">
              <router-link to="/">
              <img src="../assets/CamaraBaq-Blue.svg" alt height="54px" class="iconImage">
              </router-link>

              <p class="recuperar-pass">Recuperar contraseña</p>
              <h3 class="input-title" id="email">Introduce tu dirección de correo electrónico para buscar tu cuenta.</h3>
              <div class="input-group">
                <input
                  type="email"
                  class="form-control inputStyles"
                  placeholder="ej. example@email.com"
                  v-model="emailRecover"
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
                v-on:click.prevent="continueRecover()"
                :disabled="!validRecover()"
              >Continuar</button>

              <router-link
                to="/login" 
                tag="button" 
                class="btn btn-primary btn-lg btn-block btnCancelStyle"
              >Cancelar</router-link>

            </div>
            <div v-else>
              <p class="recuperar-pass solicitud-ex">¡Solicitud Exitosa!</p>
              <p>Se ha enviado un correo electrónico a <b>{{ this.emailRecover }}</b> con un link para realizar el cambio de contraseña.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../requests.js";

export default {
  data(){
    return {
      emailRecover: '',
      emailValid: false
    }
  },
  created(){
    var currentUrl = this.$route.query.page;
    console.log(currentUrl);
  },
  methods: {
    validRecover() {
      if (this.errors.count() == 0 && this.emailRecover != '') {
        return true;
      } else {
        return false;
      }
    },
    continueRecover() {
      
      api.password.mail({
        email: this.emailRecover
      }).then(response => {
        console.log(response.data)
        this.emailValid = true;
      }).catch(err => {
        console.log(err.response)
        this.$snotify.error("Error de red. Inténtelo mas tarde.", "Error", {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      })
    }
  }
}
</script>

<style scoped style lang="scss">
.recoverPassword {
  background-color: #0E2469;
  height: 100%;
  text-align: center;
  .rowStyle {
    height: 100%;
    min-height: 100vh;
  }
  .iconImage {
    margin-bottom: 15px;
    fill:#0E2469;
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
    background-color: #FFFFFF;
    box-shadow: 0 0 14px 0 rgba(20,20,20,0.3);
  }
  @media (max-width: 341px) {
    .btnContinueStyle {
      height: 75px !important;
    }
  }
  .btnContinueStyle {
    height: 50px;
    border-radius: 5px;
    border-color: #0E2469;
    background-color: #0E2469;
    margin-top: 17px;
    margin-bottom: 17px;
  }
  .btnCancelStyle {
    height: 50px;
    border-radius: 5px;
    border-color: #0E2469;
    color: #0E2469;
    background-color: white;
    margin-top: 17px;
    margin-bottom: 17px;
  }
  .inputStyles {
    border: 1px solid #0E2469;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 #ffffff;
    height: 50px;
    font-size: 21px;
    color: #0E2469;
    &:focus {
      border: 2px solid #0E2469;
    }
  }
  .incorrectInput {
    color: #ED1D24;
  }
  .recuperar-pass {
    height: 44px;
    color: #0E2469;
    font-size: 30px;
    font-weight: bold;
    line-height: 44px;
  }
  .input-title {
    height: 27px;
    color: #6A6A6A;
    font-size: 17px;
    font-weight: 300;
    line-height: 27px;
    margin-top: 17px;
    margin-bottom: 37px;
  }
}
</style>