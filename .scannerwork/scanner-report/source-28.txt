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
              <div class="col">
                <h5>Correo electrónico</h5>
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control inputStyles"
                    placeholder="ej. example@email.com"
                    v-model="userData.email"
                  >
                </div>
                <div class="divSeparator"></div>
                <h5>Contraseña</h5>
                <div class="input-group">
                  <input
                    type="password"
                    class="form-control inputStyles"
                    v-model="userData.password"
                  >
                </div>
                <h5>Confirmar contraseña</h5>
                <div class="input-group">
                  <input
                    type="password"
                    class="form-control inputStyles"
                    v-model="userData.password_confirm"
                  >
                </div>
              </div>
              <div class="col-sm">
                <h5>Nombre</h5>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control inputStyles"
                    placeholder="ej. Juan"
                    v-model="userData.name"
                  >
                </div>
                <div class="divSeparator"></div>
                <h5>Apellido</h5>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control inputStyles"
                    placeholder="ej. Perez"
                    v-model="userData.lastname"
                  >
                </div>
                <div class="divSeparator"></div>
                <h5>Cédula</h5>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control inputStyles"
                    placeholder="ej. 1234567890"
                    v-model="userData.cc"
                  >
                </div>
                <div class="divSeparator"></div>
                <h5>Edad</h5>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control inputStyles"
                    placeholder="ej. 20"
                    v-model="userData.age"
                  >
                </div>
              </div>
              <div class="col-sm">
                <h5>Género</h5>
                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0 squareInput"
                  :value="null"
                  :options="{ 'male': 'Masculino', 'female': 'Femenino', 'other': 'Otro'}"
                  id="inline-form-custom-select-pref"
                  v-model="userData.gender"
                >
                  <option slot="first" :value="null"></option>
                </b-form-select>
                <div class="divSeparator"></div>
                <h5>Télefono</h5>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control inputStyles"
                    placeholder="ej. 300-123 4567"
                    v-model="userData.phone"
                  >
                </div>
                <div class="divSeparator"></div>
                <h5>Barrio</h5>

                <select
                  class="form-control"
                  id="pickerStyle"
                  @change="switchView($event)"
                  v-model="indexChosedHood"
                >
                  <option
                    v-for="(location, index) in locations"
                    v-bind:value="location.id"
                    :key="index"
                  >{{ location.name }}</option>
                </select>
                <div class="divSeparator"></div>
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

            <div class="divSeparator"></div>
            <div class="divSeparator"></div>

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

    <!-- MODAL -->
    <b-modal
      id="modal-scrollable"
      centered
      title="Priorización de Retos"
      cancel-variant="ok"
      cancel-title
      class="modalStyle"
      ok-disabled
    >
      <p
        class="parag"
      >Por favor priorice según su criterio los siguientes retos de mayor a menor relevancia.</p>
      <ol>
        <div v-for="(challenge, index3) in challenges" :key="index3">
          <li class="dropdownItemStyle">
            <div class="form-group">
              <!--  -->
              <!-- <select class="form-control" id="pickerStyle" @change="switchView($event)" v-model="indexChosedHood">
                <option v-for="(location, index) in locations" v-bind:value="location.id" :key="index"> {{ location.name }} </option>
              </select>-->
              <!--  -->
              <select class="form-control" id="pickerStyle" v-model="surveyResult[index3]">
                <option
                  v-for="(challengeItem, index2) in challenges"
                  :key="index2"
                  v-bind:value="challengeItem.id"
                >{{ challengeItem.title }}</option>
              </select>
            </div>
          </li>
        </div>
      </ol>
      <div class="row justify-content-center">
        <b-button
          type="button"
          class="btn btn-primary btn-mg btn-block"
          id="btnRegisterStyle"
          v-on:click.prevent="sendForm()"
        >Aceptar</b-button>
      </div>
    </b-modal>

    <b-modal id="modalPopover" title="Error" ok-only>
      <p class="parag">Por favor asegúrese de llenar todos los campos con su información.</p>
    </b-modal>
  </div>
</template>

<script>
import auth from "../authentication.js";
import api from "../requests.js";

export default {
  data() {
    return {
      challenges: [],
      challengesCopy: [],
      pickedChal: "",
      userData: {},
      locations: [],
      chosedHood: "",
      indexChosedHood: "",
      locationAuto: "",
      indexChosedChallenge: "",
      surveyResult: [],
      userCookie: {},
      userCredentials: {}
    };
  },
  methods: {
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
        genderField == ""
      ) {
        this.$bvModal.show("modalPopover");
      } else {
        api.challenges
          .index()
          .then(response => {
            this.challenges = response.data;
            this.userRegister();
            setTimeout(() => this.$bvModal.show("modal-scrollable"), 500);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    userRegister() {
      api.user
        .create({
          email: this.userData.email,
          password: this.userData.password,
          cc: this.userData.cc,
          phone: this.userData.phone,
          name: this.userData.name,
          lastname: this.userData.lastname,
          age: this.userData.age,
          gender: this.userData.gender,
          picture: this.userData.picture,
          location_id: this.indexChosedHood
        })
        .then(response => {
          console.log("Exito");
        })
        .catch(err => {});
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
    },
    onChangeChallenge(event) {
      console.log(JSON.stringify(event.target));
    },
    sendForm() {
      setTimeout(() => this.$router.push("/login"), 500);
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
  h2{
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
  .divSeparator {
    height: 13px;
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
    @media (max-width: 800px) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  .inputStyles {
    border: 1px solid #dcdcdc;
    border-radius: 5px;
  }
  .lineDivider {
    border-left: 2px solid #888888;
    height: 300px;
    margin-left: 20px;
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
    font-size: 21px;
    font-weight: 300;
    color: #dddddd;
  }

  :-moz-placeholder {
    font-size: 21px;
    font-weight: 300;
    color: #dddddd;
  }

  ::-moz-placeholder {
    font-size: 21px;
    font-weight: 300;
    color: #dddddd;
  }

  :-ms-input-placeholder {
    font-size: 21px;
    font-weight: 300;
    color: #dddddd;
  }
}
</style>