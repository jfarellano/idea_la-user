<template>
  <div class="registerComponent">
    <div id="divStyle" class="container-fluid">
      <div id="rowStyle" class="row align-items-center">
        <div class="col align-self-center">
          <div
            class="fieldsContainer"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="10"
          >
            <div class="row justify-content-start">
              <router-link to="/">
                <img src="../assets/CamaraBaq-Blue.svg" alt height="110px" class="iconImage">
              </router-link>
            </div>
            <div class="row justify-content-start">
              <h2 class="title">Registro nuevo usuario</h2>
            </div>
            <div class="space"></div>
            <div class="row justify-content-between">
              <div class="col-md">
                <h5>Correo electrónico</h5>
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control inputStyles"
                    placeholder="ej. example@email.com"
                    v-model="userData.email"
                    v-validate="'required|email'"
                    :class="{'has-error': errors.has('email_invalid')}"
                    name="email"
                  >
                </div>
                <p
                  v-if="errors.has('email')"
                  class="incorrectInput"
                >El correo ingresado no es válido.</p>

                <h5>Contraseña</h5>
                <div class="input-group">
                  <input
                    type="password"
                    class="form-control inputStyles"
                    v-model="userData.password"
                    v-validate="'required'"
                    ref="password"
                    :class="{'has-error': errors.has('pass_required')}"
                    name="password"
                  >
                </div>
                <p v-if="errors.has('password')" class="incorrectInput">La contraseña es necesaria</p>
                <h5>Confirmar contraseña</h5>
                <div class="input-group">
                  <input
                    type="password"
                    class="form-control inputStyles"
                    v-model="userData.password_confirm"
                    v-validate="'required|confirmed:password'"
                    :class="{'has-error': errors.has('pass_confirmed')}"
                    name="password_conf"
                  >
                </div>
                <p
                  v-if="errors.has('password_conf')"
                  class="incorrectInput"
                >La contraseña no coincide</p>
                <h5>Imagen de perfil</h5>
                <b-button
                  @click="$refs.fileInput.$el.querySelector('input[type=file]').click()"
                  class="loadBtn"
                  v-if="userData.image == null"
                >Carga tu imagen</b-button>
                <b-button-group class="loadBtn" v-if="userData.image != null">
                  <b-button
                    class="text"
                    @click="$refs.fileInput.$el.querySelector('input[type=file]').click()"
                  >Cambia tu imagen</b-button>
                  <b-button class="icon" @click="clearImage()">
                    <font-awesome-icon icon="times"></font-awesome-icon>
                  </b-button>
                </b-button-group>
                <b-form-file
                  v-model="userData.image"
                  accept="image/jpeg, image/png"
                  style="display:none;"
                  @change="checkSize()"
                  ref="fileInput"
                  v-validate="'size:2000'"
                  :class="{'has-error': errors.has('image_size')}"
                  name="image"
                />
                <p v-if="userData.image != null" class="selectedImage">{{userData.image.name}}</p>
                <p
                  v-if="errors.has('image')"
                  class="incorrectInput"
                >La imagen es muy grande, el maximo son 2MB</p>
              </div>
              <div class="col-md">
                <h5>Nombre</h5>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control inputStyles"
                    placeholder="ej. Juan"
                    v-model="userData.name"
                    v-validate="'alpha_spaces|max:50|required'"
                    :class="{'has-error': errors.has('name_invalid')}"
                    name="name"
                  >
                </div>
                <p v-if="errors.has('name')" class="incorrectInput">Nombre invalido</p>
                <h5>Apellido</h5>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control inputStyles"
                    placeholder="ej. Perez"
                    v-model="userData.lastname"
                    v-validate="'alpha_spaces|max:50|required'"
                    :class="{'has-error': errors.has('lasname_invalid')}"
                    name="lastname"
                  >
                </div>
                <p v-if="errors.has('lastname')" class="incorrectInput">Apellido invalido</p>
                <h5>Documento de identificación</h5>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control inputStyles"
                    placeholder="ej. 1234567890"
                    v-model="userData.cc"
                    v-validate="'max:15|required|alpha_num'"
                    :class="{'has-error': errors.has('cc_invalid')}"
                    name="cc"
                  >
                </div>
                <p
                  v-if="errors.has('cc')"
                  class="incorrectInput"
                >Documento de identificación invalido</p>
                <h5>Edad</h5>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control inputStyles"
                    placeholder="ej. 20"
                    v-model="userData.age"
                    v-validate="'max:3|required|min_value:1'"
                    :class="{'has-error': errors.has('age_invalid')}"
                    name="age"
                  >
                </div>
                <p v-if="errors.has('age')" class="incorrectInput">Edad invalida</p>
              </div>
              <div class="col-md">
                <h5>Género</h5>
                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0 squareInput inputStyles"
                  :value="null"
                  :options="{ 'male': 'Masculino', 'female': 'Femenino', 'other': 'Otro'}"
                  id="inline-form-custom-select-pref"
                  v-model="userData.gender"
                  v-validate="'required'"
                  :class="{'has-error': errors.has('gender_invalid')}"
                  name="gender"
                >
                  <option slot="first" :value="null"></option>
                </b-form-select>
                <p v-if="errors.has('gender')" class="incorrectInput">Selecciona tu género</p>
                <h5>Télefono</h5>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control inputStyles"
                    placeholder="ej. 300-123 4567"
                    v-model="userData.phone"
                    v-validate="'required'"
                    :class="{'has-error': errors.has('phone_invalid')}"
                    name="phone"
                  >
                </div>
                <p v-if="errors.has('phone')" class="incorrectInput">Telefono invalido</p>
                <h5>Barrio</h5>
                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0 squareInput inputStyles"
                  :value="null"
                  id="inline-form-custom-select-pref"
                  v-model="indexChosedHood"
                  v-validate="'required'"
                  :class="{'has-error': errors.has('hood_invalid')}"
                  name="hood"
                  @change="switchView($event)"
                >
                  <option slot="first" :value="null"></option>
                  <option
                    v-for="(location, index) in locations"
                    :value="location.id"
                    :key="index"
                  >{{ location.name }}</option>
                </b-form-select>
                <p v-if="errors.has('hood')" class="incorrectInput">Selecciona tu barrio</p>
                <h5>Localidad</h5>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control inputStyles"
                    disabled
                    v-model="locationAuto"
                  >
                </div>
              </div>
            </div>

            <div class="spacer">
              <div class="row justify-content-end">
                <b-button
                  type="button"
                  class="btn btn-primary btn-lg btn-block"
                  id="btnRegisterStyle"
                  v-on:click.prevent="registerCheckFormData()"
                >Registrar</b-button>
              </div>
              <div class="row justify-content-end">
                <p class="parag" id="registerStyle">
                  ¿Ya tienes una cuenta?
                  <router-link to="/login">Ingresa aquí.</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import auth from "../authentication.js";
