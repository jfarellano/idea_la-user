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
            <div v-if="!emailValid">

              <p class="recuperar-pass">Recuperar contraseña</p>
              <h3 class="input-title" id="email">Por favor ingresa correo electrónico.</h3>
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
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import api from "../requests.js";
import Alert from './Alert.vue'
export default {
  data(){
    return {
      emailRecover: '',
      emailValid: false
    }
  },
  components: {
    Alert
  },
  created(){
    //COMANDO PARA GUARDAR EL CURREN PATH
    // console.log(this.$router.currentRoute.fullPath)
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
      }).then(() => {
        this.emailValid = true;
      }).catch(err => {
        if (err.response != null) {
          if (err.response.data.error == 'user not found') {
            this.$refs.alert.error('No hemos podido encontrar tu usuario')
          } else {
            this.$refs.alert.network_error() 
          }
        } else {
          this.$refs.alert.network_error()
        }
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