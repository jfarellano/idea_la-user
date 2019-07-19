<template>
  <div class="createEditIdeaComponent">
    <Header></Header>

    <div data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="100" class="container-fluid idea-create">
      <div class="row justify-content-center">
        <h1 class="title titleStyle">Postula tu idea</h1>
      </div>
      <div class="container-fluid form">
        <div class="row idea-image justify-content-center align-items-center">
          <div class="col align-self-center">
            <img v-if="idea.image != null" class="avatar" :src="getImage()">
            <img v-else-if="idea.image == null" class="avatar" src="../assets/group.svg">
          </div>
        </div>
        <div class="row">
          <div class="col">
            <b-button
              @click="$refs.fileInput.$el.querySelector('input[type=file]').click()"
              class="loadBtn"
              v-if="hasPic(idea.idea_pictures)"
            >Carga tu imagen</b-button>
            <b-button-group class="loadBtn" v-else>
              <b-button
                class="text"
                @click="$refs.fileInput.$el.querySelector('input[type=file]').click()"
              >Cambia tu imagen</b-button>
            </b-button-group>
            <b-form-file
              v-model="idea.image"
              accept="image/jpeg, image/png"
              style="display:none;"
              ref="fileInput"
              v-validate="'size:2000'"
              :class="{'has-error': errors.has('image_size')}"
              name="image"
            />
            <p v-if="idea.image != null" class="selectedImage">{{idea.image.name}}</p>
            <p
              v-if="errors.has('image')"
              class="incorrectInput"
            >La imagen es muy grande, el máximo son 2MB</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="req">Nombre de tu idea</h5>
            <div class="input-group">
              <input
                type="text"
                class="form-control inputStyles"
                placeholder="ej. Mi idea"
                v-model="idea.title"
                v-validate="'max:50|required'"
                :class="{'has-error': errors.has('title_invalid')}"
                name="title"
              >
            </div>
            <p
              v-if="errors.has('title')"
              class="incorrectInput"
            >El nombre lo necesitamos y debe ser máximo de 50 caracteres</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="req">Cuéntanos sobre tu idea</h5>
            <div class="input-group">
              <b-form-textarea
                rows="7"
                max-rows="10"
                class="form-control inputStyles"
                placeholder="Describe tu idea en 1000 caracteres"
                v-model="idea.description"
                v-validate="'required|min:400|max:1000'"
                :class="{'has-error': errors.has('description_invalid')}"
                name="description"
              ></b-form-textarea>
            </div>
            <p
              v-if="errors.has('description')"
              class="incorrectInput"
            >Cuéntanos un poco más acerca de tu idea, recuerda debe ser mínimo de 400 caracteres y máximo de 1500</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="req">¿Qué impacto positivo tiene o tendría tu idea en tu comunidad?</h5>
            <div class="input-group">
              <b-form-textarea
                rows="7"
                max-rows="10"
                class="form-control inputStyles"
                placeholder="Describe cuáles serían las mejoras ambientales o sociales en 500 caracteres"
                v-model="idea.impact"
                v-validate="'required|max:500'"
                :class="{'has-error': errors.has('impact_invalid')}"
                name="impact"
              ></b-form-textarea>
            </div>
            <p
              v-if="errors.has('impact')"
              class="incorrectInput"
            >Queremos saber cuál es el impacto de tu idea, asegúrate que sea de 500 caracteres o menos</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div v-if="!edit">
              <h5 class="req">¿En qué etapa de implementación está tu idea?</h5>
              <b-form-select
                class="mb-2 mr-sm-2 mb-sm-0 squareInput inputStyles"
                :value="null"
                :options="{'Tenemos una idea que aún no desarrollamos': 'Tenemos una idea que aún no desarrollamos',
                  'Tenemos una idea que ya validamos con usuarios': 'Tenemos una idea que ya validamos con usuarios',
                  'Hemos implementado un prototipo de esta idea': 'Hemos implementado un prototipo de esta idea',
                  'Ya tenemos el proyecto en marcha': 'Ya tenemos el proyecto en marcha'
                }"
                id="inline-form-custom-select-pref"
                v-model="idea.implementation"
                v-validate="'required'"
                :class="{'has-error': errors.has('implementation_invalid')}"
                name="implementation"
              >
                <option slot="first" :value="null"></option>
              </b-form-select>
              <p v-if="errors.has('implementation')" class="incorrectInput">Cuentanos en que etapa está tu idea</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="req">Problema que resuelve tu idea</h5>
            <div class="input-group">
              <b-form-textarea
                rows="7"
                max-rows="10"
                class="form-control inputStyles"
                placeholder="Tienes 200 caracteres para responder"
                v-model="idea.problem"
                v-validate="'required|max:200'"
                :class="{'has-error': errors.has('problem_invalid')}"
                name="problem"
              ></b-form-textarea>
            </div>
            <p
              v-if="errors.has('problem')"
              class="incorrectInput"
            >Cuéntanos qué problema resuelve tu idea, asegúrate que sea de 200 caracteres o menos</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5>Cuéntanos quién más hace parte de tu equipo</h5>
            <div class="input-group">
              <input
                type="text"
                class="form-control inputStyles"
                placeholder="Escribe el correo electrónico de cada uno (máximo 5), separa con comas(,) cada correo"
                v-model="idea.companions"
                v-validate="'max:300'"
                maxlength="300"
                :class="{'has-error': errors.has('companions_invalid')}"
                name="companions"
              >
            </div>
            <p
              v-if="errors.has('companions')"
              class="incorrectInput"
            >Están un poco largos los correos de tus compañeros, todos deben tener máximo 300 caracteres</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div v-if="!edit">
              <h5 class="req">Elige el reto en el que deseas postular tu idea</h5>
              <b-form-select
                class="mb-2 mr-sm-2 mb-sm-0 squareInput inputStyles"
                :value="null"
                id="inline-form-custom-select-pref"
                v-model="idea.challenge_id"
                v-validate="'required'"
                :class="{'has-error': errors.has('challenge_invalid')}"
                name="challenge"
              >
                <option
                  slot="first"
                  v-for="(challenge, index) in challenges"
                  v-bind:value="challenge.id"
                  :key="index"
                >{{ challenge.title }}</option>
              </b-form-select>
              <p
                v-if="errors.has('challenge')"
                class="incorrectInput"
              >Selecciona el reto al que pertenece tu idea</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div v-if="!edit">
              <h5 class="req">Elige el ODS con el que se vincula tu propuesta</h5>
              <b-form-select
                class="mb-2 mr-sm-2 mb-sm-0 squareInput inputStyles"
                :value="null"
                :options="{'1. Fin de la pobreza': '1. Fin de la pobreza',
                '2. Hambre cero': '2. Hambre cero',
                '3. Salud y bienestar': '3. Salud y bienestar',
                '4. Educación de calidad': '4. Educación de calidad',
                '5. Igualdad de género': '5. Igualdad de género',
                '6. Agua limpia y saneamiento': '6. Agua limpia y saneamiento',
                '7. Energía asequible y no contaminante': '7. Energía asequible y no contaminante',
                '8. Trabajo decente y crecimiento económico': '8. Trabajo decente y crecimiento económico',
                '9. Industria, innovación e infraestructura': '9. Industria innovación e infraestructura',
                '10. Reducción de las desigualdades': '10. Reducción de las desigualdades',
                '11. Ciudades y comunidades sostenibles': '11. Ciudades y comunidades sostenibles',
                '12. Producción y consumo responsable': '12. Producción y consumo responsable',
                '13. Acción por el clima': '13. Acción por el clima',
                '14. Vida submarina': '14. Vida submarina',
                '15. Vida de ecosistemas terrestres': '15. Vida de ecosistemas terrestres',
                '16. Paz, justicia e instituciones sólidas': '16. Paz, justicia e instituciones sólidas',
                '17. Alianzas para lograr los objetivos': '17. Alianzas para lograr los objetivos'
                }"
                id="inline-form-custom-select-pref"
                v-model="idea.ods"
                v-validate="'required'"
                :class="{'has-error': errors.has('ods_invalid')}"
                name="ods"
              >
                <option slot="first" :value="null"></option>
              </b-form-select>
              <p
                v-if="errors.has('ods')"
                class="incorrectInput"
              >Debes seleccionar uno solo, el que corresponda e impacte de forma más directa</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div v-if="!edit">
              <h5 class="req">¿Cómo te enteraste de la iniciativa?</h5>
              <b-form-select
                class="mb-2 mr-sm-2 mb-sm-0 squareInput inputStyles"
                :value="null"
                :options="{'Por la Cámara de Comercio de Barranquilla': 'Por la Cámara de Comercio de Barranquilla',
                  'Por las organizaciones aliadas': 'Por las organizaciones aliadas',
                  'Redes sociales': 'Redes sociales',
                  'Correo electrónico': 'Correo electrónico',
                  'Medios de prensa': 'Medios de prensa',
                  'Otros': 'Otros'
                }"
                id="inline-form-custom-select-pref"
                v-model="idea.info_found"
                v-validate="'required'"
                :class="{'has-error': errors.has('info_found_invalid')}"
                name="ods"
              >
                <option slot="first" :value="null"></option>
              </b-form-select>
              <p v-if="errors.has('info_found')" class="incorrectInput">Cuéntanos cómo te enteraste</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <b-form-checkbox
          id="checkbox-1"
          v-model="idea.terms"
          name="terms"
          value="accepted"
          unchecked-value="not_accepted"
          class="req"
        >Acepto las <a href="http://www.camarabaq.org.co/desarrollo-regional/ideas/bases-imagina-tu-ciuda/" target="_blank">bases de la convocatoria</a></b-form-checkbox>
          </div>
        </div>
        <div class="row buttons">
          <div class="col-sm">
            <b-button
              class="ideaButton title"
              :disabled="validate()"
              @click.prevent="createIdea()"
            >¡Sube tu idea!</b-button>
          </div>
          <div class="col-sm">
            <b-button class="cancel title" @click.prevent="cancelCreateIdea()">Cancelar</b-button>
          </div>
        </div>
      </div>
    </div>
    <Alert ref="alert"></Alert>
    <Foot></Foot>
  </div>
