<template>
  <div class="containter-fluid profile-container">
    <Header></Header>
    <div class="row justify-content-center align-items-center main-row">
      <div class="col align-self-center profile-form">
        <div class="row title">
          <h2>Mi perfil</h2>
        </div>
        <div class="row profile-pic justify-content-between align-items-center">
          <div class="col-md-4">
            <b-img rounded="circle" class="avatar img-responsive" :src="getImage()"/>
          </div>
          <div class="col-md-8">
            <b-button
              @click="$refs.fileInput.$el.querySelector('input[type=file]').click()"
              class="loadBtn"
              v-if="userData.picture == null"
            >Carga tu imagen</b-button>
            <b-button-group class="loadBtn" v-else>
              <b-button
                class="text"
                @click="$refs.fileInput.$el.querySelector('input[type=file]').click()"
              >Cambia tu imagen</b-button>
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
            >La imagen es muy grande, el máximo son 2MB</p>
          </div>
        </div>
        <h5>Correo electrónico</h5>
        <div class="input-group">
          <input
            type="email"
            class="form-control inputStyles"
            placeholder="ej. example@email.com"
            v-model="userData.email"
            disabled
            name="email"
          >
        </div>
        <h5>Nombre</h5>
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
        <p v-if="errors.has('name')" class="incorrectInput">Nombre inválido</p>
        <h5>Apellido</h5>
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
        <p v-if="errors.has('lastname')" class="incorrectInput">Apellido inválido</p>
        <h5>Documento de identificación</h5>
        <div class="input-group">
          <input
            type="text"
            class="form-control inputStyles"
            v-model="userData.cc"
            name="cc"
            disabled
          >
        </div>
        <h5>Edad</h5>
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
        <p v-if="errors.has('age')" class="incorrectInput">Edad inválida</p>
        <h5>Género</h5>
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
        <p v-if="errors.has('gender')" class="incorrectInput">Selecciona tu género</p>
        <h5>Télefono</h5>
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
        <p v-if="errors.has('phone')" class="incorrectInput">Teléfono inválido</p>
        <b-button
          type="button"
          class="btn btn-primary btn-lg btn-block"
          id="btnRegisterStyle"
          :disabled="save()"
          v-on:click.prevent="userSave()"
        >Guardar</b-button>
        <b-button
          type="button"
          class="btn btn-primary btn-lg btn-block cancel"
          id="cancel"
          v-on:click.prevent="cancel()"
        >Cancelar</b-button>
      </div>
    </div>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import api from "../requests.js";
import auth from "../authentication.js";
import Alert from "./Alert.vue";
import Header from "./Header.vue";
export default {
  data() {
    return {
      userData: {}
    };
  },
  components: {
    Alert,
    Header
  },
  methods: {
    save() {
      var emailField = this.userData.email;
      var ccField = this.userData.cc;
      var phoneField = this.userData.phone;
      var nameField = this.userData.name;
      var lastnameField = this.userData.lastname;
      var ageField = this.userData.age;
      var genderField = this.userData.gender;
      if (
        emailField == "" ||
        ccField == "" ||
        phoneField == "" ||
        nameField == "" ||
        lastnameField == "" ||
        ageField == "" ||
        genderField == "" ||
        emailField == "" ||
        ccField == null ||
        phoneField == null ||
        nameField == null ||
        lastnameField == null ||
        ageField == null ||
        genderField == null || this.errors.items.length != 0
      ) {
        return true
      } else {
        return false
      }
    },
    userSave() {
      var fd = new FormData();
      fd.append("email", this.userData.email);
      fd.append("cc", this.userData.cc);
      fd.append("phone", this.userData.phone);
      fd.append("name", this.userData.name);
      fd.append("lastname", this.userData.lastname);
      fd.append("age", this.userData.age);
      fd.append("gender", this.userData.gender);
      if (this.userData.image != null) fd.append("image", this.userData.image);
      api.user
        .update(this.userData.id, fd)
        .then(() => {
          this.$refs.alert.success('Tu información ha sido actualizada')
          this.getUser()
        })
        .catch(() => {
          this.$refs.alert.error(
            "Hubo un error actualizando tu información, intenta de nuevo mas tarde"
          );
        });
    },
    upcase(str) {
      return api.utils.upcase(str);
    },
    getImage() {
      if (this.userData.image == null) {
        if (typeof this.userData.picture == 'string') return this.userData.picture;
        else return this.userData.picture.url;
      } else return URL.createObjectURL(this.userData.image);
    },
    getUser() {
      api.user
        .show(auth.storage.get("user_id"))
        .then(response => {
          this.userData = response.data;
        })
        .catch(() => {
          this.$refs.aletr.error(
            "Hubo un error encontrando tu información, por favor intenta de nuevo"
          );
        });
    },
    cancel(){
      this.$router.push('/')
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style lang="scss" scoped>
.profile-container {
  min-height: 100vh;
  background-color: #c4c4c4;
  overflow-x: hidden;
  .profile-pic {
    text-align: center;
  }
  .profile-form {
    border: none;
    border-radius: 5px;
    max-width: 800px;
    width: 100%;
    background-color: white;
    margin: 20px;
    padding: 40px 20px;
  }
  .main-row {
    margin-top: 100px;
    height: 100%;
    min-height: 100vh;
  }
  select.minimal {
    background-image: linear-gradient(45deg, transparent 50%, #0e2469 50%),
      linear-gradient(135deg,#0e2469 50%, transparent 50%);
    background-position: calc(100% - 15px) calc(1em + 2px),
      calc(100% - 5px) calc(1em + 2px), 0.5em;
    background-size: 10px 10px, 10px 10px, 1px 1.5em;
    background-repeat: no-repeat;
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
    margin-bottom: 2px;
    font-size: 17px;
    font-weight: 300;
    color: #6a6a6a;
    &::after {
      content: "*";
      color: red;
    }
  }
  .avatar {
    width: 150px;
    height: 150px;
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
