<template>
  <div class="loginComponent">
    <div id="divStyle" class="container-fluid">
      <div id="rowStyle" class="row align-items-center">
        <div class="col align-self-center">
            <router-link to="/">
                <img src="../assets/CS_BC.svg" alt="" height="140px" class="iconImage" >
            </router-link>
            <div class="fieldsContainer" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="10">
                <h3 class="title">Correo electrónico</h3>
                <div class="input-group">
                    <input type="email" class="form-control inputStyles" placeholder="ej. example@email.com" v-model="userCredentials.email">
                </div>
                <div class="divSeparator"></div>
                <h3 class="title">Contraseña</h3>
                <div class="input-group">
                    <input type="password" class="form-control inputStyles" placeholder="********" v-model="userCredentials.password">
                </div>
                <div class="divSeparator"></div>
                <p class="parag" id="registerStyle">¿No tienes una cuenta todavía? <router-link to="/register">Registrate aquí.</router-link></p>
                <button type="button" class="btn btn-primary btn-lg btn-block" id="btnLoginStyle" v-on:click.prevent="userLogin()">Ingresar</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {SERVER_URL} from '../variables.js'

export default {
  data(){
    return{
      userCookie: {
        user_id:'',
        secret:'',
        expire_at:'',

        email:'',
        password:'',
        cc:'',
        phone:'',
        name:'',
        lastname:'',
        age:'',
        gender:''
      },
      userCredentials: {
        email:'',
        password:''
      }
    }
  },
  methods: {
    userLogin() {
      this.$http.post((SERVER_URL + '/sessions'),{
        email: this.userCredentials.email,
        password: this.userCredentials.password
      }).then(response => response.json())
      .then(function(json){
        // console.log('USER LOGIN' + JSON.stringify(json));
        this.userCookie.user_id = json.user_id;
        this.userCookie.secret = json.secret;
        this.userCookie.expire_at = json.expire_at;
        this.extraData(json.user_id);
        setTimeout(() => this.$router.push('/'), 500);
      },
      (err) => {
        console.log("Err", err.body.single_authentication);
        if (err.body.single_authentication == 'invalid credentials') {
          alert("Invalid Credentials");
          this.userCredentials.username = '';
          this.userCredentials.password = '';
        } else if (err.body.single_authentication == 'user is blocked') {
          alert("This user has been blocked.");
          this.userCredentials.username = '';
          this.userCredentials.password = '';
        } else {
          setTimeout(() => this.$router.push('/'), 500);
        }
      }
      );
    },
    extraData(user_id){
      // PETICIONES DE DATOS EXTRA DEL USUARIO PARA GUARDAR EN COOKIE
      this.$http.get(SERVER_URL + '/users/' + user_id)
      .then(response => response.json())
      .then(function(json){
        console.log('EXTRA DATA' + JSON.stringify(json));
        this.userCookie.email = json.email;
        this.userCookie.cc = json.cc;
        this.userCookie.phone = json.phone;
        this.userCookie.name = json.name;
        this.userCookie.lastname = json.lastname;
        this.userCookie.age = json.age;
        this.userCookie.gender = json.gender;

        this.userCookie.password = this.userCredentials.password
        
        this.$cookie.set('secret', JSON.stringify(this.userCookie), 1);
        console.log('COOKIE SECRET: ' + this.$cookie.get('secret'));
      })      
    },
  }
};
</script>