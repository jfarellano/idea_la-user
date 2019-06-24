<template>
  <div class="createEditIdeaComponent">
    <Header></Header>

    <div class="container-fluid idea-create">
      <div class="row justify-content-center">
        <h1 class="title titleStyle">Postula tu idea</h1>
      </div>
      <div class="container-fluid form">
        <div class="row">
          <div class="col-sm">
            <h5>Titulo</h5>
            <div class="input-group">
              <input
                type="text"
                class="form-control inputStyles"
                placeholder="ej. Mi idea"
                v-model="idea.title"
                v-validate="'alpha_spaces|max:50|required'"
                :class="{'has-error': errors.has('title_invalid')}"
                name="title"
              >
            </div>
            <p
              v-if="errors.has('title')"
              class="incorrectInput"
            >El titulo es requerido y debe ser maximo de 50 caracteres</p>

            <h5>Descripción</h5>
            <div class="input-group">
              <b-form-textarea
                rows="7"
                max-rows="10"
                class="form-control inputStyles"
                placeholder="ej. Mi descripción"
                v-model="idea.description"
                v-validate="'required|min:400|max:1500'"
                :class="{'has-error': errors.has('description_invalid')}"
                name="description"
              ></b-form-textarea>
            </div>
            <p
              v-if="errors.has('description')"
              class="incorrectInput"
            >La descripción es requerida, debe ser minimo de 400 caracteres y maximo de 1500</p>
          </div>
          <div class="col-sm">
            <div v-if="!edit">
              <h5>Reto al que pertenece esta idea</h5>
              <b-form-select
                class="mb-2 mr-sm-2 mb-sm-0 squareInput inputStyles"
                :value="null"
                id="inline-form-custom-select-pref"
                v-model="idea.challenge_id"
                v-validate="'required'"
                :class="{'has-error': errors.has('callenge_invalid')}"
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
            <h5>Imagen de tu idea</h5>
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
            >La imagen es muy grande, el maximo son 2MB</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <b-button class="ideaButton title" @click.prevent="createIdea()">Aceptar</b-button>
          </div>
          <div class="col-sm">
            <b-button class="cancel title" @click.prevent="cancelCreateIdea()">Cancelar</b-button>
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
import Header from "./Header.vue";

export default {
  components: {
    Header,
    Alert
  },
  data() {
    return {
      challenges: [],
      idea: {},
      edit: false
    };
  },
  methods: {
    createIdea() {
      if (
        this.idea.title != null ||
        this.idea.description != null ||
        this.idea.challenge_id != null ||
        this.idea.title != "" ||
        this.idea.description != "" ||
        this.idea.challenge_id != ""
      ) {
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
              this.$refs.alert.success("Tu idea se ha creado correctamente");
              this.$router.push("/idea/" + response.data.id);
            })
            .catch(() => {
              this.$refs.alert.network_error();
            });
        }
      } else {
        this.$refs.alert.form_error();
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
    var id = this.$route.params.eId;
    if (id != "new") {
      this.edit = true;
      api.idea
        .getInfo(id)
        .then(response => {
          this.idea = response.data;
        })
        .catch(() => {
          this.$refs.alert.network_error();
        });
    } else {
      this.edit = false;
    }
  }
};
</script>

<style scoped style lang="scss">
.createEditIdeaComponent {
  .titleStyle {
    margin-bottom: 30px;
  }
  .idea-create {
    margin-top: 130px;
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