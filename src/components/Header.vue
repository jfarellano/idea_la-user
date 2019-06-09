<template>
  <b-navbar toggleable="lg" fixed="top">
    <b-navbar-brand href="/">
      <img src="../assets/CS_BC.svg" alt="IdeaLa">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <div v-if="tokenExists == false">
          <b-button class="login" right v-on:click.prevent="goToLogin()">Ingresar</b-button>
        </div>
        <div v-else>
          <b-nav-item-dropdown :text="fullname" class="title user-drop" right>
            <b-dropdown-item class="title" href="#" v-on:click.prevent="gotoProfile()">Mi Perfil</b-dropdown-item>
            <!-- <b-dropdown-item class="title" href="#">Mis Ideas</b-dropdown-item> -->
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item
              class="title signout"
              href="#"
              v-on:click.prevent="userLogout()"
            >Cerrar sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </b-navbar-nav>
    </b-collapse>
    <vue-snotify></vue-snotify>
  </b-navbar>
</template>

<script>
import auth from "../authentication.js";

export default {
  data() {
    return {
      tokenExists: false,
      fullname: ""
    };
  },
  methods: {
    userLogout() {
      auth.session
        .logout()
        .then(response => {
          auth.storage.clear();
          location.reload()
        })
        .catch(err => {
          this.$snotify.error("Usuario bloqueado", "Atención", {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        });
    },
    goToLogin() {
      this.$router.push("/login");
    },
    gotoProfile() {
      this.$router.push("/miperfil");
    }
  },
  created() {
    this.tokenExists = auth.storage.loged()
    console.log(auth.storage.get('name'))
    this.fullname = auth.storage.get('name')
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 110px;
  background-color: #ffe01b;
  color: #4d4d4d;
  .navbar-brand {
    img {
      height: 80px;
      margin-left: 40px;
    }
  }
  .login {
    padding: 5px 20px;
    color: #4d4d4d;
    font-size: 1.3em;
    border-style: solid !important;
    border: 2px;
    border-color: #4d4d4d;
    margin-right: 40px;
    background-color: transparent;
    border-radius: 0px;
  }
  .user-drop {
    padding: 5px 20px;
    border-style: solid !important;
    border: 2px;
    border-color: #4d4d4d;
    margin-right: 40px;
    span {
      color: #4d4d4d;
      font-size: 1.3em;
    }
    .signout {
      background-color: #4d4d4d;
      a {
        color: #ffe01b;
      }
      & :hover {
        background-color: #5d5d5d;
      }
    }
  }
}
</style>