<template>
  <div class="myProfileComponent">
    <Header></Header>
    <Idea></Idea>
  <div class="main-container container-fluid">
    <div class="row align-items-center">
      <div class="col centerProfileName align-self-center">
        <h1 class="title">{{userInfo.fullname}}</h1>
        <hr>
      </div>
    </div>
    <div class="row rowInfoStyle align-items-center">
      <div class="col align-self-center">
        <h5 class="parag">{{userInfo.email}}</h5>
      </div>
      <div class="col align-self-center">
        <h4 class="parag">10 Ideas Creadas</h4>
      </div>
      <div class="col align-self-center">
        <h5 class="parag">CC.: {{userInfo.cc}}</h5>
      </div>
    </div>

    <div class="row second justify-content-around">
    <div class="col align-self-center">
      <div>
        <b-card no-body>
          <b-tabs card>
            <!-- <b-tab v-bind:title="challenge.title" active v-for="(challenge, index) in challenges" :key="index">  -->
            <b-tab title="TEST" active>
              <div class="row justify-content-around">
                <div class="idea container-fluid">
                  <div class="row image">
                    <img src="https://ep01.epimg.net/internacional/imagenes/2018/07/23/billete_a_macondo/1532310440_143390_1532310884_noticia_normal.jpg" alt="Imagen de reto">
                  </div>
                  <div class="row data">
                    <h3 class="title">Titulo</h3>
                    <p class="parag">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sodales tempor libero sit amet auctor...</p>
                    <div class="row align-self-end rowStyle">
                      <div class="col align-self-center">
                        <!-- <router-link to="/crearEditarIdea"> -->
                          <!-- <img src="../assets/edit.png" alt="" height="40px" class="editImage" v-on:click.prevent="addToCart($route.params.pId)"> -->
                          <img src="../assets/edit.png" alt="" height="40px" class="editImage" v-on:click.prevent="editIdea">
                        <!-- </router-link> -->
                        <!-- <router-link to="/crearEditarIdea"> -->
                          <img src="../assets/delete.png" alt="" height="40px" class="editImage" v-on:click.prevent="deleteIdea">
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="idea container-fluid">
                  <div class="row image">
                    <img src="https://ep01.epimg.net/internacional/imagenes/2018/07/23/billete_a_macondo/1532310440_143390_1532310884_noticia_normal.jpg" alt="Imagen de reto">
                  </div>
                  <div class="row data">
                    <h3 class="title">Titulo</h3>
                    <p class="parag">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sodales tempor libero sit amet auctor...</p>
                    <div class="row align-self-end rowStyle">
                      <div class="col align-self-center">
                        <img src="../assets/edit.png" alt="" height="40px" class="editImage">
                        <img src="../assets/delete.png" alt="" height="40px" class="editImage">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                

            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import api from '../requests.js'

import Header from './Header.vue'
import Idea from "./AddIdea.vue";

export default {
  components: {
    Header,
    Idea
  },
  data(){
    return{
      challenges: [
        {
          id: '1',
          title: 'Seguridad'
        },
        {
          id: '2',
          title: 'Medio Ambiente'
        },
        {
          id: '3',
          title: 'Entretenimiento'
        },
        {
          id: '4',
          title: 'Movilidad'
        },
        {
          id: '5',
          title: 'Justicia'
        }
      ],
      tokenExists: false,
      userInfo: {},
      ideas:[]
    }
  },
  methods:{
    checkToken(){
      if (this.$cookie.get('secret') == null) {
        this.tokenExists = false;
      } else {
        this.tokenExists = true;
        console.log("COOKIE: " + this.$cookie.get('secret'));
        var userInfo = JSON.parse(this.$cookie.get('secret'));
        this.userInfo.id = userInfo.user_id;
        this.userInfo.secret = userInfo.secret;
        this.userInfo.expire_at = userInfo.expire_at;
        this.userInfo.name = userInfo.name;
        this.userInfo.lastname = userInfo.lastname;
        this.userInfo.email = userInfo.email;
        this.userInfo.cc = userInfo.cc;
      }
    },
    buildFullName(){
      const nameCapitalized = this.userInfo.name.charAt(0).toUpperCase() + this.userInfo.name.slice(1)
      const lastnameCapitalized = this.userInfo.lastname.charAt(0).toUpperCase() + this.userInfo.lastname.slice(1)
      this.userInfo.fullname = nameCapitalized + " " + lastnameCapitalized
    },
    editIdea(){
      console.log('Editar Idea')
    },
    deleteIdea(){
      console.log('Eliminar Idea')
    },
    getIdeas(){
      api.myProfile.getIdeas().then(response => {
        this.ideas = response.data
      }).catch(err => {
        console.log(err.data)
      })
    }
  },
  created(){
    this.checkToken();
    setTimeout(() => this.buildFullName(), 500);
    this.getIdeas();
  }
}
</script>


<style scoped style lang="scss">
.myProfileComponent {
  .main-container {
    margin-top: 110px;
    .centerProfileName {
      text-align: center;
      margin: 20px;
    }
    .rowInfoStyle {
      text-align: center;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .first{
      padding: 50px;
    }
    .second{
      padding: 50px;
      background-color: #e6e6e6;

      .idea{
        margin: 5px;
        background-color: white;
        width: 300px;
        height: 400px;
        border: 1px solid #e6e6e6;
        .image{
          height: 150px;
          background-color: #ffe01b;
          img{
            overflow: hidden;
            height: 150px;
            margin: auto;
          }
        }
        .data{
          padding: 20px;
          h3{
            border-bottom: 4px solid #ffe01b;
            padding-bottom: 0.5px;
          }
          p{
            margin-top: 10px;
            text-align: justify;
          }
        }
      }
    }
  }
  .editImage {
    margin: 5px;
    margin-left: 45px;
    cursor: pointer;
  }
  .deleteImage {
    margin: 5px;
    cursor: pointer;
  }
  .rowStyle {
    width: 100%;
    margin: auto;
  }
}
</style>