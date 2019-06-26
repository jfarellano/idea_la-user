<template>
  <b-navbar toggleable="sm" type="dark" fixed="top">
    <b-navbar-brand href="/">
      <img src="../assets/CamaraBaq-24.svg" alt="Ciudá">
    </b-navbar-brand>
    <button
      class="navbar-toggler ml-auto"
      type="button"
      data-toggle="collapse"
      data-target="#nav-collapse"
      aria-controls="navbarSupportedContent"
      :aria-expanded="show"
      @click="collapse()"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div :class="collapseClass()" id="nav-collapse">
      <b-navbar-nav class="ml-auto">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <router-link tag="a" class="nav-link" to="/">Inicio</router-link>
          </li>
          <div v-if="stage_from(1)">
            <li>
              <router-link tag="a" class="nav-link" to="/retos">Retos</router-link>
            </li>
          </div>
          <div v-if="tokenExists == false">
            <li>
              <router-link tag="a" class="nav-link" to="/login">Ingresar</router-link>
            </li>
          </div>
          <div v-else>
            <li :class="dropClass('nav-item user-drop dropdown')" v-click-outside="close">
              <a class="user-drop nav-link dropdown-toggle" href="#" @click="toggleDropdown()">
                <span>{{fullname}}</span>
                <b-img
                  rounded="circle"
                  class="avatar img-responsive"
                  :src="getPic()"
                  alt="Circle image"
                ></b-img>
              </a>
              <div :class="dropClass('dropdown-menu')" aria-labelledby="navbarDropdownMenuLink">
                <router-link tag="a" class="dropdown-item" to="/perfil">Mi Perfil</router-link>
                <div v-if="stage_from(1)">
                  <router-link tag="a" class="dropdown-item" to="/mis-ideas">Mis Ideas</router-link>
                </div>
                <a class="dropdown-item logout" @click="userLogout()">Cerrar sesión</a>
              </div>
            </li>
          </div>
        </ul>
      </b-navbar-nav>
    </div>
    <Alert ref="alert"></Alert>
    <Survey ref="survey"></Survey>
  </b-navbar>
</template>

<script>
import auth from "../authentication.js";
import api from "../requests.js";
import Survey from "./Survey.vue";
import Alert from "./Alert.vue";

export default {
  data() {
    return {
      tokenExists: false,
      fullname: "",
      expanded: false,
      show: false,
      stage: 0
    };
  },
  components: {
    Survey,
    Alert
  },
  methods: {
    userLogout() {
      auth.session.logout().then(() => {
        auth.storage.clear();
        location.reload();
      });
    },
    stage_is(stage) {
      return this.stage == stage;
    },
    stage_from(stage) {
      return this.stage >= stage;
    },
    getPic() {
      return auth.storage.get("picture");
    },
    toggleDropdown() {
      this.expanded = !this.expanded;
    },
    dropClass(ref) {
      if (this.expanded) return ref + " show";
      else return ref;
    },
    close() {
      if (this.expanded) {
        this.expanded = false;
      }
    },
    collapse() {
      this.show = !this.show;
    },
    collapseClass() {
      if (this.show) return "navbar-collapse collapse show";
      else return "navbar-collapse collapse";
    }
  },
  created() {
    var loged = auth.storage.logged();
    auth.session.stage().then(response => {
      auth.storage.set_stage(response.data.number)
      this.stage = response.data.number
    });
    if (loged) {
      this.tokenExists = loged;
      api.user
        .show(auth.storage.get("user_id"))
        .then(response => {
          if (typeof response.data.picture == 'string')
            auth.storage.setImage(response.data.picture);
          else auth.storage.setImage(response.data.picture.url);
          auth.storage.set_name(response.data.name, response.data.lastname);
          this.fullname = auth.storage.get("name");
          api.user.survey().then(response => {
            if (response.data.prompt_survey) {
              this.$refs.survey.open();
            }
          });
        })
        .catch(err => {
          auth.storage.clear();
          this.tokenExists = false;
          if (err.response.data.authentication == "user not found") {
            this.$refs.alert.warning(
              "Tu sesión ha caducado, vuelve a iniciar sesión"
            );
          } else {
            this.$refs.alert.network_error();
          }
        });
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind: function(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 90px;
  background-color: #081641;
  color: white;
  .navbar-brand {
    img {
      height: 70px;
      margin-left: 6%;
    }
  }
  .login {
    padding: 5px 20px;
    font-size: 22px;
    margin-right: 6%;
    background-color: transparent;
    border-color: transparent;
    border-radius: 0px;
  }
  .nav-link {
    color: white;
    font-size: 22px;
  }
  .user-drop {
    span {
      margin-right: 10px;
    }
    img {
      border-color: white;
      border-style: solid !important;
      border: 2px;
    }
  }
  .logout {
    color: #ff0000;
    cursor: pointer;
  }
  .dropdown-menu {
    top: 65px;
  }
  .avatar {
    width: 34px;
    height: 34px;
  }

  .navbar-toggler {
    color: white !important;
    border: none;
    span {
      color: white;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
    }
  }
  .navbar-collapse {
    background-color: #081641;
    text-align: center;
    @media (max-width: 576px) {
      margin-top: 28px;
      .nav-link {
        margin: 6px;
      }
    }

    -webkit-border-bottom-right-radius: 10px;
    -webkit-border-bottom-left-radius: 10px;
    -moz-border-radius-bottomright: 10px;
    -moz-border-radius-bottomleft: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}
</style>