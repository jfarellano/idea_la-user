<template>
  <section>
    <Header></Header>
    <div class="main-container container-fluid">
      <div
        data-aos="fade-in"
        data-aos-duration="2000"
        data-aos-delay="30"
        class="first row justify-content-end align-items-center"
      >
        <div class="col-md-6">
          <img src="../assets/CamaraBaq-Blue.svg" />
        </div>
        <router-link
          v-if="stage == 3"
          class="btn-action-vote"
          tag="b-button"
          to="/retos"
        >¡Vota ya por tu idea favorita!</router-link>
      </div>
      <div v-if="stage == '4' && winners != ''" class="row blue">
        <div class="winners container-fluid">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-12 align-self-center">
              <h1 style="text-align: center">Conoce los ganadores</h1>
              <div class="container-fluid">
                <div class="row justify-content-center">
                  <router-link
                    class="idea container-fluid"
                    v-for="(idea, index) in winners"
                    data-aos="zoom-in"
                    data-aos-duration="500"
                    data-aos-delay="100"
                    tag="div"
                    :key="index"
                    :to="{name: 'Idea', params: { iId: idea.id } }"
                  >
                    <font-awesome-icon class="icon" icon="star"></font-awesome-icon>
                    <div class="row image">
                      <img v-bind:src="idea.idea_pictures[0].url" />
                    </div>
                    <div class="row data">
                      <h3>{{idea.title}}</h3>
                      <p class="parag">{{getDescription(idea.description)}}</p>
                    </div>
                    <div class="row show-more">
                      <b-button>Ver más</b-button>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="section container-fluid">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-6 align-self-center info order-2 order-md-1">
              <h1>La iniciativa</h1>
              <p>Imagina Tu Ciudá es un espacio de co-creación ciudadana en el que todos podemos ser parte de la construcción de la ciudad que soñamos, priorizando los grandes desafíos que afronta nuestro territorio frente a los Objetivos de Desarrollo Sostenible y formulando soluciones innovadoras a éstos.</p>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-delay="50"
              class="col-md-6 align-self-center order-1 order-md-2"
            >
              <img src="../assets/landing/Land1.svg" alt="ODS" />
            </div>
          </div>
        </div>
      </div>
      <div class="row blue">
        <div class="section left container-fluid">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-6 align-self-center info order-2 order-md-2">
              <h1>Comprometidos con los ODS</h1>
              <p>Los 17 Objetivos de Desarrollo Sostenible – ODS, son un llamado universal a la adopción de medidas para poner fin a la pobreza, luchar contra el cambio climático y reducir las desigualdades. Trabajar para alcanzar los ODS en nuestra ciudad requiere de la colaboración de todos. Empresas privadas, instituciones públicas, entidades educativas y organizaciones de la sociedad civil conectadas con la ciudadanía para asegurar que dejaremos una mejor ciudad a las generaciones futuras, sin dejar a nadie atrás.</p>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-delay="50"
              class="col-md-6 align-self-center order-1 order-md-1"
            >
              <img src="../assets/landing/Land2.svg" alt="ODS" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="section container-fluid">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-6 align-self-center info order-2 order-md-1">
              <h1>Los aliados</h1>
              <p>Es por esto que la Cámara de Comercio de Barranquilla, NativApps, Joonik, Barranquilla Cómo Vamos, ADN, Dolmen, Transmetro, Universidad Simón Bolívar-MacondoLab , Universidad de la Costa, Universidad del Norte, Universidad Autónoma del Caribe, Corporación Universitaria Americana, Corporación PEP y Global Shapers decidieron trabajar colaborativamente para incentivar la participación ciudadana en un proceso de construcción de ciudad, haciendo uso de la tecnología.</p>
            </div>
            <div
              class="col-md-6 align-self-center order-1 order-md-2"
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-delay="50"
            >
              <img src="../assets/landing/United.svg" alt="ODS" />
            </div>
          </div>
        </div>
      </div>
      <div class="row blue">
        <div class="section left container-fluid">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-6 align-self-center info order-2 order-md-2">
              <h1>Los Hackers</h1>
              <p>Los desarrolladores de esta plataforma son 5 estudiantes de la Universidad del Norte que resultaron ganadores de la Hackathon - Imagina Tu Ciudá, en la que participaron 52 estudiantes de 6 universidades diferentes, durante el mes de abril 2019. Ellos son Juan Felipe Arellano, Andrés Concha, Maximiliam García, John Barbosa, estudiantes de Ingeniería de Sistemas y Jhon Muñoz, estudiante de Ciencia Política y Gobierno.</p>
              <b-button
                data-aos="fade-in"
                data-aos-duration="2000"
                data-aos-delay="200"
                href="https://idea-la.com/"
                target="_blank"
              >Conoce al equipo</b-button>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-delay="50"
              class="col-md-6 align-self-center order-1 order-md-1"
            >
              <img src="../assets/landing/Hacker.svg" alt="ODS" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="section container-fluid">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-6 align-self-center info order-2 order-md-1">
              <h1>Te necesitamos</h1>
              <p>Sabemos que tienes mucho que aportar. Tus ideas y experiencia nos ayudarán a encontrar soluciones más sostenibles y escalables para construir una mejor Barranquilla. ¡Conviértete hoy en un protagonista de tu ciudad y aporta tus ideas!</p>
              <b-button
                data-aos="fade-in"
                data-aos-duration="2000"
                data-aos-delay="200"
                href="http://www.camarabaq.org.co/desarrollo-regional/ideas/bases-imagina-tu-ciuda/"
                target="_blank"
              >Descarga las bases</b-button>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="2000"
              data-aos-delay="50"
              class="col-md-6 align-self-center order-1 order-md-2"
            >
              <img src="../assets/landing/Land3.svg" alt="ODS" />
            </div>
          </div>
        </div>
      </div>
      <div class="row blue">
        <div class="section container-fluid">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-8 align-self-center info order-2 order-md-1">
              <img class="cc" src="../assets/landing/brands/CCB.svg" />
              <h3 style="text-align: center">Conoce más sobre nuestras iniciativas</h3>
              <b-button
                data-aos="fade-in"
                data-aos-duration="2000"
                data-aos-delay="50"
                href="http://www.camarabaq.org.co/desarrollo-regional/ "
                target="_blank"
              >Conócenos</b-button>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="brands col">
          <div class="container-fluid container-flex">
            <div class="row">
              <h3 class="support">Apoyan</h3>
            </div>
            <div
              class="row justify-content-center"
              data-aos="fade-in"
              data-aos-duration="1500"
              data-aos-delay="100"
            >
              <img class="logo col" src="../assets/landing/brands/CCB.svg" />
              <img class="logo col" src="../assets/landing/brands/NA.svg" />
              <img class="logo col" src="../assets/landing/brands/JOO.svg" />
              <img class="logo col" src="../assets/landing/brands/BCV.svg" />
              <img class="logo col" src="../assets/landing/brands/ADN.svg" />
              <img class="logo col" src="../assets/landing/brands/DOL.svg" />
              <img class="logo col" src="../assets/landing/brands/TM.svg" />
              <img class="logo col" src="../assets/landing/brands/SB.svg" />
              <img class="logo col" src="../assets/landing/brands/ML.svg" />
              <img class="logo col" src="../assets/landing/brands/UC.svg" />
              <img class="logo col" src="../assets/landing/brands/UN.svg" />
              <img class="logo col" src="../assets/landing/brands/UA.svg" />
              <img class="logo col" src="../assets/landing/brands/CU.svg" />
              <img class="logo col" src="../assets/landing/brands/PEP.svg" />
              <img class="logo col" src="../assets/landing/brands/GS.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </section>
