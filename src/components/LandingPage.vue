<template>
  <section>
    <Header></Header>
    <div class="sections-container">
      <div class="main-container container-fluid">
        <div class="first row justify-content-end align-items-center">
          <div class="col-md-6">
            <img src="../assets/CamaraBaq-Blue.svg">
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="section-left col">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-7 align-self-center info order-2 order-sm-1">
                  <h1 class="title">La iniciativa</h1>
                  <p
                    class="parag"
                  >Imagina Tu Ciudá es un espacio para que busquemos juntos soluciones a los desafíos de nuestra ciudad, frente a los Objetivos de Desarrollo Sostenible y así construir, entre todos, la Barranquilla que soñamos.</p>
                </div>
                <div class="col-sm-5 align-self-center order-1 order-sm-2">
                  <img src="../assets/landing/Land1.svg" alt="ODS">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="section-rigth col">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-5 align-self-center">
                  <img src="../assets/landing/Land2.svg" alt="ODS">
                </div>
                <div class="col-sm-7 align-self-center info">
                  <h1 class="title">Comprometidos con los ODS</h1>
                  <p
                    class="parag"
                  >Para cumplir con los Objetivos de Desarrollo Sostenible todos los actores del territorio debemos trabajar colaborativamente. Es necesario que empresas privadas, instituciones públicas, academia, ONGs y organizaciones de la sociedad civil logren conectarse con la ciudadanía para alcanzar las metas pactadas, sin dejar a nadie atrás.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="section-left col">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-7 align-self-center info order-2 order-sm-1">
                  <h1 class="title">Te necesitamos</h1>
                  <p
                    class="parag"
                  >Para lograrlo necesitamos que tú seas parte del cambio. Sabemos que tienes mucho que aportar. Tus ideas, experiencia y tiempo nos ayudarán a encontrar soluciones sostenibles a los desafíos que afrontamos. ¡Todos podemos convertirnos en protagonistas de nuestra ciudad!</p>
                </div>
                <div class="col-sm-5 align-self-center order-1 order-sm-2">
                  <img src="../assets/landing/Land3.svg" alt="ODS">
                </div>
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
              <div class="row justify-content-arround">
                <img class="logo col" src="../assets/landing/brands/BCV.svg">
                <img class="logo col" src="../assets/landing/brands/CCB.svg">
                <img class="logo col" src="../assets/landing/brands/GS.svg">
                <img class="logo col" src="../assets/landing/brands/JOO.svg">
                <img class="logo col" src="../assets/landing/brands/NA.svg">
                <img class="logo col" src="../assets/landing/brands/UN.svg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from "./Header.vue";

export default {
  components: {
    Header
  },
  data() {
    return {
      tokenExists: false,
      userCookie: {
        id: "",
        secret: "",
        expire_at: "",
        name: ""
      }
    };
  },
  methods: {
    goToChallenges() {
      this.$router.push("/retos");
    }
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
    background-color: white;
    height: calc(100vw * 0.33);
    background-image: url("../assets/landing/Land-f.svg");
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: 100vw;
    @media (max-width: 768px) {
      height: calc(100vw * 0.5);
    }
  }
  .section-left {
    width: 100%;
    max-width: 1100px;
    padding: 30px 0px 0px 80px;
    margin-top: 0px;
    background-color: white;
    text-align: center;
    .info {
      h1 {
        text-align: left;
        font-size: 2rem;
        color: #0e2469;
      }
      p {
        color: #282828;
        text-align: justify;
        font-size: 1rem;
      }
    }
    img {
      width: 70%;
    }
    @media (max-width: 768px) {
      margin-top: 0px !important;
      padding: 20px !important;
      img {
        width: 100% !important;
      }
    }
    @media (max-width: 1100px) {
      padding: 30px 0px 0px 50px;
      width: 1100px !important;
    }
  }
  .section-rigth {
    width: 100%;
    max-width: 1100px;
    padding: 30px 80px 0px 0px;
    margin-top: 0px;
    background-color: white;
    text-align: center;
    .info {
      h1 {
        text-align: left;
        font-size: 2rem;
        color: #0e2469;
      }
      p {
        color: #282828;
        text-align: justify;
        font-size: 1rem;
      }
    }
    img {
      width: 70%;
    }
    @media (max-width: 768px) {
      margin-top: 0px !important;
      padding: 20px !important;
      img {
        width: 100% !important;
      }
    }
    @media (max-width: 1100px) {
      padding: 30px 50px 0px 0px;
      width: 1100px !important;
    }
  }
  .brands {
    width: 100%;
    max-width: 1100px;
    margin-top: 0px;
    background-color: white;
    text-align: center;
    .support{
      color: #0e2469;
      text-align: center;
      width: 100%;
    }
    .logo {
      height: 100px;
      text-align: center;
    }

    @media (max-width: 1100px) {
      width: 1100px !important;
    }
  }
}
</style>
