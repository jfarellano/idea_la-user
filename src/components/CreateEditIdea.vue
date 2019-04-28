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
            <b-form-group class="title" label="Título">
              <b-form-input class="squareInput" type="text"></b-form-input>
            </b-form-group>
            <b-form-group class="title" label="Descripción">
              <b-form-textarea class="descStyle squareInput" type="text"></b-form-textarea>
            </b-form-group>
          </div>
          <div class="col-sm">
            <b-form-group class="title" label="Seleccionar Reto">
                <b-form-select
                    class="mb-2 mr-sm-2 mb-sm-0 squareInput"
                    :value="null"
                    id="inline-form-custom-select-pref"
                    >
                    <option slot="first" :value="null" v-for="(challenge, index) in challenges"
                        :key="index">{{ challenge.title }}</option>
                </b-form-select>
            </b-form-group>
            <b-form-group class="title" label="Cargar Imagen">
              <b-form-file class="squareInput"></b-form-file>
            </b-form-group>
            <b-form-group class="title" label="URL de Video">
              <b-form-input class="squareInput" type="text"></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <b-button class="ideaButton title">Aceptar</b-button>
            </div>
            <div class="col-sm">
                <b-button class="ideaButton title">Cancelar</b-button>
            </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="containerfluid">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col align-self-center">
            <div class="row justify-content-center">
              <br>
              <h2 class="title">Postular Nueva Idea</h2>
            </div>
            <hr>

            <div class="row align-items-center addIdeaCont">
              <div class="col-sm">
                <h5 class="title">Título</h5>
                <div class="input-group">
                  <input type="text" class="form-control inputStyles">
                </div>
                <div class="divSeparator"></div>
                <h5 class="title">Descripción</h5>
                <div class="row heightDes">
                  <div class="input-group">
                    <textarea class="form-control inputStyles" aria-label="With textarea"></textarea>
                  </div>
                </div>
              </div>
              <div class="col-sm">
                <h5 class="title">Seleccionar Reto</h5>
                <div class="col widthDropdown">
                  <div class="form-group">
                    <select class="form-control" id="pickerStyle" @change="onChange($event)">
                      <option
                        v-for="(challenge, index) in challenges"
                        :key="index"
                      >{{ challenge.title }}</option>
                    </select>
                  </div>
                </div>
                <div class="divSeparator"></div>
                <h5 class="title">Cargar Imagen</h5>
                <div class="input-group">
                  <input type="text" class="form-control inputStyles">
                </div>
                <div class="divSeparator"></div>
                <h5 class="title">URL de Video</h5>
                <div class="input-group">
                  <input type="text" class="form-control inputStyles">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col align-self-center">
            <b-button>Aceptar</b-button>
          </div>
          <div class="col align-self-center">
            <b-button>Cancelar</b-button>
          </div>
        </div>
      </div>
  </div>-->
</template>

<script>
import Header from "./Header.vue";

export default {
  components: {
    Header
  },
  data() {
    return {
      challenges: [
        {
          id: "1",
          title: "Seguridad"
        },
        {
          id: "2",
          title: "Medio Ambiente"
        },
        {
          id: "3",
          title: "Entretenimiento"
        },
        {
          id: "4",
          title: "Movilidad"
        },
        {
          id: "5",
          title: "Justicia"
        }
      ],
    };
  }
};
</script>