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
          <b-nav-item-dropdown v-bind:text="userInfo.fullname" class="title user-drop" right>
            <b-dropdown-item class="title" href="#" v-on:click.prevent="gotoProfile()">Mi Perfil</b-dropdown-item>
            <!-- <b-dropdown-item class="title" href="#">Mis Ideas</b-dropdown-item> -->
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item class="title signout" href="#" v-on:click.prevent="userLogout()">Cerrar sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {SERVER_URL} from '../variables.js'

export default {
  data(){
    return{
      tokenExists: false,
      userInfo: {
        id:'',
        secret:'',
        expire_at:'',
        name:'',
        lastname:'',
        fullname:''
      }
    }
  },
  methods: {
    checkToken(){
      if (this.$cookie.get('secret') == null){
          this.tokenExists = false;
      }else{
          this.tokenExists = true;
          console.log("COOKIE: " + this.$cookie.get('secret'));
          var userInfo = JSON.parse(this.$cookie.get('secret'));
          this.userInfo.id = userInfo.user_id;
          this.userInfo.secret = userInfo.secret;
          this.userInfo.expire_at = userInfo.expire_at;
          this.userInfo.name = userInfo.name;
          this.userInfo.lastname = userInfo.lastname;
      }
    },
    userLogout(){
        this.$cookie.delete('secret');
        this.$http.delete((SERVER_URL + '/sessions'), {headers: {'Authorization': 'Token token=' + this.userInfo.secret}})
        .then((response) => {
            console.log(response);
        },
        (err) => {
            console.log("Err", err);
        });
        console.log('LOOGED OUT');
        setTimeout(() => this.$router.push('/'), 500);
        // this.$router.push('/');
        // location.reload();
    },
    goToLogin(){
      this.$router.push('/login')
    },
    buildFullName(){
      const nameCapitalized = this.userInfo.name.charAt(0).toUpperCase() + this.userInfo.name.slice(1)
      const lastnameCapitalized = this.userInfo.lastname.charAt(0).toUpperCase() + this.userInfo.lastname.slice(1)
      this.userInfo.fullname = nameCapitalized + " " + lastnameCapitalized
    },
    gotoProfile(){
      this.$router.push('/miperfil');
    }
  },
  created(){
    this.checkToken();
    console.log(this.tokenExists);
    setTimeout(() => this.buildFullName(), 500);
  }
};
</script>

