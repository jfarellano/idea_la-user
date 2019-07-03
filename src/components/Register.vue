<template>
  <div class="containter-fluid profile-container">
    <Header></Header>
    <div class="row justify-content-center align-items-center main-row">
      <div data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="100" class="col align-self-center profile-form">
        <div  class="row justify-content-center">
          <router-link to="/">
            <img src="../assets/CamaraBaq-Blue.svg" alt height="110px" class="iconImage">
          </router-link>
        </div>
        <div class="row title">
          <h2>Regístrate y ayuda a Barranquilla</h2>
        </div>
        <div class="row profile-pic justify-content-between align-items-center">
          <div class="col-md-4">
            <img v-if="userData.image != null" class="avatar" :src="getImage()">
            <img
              v-else-if="userData.image == null && userData.gender == 'male'"
              class="avatar"
              src="../assets/users/male.jpg"
            >
            <img
              v-else-if="userData.image == null && userData.gender == 'female'"
              class="avatar"
              src="../assets/users/female.jpg"
            >
            <img
              v-else-if="userData.image == null && userData.gender == 'other'"
              class="avatar"
              src="../assets/users/other.jpg"
            >
            <img v-else class="avatar" src="../assets/users/notsay.jpg">
          </div>
          <div class="col-md-8">
            <b-button
              @click="$refs.fileInput.$el.querySelector('input[type=file]').click()"
              class="loadBtn"
              v-if="userData.image == null"
            >Carga tu imagen</b-button>
            <b-button-group class="loadBtn" v-else>
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
              ref="fileInput"
              v-validate="'size:2000'"
              :class="{'has-error': errors.has('image_size')}"
              name="image"
            />
            <p v-if="userData.image != null" class="selectedImage">{{userData.image.name}}</p>
            <p
              v-if="errors.has('image')"
              class="incorrectInput"
            >La imagen es muy grande, el máximo son 2MB</p>
          </div>
        </div>
        <h5>Nombres</h5>
        <div class="input-group">
          <input
            type="text"
            class="form-control inputStyles"
            placeholder="ej. Juan"
            v-model="userData.name"
            maxlength="100"
            v-validate="'alpha_spaces|max:100|required'"
            :class="{'has-error': errors.has('name_invalid')}"
            name="name"
          >
        </div>
        <p
          v-if="errors.has('name')"
          class="incorrectInput"
        >Ups, creo que tienes una letra inválida en tu nombre</p>
        <h5>Apellidos</h5>
        <div class="input-group">
          <input
            type="text"
            class="form-control inputStyles"
            placeholder="ej. Perez"
            v-model="userData.lastname"
            maxlength="100"
            v-validate="'alpha_spaces|max:100|required'"
            :class="{'has-error': errors.has('lasname_invalid')}"
            name="lastname"
          >
        </div>
        <p
          v-if="errors.has('lastname')"
          class="incorrectInput"
        >Ups, creo que tienes una letra inválida en tu apellido</p>
        <h5>Correo electrónico</h5>
        <div class="input-group">
          <input
            type="email"
            class="form-control inputStyles"
            placeholder="ej. example@email.com"
            v-model="userData.email"
            maxlength="60"
            v-validate="'required|email|max:60'"
            :class="{'has-error': errors.has('email_invalid')}"
            name="email"
          >
        </div>
        <p
          v-if="errors.has('email')"
          class="incorrectInput"
        >Creo que ese correo no existe, revisemos de nuevo</p>
        <h5>Documento de identificación</h5>
        <div class="input-group">
          <input
            type="text"
            class="form-control inputStyles"
            placeholder="ej. 1234567890"
            maxlength="15"
            v-model="userData.cc"
            v-validate="'max:15|required|alpha_num'"
            :class="{'has-error': errors.has('cc_invalid')}"
            name="cc"
          >
        </div>
        <p
          v-if="errors.has('cc')"
          class="incorrectInput"
        >Es necesario que nos digas tu documento de identificación</p>
        <h5>Contraseña</h5>
        <div class="input-group">
          <input
            type="password"
            class="form-control inputStyles"
            v-model="userData.password"
            v-validate="{required: true, regex: /^(?=.*\d).(?=.*[a-zA-Z]).{6,50}$/i}"
            ref="password"
            :class="{'has-error': errors.has('pass_required')}"
            name="password"
            @keydown.space.prevent
          >
        </div>
        <p
          v-if="errors.has('password')"
          class="incorrectInput"
        >Tu contraseña no es muy segura, debe ser mínimo de 6 caracteres y debe contener por lo menos un número y una letra</p>
        <h5>Confirmar contraseña</h5>
        <p
          class="ex"
        >A ver, confiamos en tus métodos, pero para estar seguros escribe nuevamente tu contraseña.</p>
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
        >Creo que tu contraseña no coincide con la de arriba</p>
        <h5>Edad</h5>
        <p class="ex">Esto te va a parecer raro, pero necesitamos saber si eres mayor de edad.</p>
        <div class="input-group">
          <input
            type="text"
            class="form-control inputStyles"
            placeholder="ej. 20"
            v-model="userData.age"
            maxlength="3"
            v-validate="'max_value:125|required|min_value:18|numeric'"
            :class="{'has-error': errors.has('age_invalid')}"
            name="age"
          >
        </div>
        <p
          v-if="errors.has('age')"
          class="incorrectInput"
        >Wow, al parecer has vivido muchísimo o no eres mayor de edad, revisa nuevamente la edad en tu cédula y vuelve a intentarlo.</p>
        <h5>Género:</h5>
        <p class="ex">Sabemos que es una pregunta incómoda, pero ¿con qué género te identificas más?</p>
        <b-form-select
          class="mb-2 mr-sm-2 mb-sm-0 squareInput inputStyles minimal"
          :value="null"
          :options="{ 'male': 'Masculino', 'female': 'Femenino', 'other': 'Otro', 'i_prefer_not_to_say': 'Prefiero no decir'}"
          id="inline-form-custom-select-pref"
          v-model="userData.gender"
          v-validate="'required'"
          :class="{'has-error': errors.has('gender_invalid')}"
          name="gender"
        >
          <option slot="first" :value="null"></option>
        </b-form-select>
        <p v-if="errors.has('gender')" class="incorrectInput minimal">Selecciona tu género</p>
        <h5>Télefono</h5>
        <p class="ex">Tranquilo, no te vamos a llamar para venderte algo, sólo son datos.</p>
        <div class="input-group">
          <input
            type="text"
            class="form-control inputStyles"
            placeholder="ej. 300-123 4567"
            v-model="userData.phone"
            maxlength="16"
            v-validate="{required: true, regex: /^([+]?)[0-9]{1,15}$/mi}"
            :class="{'has-error': errors.has('phone_invalid')}"
            name="phone"
          >
        </div>
        <p
          v-if="errors.has('phone')"
          class="incorrectInput"
        >Revisa tu télefono, parece que algo no anda bien</p>
        <h5>Barrio</h5>
        <b-form-select
          class="mb-2 mr-sm-2 mb-sm-0 squareInput inputStyles minimal"
          :value="null"
          id="inline-form-custom-select-pref"
          v-model="hood"
          v-validate="'required'"
          :class="{'has-error': errors.has('hood_invalid')}"
          name="hood"
          @change="switchView()"
        >
          <option slot="first" :value="null"></option>
          <option
            v-for="(location, index) in locations"
            :value="location"
            :key="index"
          >{{ upcase(location.name) }}</option>
        </b-form-select>
        <p v-if="errors.has('hood')" class="incorrectInput">Cuéntanos tu barrio</p>
        <h5>Localidad</h5>
        <p
          class="ex"
        >Sólo tienes que elegir el barrio en el que vives, del resto nos encargamos nosotros.</p>
        <div class="input-group">
          <input type="text" class="form-control inputStyles" disabled v-model="locationAuto">
        </div>
        <b-form-checkbox
          id="checkbox-1"
          v-model="userData.terms"
          name="terms"
          value="accepted"
          unchecked-value="not_accepted"
        >Acepto los <a href="/#/terms" target="_blank">términos y condiciones</a></b-form-checkbox>

        <b-button
          class="btn btn-primary btn-lg btn-block col"
          id="btnRegisterStyle"
          :disabled="!registerCheckFormData()"
          v-on:click.prevent="userRegister()"
        >Registrar</b-button>
        <router-link
          tag="b-button"
          to="/login"
          class="btn btn-primary btn-lg btn-block col cancel"
        >Cancelar</router-link>
      </div>
    </div>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import api from "../requests.js";