</template>

<script>
import api from "../requests.js";
import Alert from "./Alert.vue";
import Header from "./Header.vue";
import Foot from "./Foot.vue";

export default {
  components: {
    Header,
    Alert,
    Foot
  },
  data() {
    return {
      challenges: [],
      idea: {},
      edit: false
    };
  },
  methods: {
    getImage() {
      return URL.createObjectURL(this.idea.image);
    },
    validate() {
      if (
        this.idea.title == null ||
        this.idea.description == null ||
        this.idea.challenge_id == null ||
        this.idea.impact == null ||
        this.idea.problem == null ||
        this.idea.info_found == null ||
        this.idea.terms == null ||
        this.idea.ods == null ||
        this.idea.title == "" ||
        this.idea.description == "" ||
        this.idea.challenge_id == "" ||
        this.idea.impact == "" ||
        this.idea.problem == "" ||
        this.idea.info_found == "" ||
        this.idea.ods == "" ||
        this.idea.terms == 'not_accepted' ||
        this.errors.items.length != 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    createIdea() {
      var fd = new FormData();
      if (this.idea.image != null) {
        if (this.edit) {
          fd.append("update_img", true);
          var key = "";
          if (this.idea.idea_pictures.length == 0) key = "image_create";
          else key = "image_" + this.idea.idea_pictures[0].id + "_update";
          fd.append(key, this.idea.image);
        } else {
          fd.append("image", this.idea.image);
        }
      }
      fd.append("title", this.idea.title);
      fd.append("description", this.idea.description);
      fd.append("impact", this.idea.impact);
      fd.append("problem", this.idea.problem);
      fd.append("companions", this.idea.companions);
      fd.append("info_found", this.idea.info_found);
      fd.append("implementation", this.idea.implementation)
      fd.append("ods", this.idea.ods);

      if (!this.edit) fd.append("challenge_id", this.idea.challenge_id);
      if (this.edit) {
        api.ideas
          .edit(this.$route.params.eId, fd)
          .then(response => {
            this.$refs.alert.success("Tu idea se ha actualizado correctamente");
            this.$router.push("/idea/" + response.data.id);
          })
          .catch(() => {
            this.$refs.alert.network_error();
          });
      } else {
        api.idea
          .create(fd)
          .then(response => {
            this.$refs.alert.success("¡Que buena idea! Gracias por postularla");
            this.$router.push("/idea/" + response.data.id);
          })
          .catch(() => {
            this.$refs.alert.network_error();
          });
      }
    },
    cancelCreateIdea() {
      this.$router.push("/");
    },
    hasPic(images) {
      if (this.edit) {
        if (images == null) return true;
        else {
          if (images.length == 0) return true;
          else return false;
        }
      } else {
        if (this.idea.image == null) return true;
        else return false;
      }
    }
  },
  created() {
    api.challenges
      .index()
      .then(response => {
        this.challenges = response.data;
      })
      .catch(() => {
        this.$refs.alert.network_error();
      });
      this.edit = false
  }
};
</script>

<style scoped style lang="scss">
.createEditIdeaComponent {
  .buttons{
    margin-bottom: 30px;
  }
  .titleStyle {
    margin-bottom: 30px;
  }
  .idea-create {
    margin-top: 130px;
  }
  .req{
    &::after {
      content: "*";
      color: red;
    }
  }
  .idea-image {
    height: 200px;
    overflow: hidden;
    text-align: center;
    col {
      width: 100%;
    }
    img {
      height: 200px;
    }
  }
  .ideaButton {
    width: 100%;
    border-radius: 5px;
    border-color: #0e2469;
    background-color: #0e2469;
    margin-top: 10px;
  }
  .cancel {
    margin-top: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #0e2469;
    background-color: white;
    color: #0e2469;
  }
  .form {
    width: 85%;
    h5 {
      margin-top: 10px;
    }
  }
  .loadBtn {
    border: 1px solid #0e2469;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 #ffffff;
    background-color: transparent;
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
    .selectedImage {
      color: #6a6a6a;
      font-size: 12px;
      margin: 0px;
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
}
</style>