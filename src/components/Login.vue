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
            <p v-if="errors.has('email')" class="incorrectInput">
              El correo ingresado no es válido.
            </p>

            <h3 class="input-title">Contraseña</h3>
            <div class="input-group">
              <input
                type="password"
                class="form-control inputStyles"
                v-model="userCredentials.password"
                v-validate="'required'"
                :class="{'has-error': errors.has('password_invalid')}"
                name="password"
                v-on:keyup.enter="userLogin()"
              >
            </div>
            <p v-if="errors.has('password')" class="incorrectInput">
              Este campo es obligatorio.
            </p>
            <router-link to="/recover-password">¿Has olvidado tu contraseña?</router-link>
            
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block btnLoginStyle"
              v-on:click.prevent="userLogin()"
              :disabled="!validLogin()"
            >Iniciar Sesión</button>

            <p class="parag" id="registerStyle">
              ¿No tienes cuenta?
              <router-link to="/register">Registrate aquí.</router-link>
            </p>

            <b-row>
              <b-col>
                <hr>
              </b-col>
              <b-col cols="1" class="orSocialMedia align-items-center">
                <p>o</p>
              </b-col>
              <b-col>
                <hr>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button @click="facebookOauth()">Facebook</b-button>
              </b-col>
              <b-col>
                <b-button @click="authenticate('google')">Google</b-button>
              </b-col>
              <b-col>
                <b-button @click="authenticate('twitter')">Twitter</b-button>
              </b-col>
            </b-row>
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
      userCredentials: {},
      FB: {}
    };
  },
  methods: {
    // facebookOauth() {
    //   FB.api(
    //     '/me',
    //     'GET',
    //     {"fields":"id,name"},
    //     function(response) {
    //         console.log(response.data)
    //     }
    //   );
    // },
    validLogin(){
      console.log('ENTRA CARGANDO')
      if (this.errors.count() == 0 && this.userCredentials.email != null && this.userCredentials.password != null) {
        return true;
      } else {
        return false;
      }
    },
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
          console.log(response.data)
          this.extraData(response.data.user_id)
        })
        .catch(err => {
          if (err.response == null) {
            this.$snotify.error("Error de red. Inténtelo mas tarde.", "Error", {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
              });
          } else {
            if (err.response.data.single_authentication == "invalid credentials") {
              this.$snotify.error("Credenciales inválidas.", "Atención", {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
              });
              this.userCredentials.password = ""
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
              this.$snotify.error("Error de red. Inténtelo mas tarde.", "Error", {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
              });
            }
          }
        });
    },

    extraData(user_id) {
      auth.session
        .user_info(user_id)
        .then(response => {
          if (response.data.picture != null) auth.storage.setImage(response.data.picture.url)
          else auth.storage.setImage("http://placehold.it/30x30")
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
    },

    oauthSocial(provider){
      console.log(provider);
    }
  },
  created (){
    if (auth.storage.logged()) this.$router.push("/");
  },
  mounted () {
    let _this = this
    this.$nextTick(() => {
      window.fbAsyncInit = function () {
        FB.init({
          appId            : '366615240874673',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v3.3'
        })
        FB.AppEvents.logPageView()
        _this.FB = FB
        console.log('FB SDK was initialized as mixin')
      };
      (function (d, s, id) {
        let js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) { return }
        js = d.createElement(s); js.id = id
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
    })
}
};
</script>

<style scoped style lang="scss">
.loginComponent {
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
    background-color: #FFFFFF;
    box-shadow: 0 0 14px 0 rgba(20,20,20,0.3);
  }
  @media (max-width: 341px) {
    .btnLoginStyle {
      height: 75px !important;
    }
  }
  .btnLoginStyle {
    height: 50px;
    border-radius: 5px;
    border-color: #0E2469;
    background-color: #0E2469;
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
  .iniciar-sesion {
    height: 44px;
    color: #0E2469;
    font-size: 35px;
    font-weight: bold;
    line-height: 44px;
  }
  .input-title {
    height: 27px;
    color: #6A6A6A;
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