</template>

<script>
import Header from "./Header.vue";
import Foot from "./Foot.vue";
import api from "../requests.js";
import auth from "../authentication.js";

export default {
  components: {
    Header,
    Foot
  },
  data() {
    return {
      tokenExists: false,
      stage: "0",
      winners: []
    };
  },
  methods: {
    goToChallenges() {
      this.$router.push("/retos");
    },
    getDescription(desc) {
      if (desc.length <= 100) return desc;
      else return desc.slice(0, 100) + "...";
    }
  },
  created() {
    auth.session.stage().then(response => {
      auth.storage.set_stage(
        response.data.number,
        response.data.title,
        response.data.description
      );
      this.stage = response.data.number;
      if (this.stage == "4") {
        api.idea.all_winners().then(response => {
          this.winners = Object.values(response.data);
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.sections-container {
  background-color: #f7f7f7;
  width: 100%;
}

.main-container {
  margin-top: 90px;
  .first {
    position: relative;
    background-color: white;
    height: calc(100vw * 0.33);
    background-image: url("../assets/landing/Land-f.svg");
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: 100vw;
    @media (max-width: 768px) {
      height: calc(100vw * 0.5);
    }
    .btn-action-vote {
      background-color: #f77b17;
      border: none;
      font-size: 1.3rem;
      border-radius: 25px;
      position: absolute;
      left: calc(50% - 150px);
      bottom: -35px;
      height: 70px;
      width: 300px;
    }
  }
  .blue {
    background-color: #e2f3fd;
  }
  .section {
    min-height: 60vh;
    width: 100%;
    margin-top: 0px;
    padding-left: 45px;
    text-align: center;
    .row {
      height: 100%;
    }
    .info {
      h1 {
        text-align: left;
        font-size: 2.5rem;
        color: #0e2469;
      }
      h3 {
        color: #0e2469;
      }
      p {
        white-space: normal;
        color: #282828;
        text-align: justify;
        font-size: 1.3rem;
      }
    }
    cc {
      width: 60%;
    }
    img {
      width: 100%;
    }
    a {
      width: 100%;
      background-color: #0e2469;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
    @media (max-width: 767.98px) {
      padding: 50px 50px !important;
      height: auto !important;
      min-height: fit-content !important;
      h1 {
        text-align: center !important;
      }
      img {
        width: 60%;
      }
      .cc {
        width: 100%;
      }
    }
    @media (min-width: 1100px) {
      width: 1100px !important;
      height: 660px !important;
      min-height: 660px !important;
    }
  }
  .left {
    padding-left: 15px !important;
    padding-right: 45px !important;
    @media (max-width: 767.98px) {
      padding: 50px 50px !important;
    }
  }
  .brands {
    width: 100%;
    margin-top: 30px;
    padding-left: 200px;
    padding-right: 200px;
    background-color: white;
    text-align: center;
    .support {
      color: #0e2469;
      text-align: center;
      width: 100%;
    }
    .logo {
      height: 140px;
      text-align: center;
      max-width: 280px;
    }
    @media (max-width: 767.98px) {
      padding-left: 0px !important;
      padding-right: 0px;
    }
    @media (min-width: 1100px) {
      width: 1100px !important;
    }
  }
  .winners {
    padding: 30px 15px;
    h1 {
      font-size: 2.5rem;
      color: #0e2469;
    }
    @media (min-width: 1100px) {
      width: 1100px !important;
    }
  }
  .idea {
    margin: 10px;
    background-color: white;
    border: 1px solid #ededed;
    color: #6d6d6d;
    border-radius: 5px;
    width: 300px;
    height: 390px;
    position: relative;
    cursor: pointer;
    .parag {
      color: #020202;
      text-align: justify;
    }
    .icon {
      display: none;
      position: absolute;
      top: -20px;
      right: -20px;
      font-size: 50px;
      transform: rotate(25deg);
      color: #0e2469;
    }

    .image {
      height: 150px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      overflow: hidden;
      img {
        width: 300px;
        margin: auto;
      }
    }
    .data {
      word-wrap: break-word;
      overflow-wrap: break-word;
      width: 298px;
      padding: 20px;
      height: 180px;
      h3 {
        font-size: 1.3rem;
        color: #0e2469;
        width: 100%;
      }
      p {
        width: 258px;
        word-wrap: break-word;
        overflow-wrap: break-word;
        color: #262626;
        margin-top: 5px;
        margin-bottom: 5px;
        text-align: justify;
      }
    }
    .show-more {
      padding: 0px 20px;
      height: auto;
      button {
        background-color: #0e2469;
        color: white;
        border-radius: 5px;
        width: 100%;
      }
    }
  }
}
</style>