import api from "../requests.js";

export default {
  data() {
    return {
      userData: {},
      locations: [],
      chosedHood: "",
      indexChosedHood: "",
      locationAuto: "",
      indexChosedChallenge: "",
      userCredentials: {}
    };
  },
  methods: {
    clearImage() {
      this.userData.image = null;
    },
    registerCheckFormData() {
      var emailField = this.userData.email;
      var passwordField = this.userData.password;
      var ccField = this.userData.cc;
      var phoneField = this.userData.phone;
      var nameField = this.userData.name;
      var lastnameField = this.userData.lastname;
      var ageField = this.userData.age;
      var genderField = this.userData.gender;
      if (
        emailField == "" ||
        passwordField == "" ||
        ccField == "" ||
        phoneField == "" ||
        nameField == "" ||
        lastnameField == "" ||
        ageField == "" ||
        genderField == "" ||
        emailField == "" ||
        passwordField == null ||
        ccField == null ||
        phoneField == null ||
        nameField == null ||
        lastnameField == null ||
        ageField == null ||
        genderField == null
      ) {
        this.$snotify.error(
          "Diligencia correctamente el formulario",
          "Atención",
          {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          }
        );
      } else {
        this.userRegister();
      }
    },
    userRegister() {
      var fd = new FormData();
      fd.append("email", this.userData.email);
      fd.append("password", this.userData.password);
      fd.append("cc", this.userData.cc);
      fd.append("phone", this.userData.phone);
      fd.append("name", this.userData.name);
      fd.append("lastname", this.userData.lastname);
      fd.append("age", this.userData.age);
      fd.append("gender", this.userData.gender);
      fd.append("image", this.userData.image);
      fd.append("location_id", this.userData.location_id);
      api.user
        .create(fd)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err.response);
          this.$snotify.error("Hubo un error creando tu cuenta", "Atención", {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        });
    },
    getLocations() {
      api.variable.locations().then(response => {
        this.locations = response.data;
      });
    },
    switchView(event) {
      var i = this.indexChosedHood;
      this.userData.location_id = this.indexChosedHood;
      this.locationAuto = this.locations[i].hood;
    }
  },
  created() {
    this.getLocations();
  }
};
</script>

