<template>
  <!-- MODAL -->
  <div class="main-container">
    <b-modal
      id="complete-profile"
      centered
      scrollable
      title="Completa tu perfil"
      hide-footer
      hide-header-close
      @hide="prevent"
    >
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
      <p v-if="errors.has('cc')" class="incorrectInput">Documento de identificación invalido</p>
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
        <input type="text" class="form-control inputStyles" disabled v-model="locationAuto">
      </div>
    </b-modal>
    <b-button @click="open()">Open</b-button>
  </div>
</template>

<script>
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
      saved: false
    };
  },
  methods: {
    open() {
      this.$bvModal.show("complete-profile");
    },
    prevent(bvModalEvt) {
      if (this.saved) {
        this.$bvModal.hide("complete-profile");
      } else {
        bvModalEvt.preventDefault();
      }
    },
    save() {
      console.log("guardado");
      this.saved = true;
      this.$bvModal.hide("complete-profile");
    },
    switchView(event) {
      var i = this.indexChosedHood;
      this.userData.location_id = this.indexChosedHood;
      this.locationAuto = this.locations[i].hood;
    }
  },
  created() {
    api.variable.locations().then(response => {
      this.locations = response.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.challenge {
  width: 100%;
  margin-bottom: 7px;
  background-color: #0e2469;
  color: white;
}
.clear {
  width: 100%;
  margin-bottom: 7px;
  background-color: transparent;
  border: solid 1px #0e2469;
  color: #0e2469;
}
.selectedImage {
  color: #6a6a6a;
  font-size: 12px;
  margin: 0px;
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
.incorrectInput {
  color: red;
  font-size: 12px;
  margin: 0px;
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
</style>