import auth from "../authentication.js";
import Alert from "./Alert.vue";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      userData: {},
      locations: [],
      chosedHood: "",
      hood: {},
      locationAuto: "",
      indexChosedChallenge: "",
      userCredentials: {},
      active: true
    };
  },
  components: {
    Alert
  },
  methods: {
    clearImage() {
      this.userData.image = null;
    },
    registerCheckFormData() {
      if (this.errors.items == null) return false;
      let emailField = this.userData.email;
      let passwordField = this.userData.password;
      let ccField = this.userData.cc;
      let phoneField = this.userData.phone;
      let nameField = this.userData.name;
      let lastnameField = this.userData.lastname;
      let ageField = this.userData.age;
      let genderField = this.userData.gender;
      let location = this.userData.location_id;
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
        location == "" ||
        emailField == null ||
        passwordField == null ||
        ccField == null ||
        phoneField == null ||
        nameField == null ||
        lastnameField == null ||
        ageField == null ||
        genderField == null ||
        location == null ||
        !this.active ||
        this.errors.items.length != 0 ||
        this.userData.terms != 'accepted'
      ) {
        return false;
      } else {
        return true;
      }
    },
    userRegister() {
      this.active = false;
      var fd = new FormData();
      fd.append("email", this.userData.email);
      fd.append("password", this.userData.password);
      fd.append("cc", this.userData.cc);
      fd.append("phone", this.userData.phone);
      fd.append("name", this.userData.name);
      fd.append("lastname", this.userData.lastname);
      fd.append("age", this.userData.age);
      fd.append("gender", this.userData.gender);
      if (this.userData.image != null) fd.append("image", this.userData.image);
      fd.append("location_id", this.userData.location_id);
      api.user
        .create(fd)
        .then(() => {
          auth.session
            .login({
              email: this.userData.email,
              password: this.userData.password
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
              this.$router.push("/");
            });
        })
        .catch((err) => {
          setTimeout(() => {
            this.active = true;
          }, 1000);
          let errs = err.response.data
          Object.entries(errs).map(([key, value]) => {
            if (key == 'cc') this.$refs.alert.error(
            "Lo sentimos ya existe un usuario con tu cedula"
          );
            else if (key == 'email') this.$refs.alert.error(
            "Lo sentimos ya existe un usuario con tu correo electronico"
          );
            else this.$refs.alert.error(
            "Hubo un error creando tu cuenta, intenta de nuevo más tarde"
          );
          })
        });
    },
    getLocations() {
      api.variable.locations().then(response => {
        this.locations = response.data;
      });
    },
    switchView() {
      this.userData.location_id = this.hood.id;
      this.locationAuto = this.upcase(this.hood.hood.replace(/_/g, " "));
    },
    upcase(str) {
      return api.utils.upcase(str);
    },
    getImage() {
      return URL.createObjectURL(this.userData.image);
    }
  },
  created() {
    this.getLocations();
  }
};
</script>