<style scoped style lang="scss">
.registerComponent {
  // height: 100%;
  text-align: center;
  background-color: #0e2469;
  h2 {
    padding-left: 15px;
    @media (max-width: 800px) {
      font-size: 20px;
    }
  }
  h5 {
    margin-bottom: 2px;
    font-size: 17px;
    font-weight: 300;
    color: #6a6a6a;
  }
  .space {
    height: 20px;
  }
  .title {
    color: #0e2469;
  }
  #divStyle {
    min-height: 100vh;
  }
  #rowStyle {
    min-height: 100vh;
    height: 100%;
  }
  .loadBtn {
    border: 1px solid #0e2469;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 #ffffff;
    background-color: transparent;
    // width: 27.85%;
    width: 100%;
    height: 50px;
    font-size: 17px;
    color: #0e2469;
    &:focus {
      border: 2px solid #0e2469;
    }
    .text {
      background-color: transparent;
      color: #0e2469;
      border: 0px;
    }
    .icon {
      background-color: #ff0000;
      color: white;
      border: 0px;
      z-index: 0;
    }
  }
  .selectedImage {
    color: #6a6a6a;
    font-size: 12px;
    margin: 0px;
  }
  .iconImage {
    height: 54px;
    margin-bottom: 15px;
    padding-left: 15px;
  }
  @media (max-width: 800px) {
    .fieldsContainer {
      max-width: 90% !important;
      margin-top: 20px !important;
      margin-bottom: 20px !important;
    }
    .dropdownItemStyle {
      margin-bottom: 13px;
      margin-right: 13px;
    }
  }
  .fieldsContainer {
    background-color: white;
    border-radius: 6px;
    text-align: left;
    padding: 25px;
    padding-left: 60px;
    padding-right: 60px;
    margin: auto;
    max-width: 952px;
  }
  #btnRegisterStyle {
    background-color: #0e2469;
    border-radius: 5px;
    color: white;
    max-width: 33%;
    @media (max-width: 800px) {
      max-width: 100% !important;
    }
  }
  .spacer {
    padding-top: 10px;
    @media (max-width: 800px) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  .custom-file {
    border: 1px solid #0e2469;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 #ffffff;
    font-size: 17px;
    color: #0e2469;
    &:focus {
      border: 2px solid #0e2469;
    }
    .custom-file-input {
      height: 100% !important;
    }
    .custom-file-label {
      padding: 0.75rem;
      font-size: 17px;
      font-weight: 300;
      color: #dddddd;
      height: 100% !important;
      &::after {
        padding: 0.75rem !important;
        height: 100% !important;
      }
    }
  }

  .inputStyles {
    border: 1px solid #0e2469;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 #ffffff;
    // width: 27.85%;
    height: 50px;
    font-size: 17px;
    color: #0e2469;
    &:focus {
      border: 2px solid #0e2469;
    }
  }
  .lineDivider {
    border-left: 2px solid #888888;
    height: 300px;
    margin-left: 20px;
  }
  .incorrectInput {
    color: red;
    font-size: 12px;
    margin: 0px;
  }
  .modalStyle {
    text-align: left;
  }
  #pickerStyle {
    max-width: 350px;
    margin-left: 15px;
  }
  #registerStyle {
    font-size: 15px;
    font-weight: 300;
    color: #9a9a9a;
    a {
      color: #0e2469;
    }
  }
  ::-webkit-input-placeholder {
    font-size: 17px;
    font-weight: 300;
    color: #dddddd;
  }

  :-moz-placeholder {
    font-size: 17px;
    font-weight: 300;
    color: #dddddd;
  }

  ::-moz-placeholder {
    font-size: 17px;
    font-weight: 300;
    color: #dddddd;
  }

  :-ms-input-placeholder {
    font-size: 17px;
    font-weight: 300;
    color: #dddddd;
  }
}
</style>