<style lang="scss" scoped>
.profile-container {
  min-height: 100vh;
  background-color: #0e2469;
  overflow-x: hidden;
  .profile-pic {
    text-align: center;
  }
  select.minimal {
    background-image: linear-gradient(45deg, transparent 50%, #0e2469 50%),
      linear-gradient(135deg, #0e2469 50%, transparent 50%);
    background-position: calc(100% - 15px) calc(1em + 2px),
      calc(100% - 5px) calc(1em + 2px), 0.5em;
    background-size: 10px 10px, 10px 10px, 1px 1.5em;
    background-repeat: no-repeat;
  }
  .profile-form {
    border: none;
    border-radius: 5px;
    max-width: 800px;
    width: 100%;
    background-color: white;
    margin: 20px;
    padding: 40px 20px;
    .cancel {
      height: 50px;
      border-radius: 5px;
      border: solid 1px #0e2469;
      background-color: transparent;
      color: #0e2469;
      margin-top: 17px;
      margin-bottom: 17px;
    }
  }
  .main-row {
    height: 100%;
    min-height: 100vh;
  }
  .title {
    text-align: center;
    h2 {
      width: 100%;
    }
  }
  h2 {
    padding-left: 15px;
    @media (max-width: 800px) {
      font-size: 20px;
    }
  }
  h5 {
    margin-bottom: 0px;
    margin-top: 3px;
    font-size: 17px;
    font-weight: 300;
    color: #6a6a6a;
    &::after {
      content: "*";
      color: red;
    }
  }
  .ex {
    font-size: 15px;
    color: #9a9a9a;
    margin-bottom: 3px;
  }
  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 10px;
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
  }
  .selectedImage {
    color: #6a6a6a;
    font-size: 12px;
    margin: 0px;
  }
  .iconImage {
    height: 80px;
    margin-bottom: 15px;
    text-align: center;
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
    margin-top: 10px;
  }
  #cancel {
    border: 1px #0e2469 solid;
    background-color: transparent;
    border-radius: 5px;
    color: #0e2469;
    margin-top: 10px;
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
