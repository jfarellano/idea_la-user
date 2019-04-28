<template>
  <div class="idea-show">
    <Header></Header>
    <div class="main-container container-fluid">
      <div class="row first">
        <div class="col">
          <div v-if="idea.picture == null">
            <img
              src="https://ep01.epimg.net/internacional/imagenes/2018/07/23/billete_a_macondo/1532310440_143390_1532310884_noticia_normal.jpg"
            >
          </div>
          <div v-else>
            <img
              v-bind:src="idea.picture.url"
            >
          </div>
        </div>
      </div>
      <div class="row second">
        <h1 class="title">{{idea.title}}</h1>
      </div>
      <div class="row third">
        <p
          class="parag"
        >{{idea.description}}</p>
      </div>
      <div class="row fourth justify-content-center">
        <div v-if="idea.videoLink == ''">
          <iframe
            v-bind:src="idea.videoLink"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div v-else>
          <iframe
            src="https://www.youtube.com/embed/JVRY5z7-MpM"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="row fifth">
        <b-button class="title" v-on:click.prevent="voteForIdea()">Votar por esta idea</b-button>
      </div>

      <div v-if="tokenExists == true">
        <div class="row sixth">
          <b-form-group class="w-comment" label="Cuéntanos que tal te pareció esta idea">
            <b-form-textarea placeholder="Comentario" v-model="newComment"></b-form-textarea>
          </b-form-group>
          <b-button v-on:click.prevent="commentIdea()">Enviar</b-button>
        </div>
      </div>

			<div class="row comments">
				<div class="comment container-fluid">
          <h3 class="title">Comentarios</h3>
          <br>
					<div class="row" v-for="(comment, index) in comments" :key="index">
						<div class="col">
							<p class="parag">{{comment.description}}</p>
              <hr>
						</div>
					</div>
				</div>
			</div>
    </div>
    <b-modal id="modalPopover" title="Felicitaciones" ok-only>
        <p class="parag">Tu voto se ha realizado de manera exitosa.</p>
    </b-modal>
    <b-modal id="modalPopover voted" title="Error" ok-only>
        <p class="parag">Ya has realizado tu voto para esta idea.</p>
    </b-modal>
  </div>
</template>

<script>
import {SERVER_URL} from '../variables.js'

import Header from "./Header.vue";
export default {
  components: {
    Header
  },
  data(){
    return{
      id: '',
      idea:'',
      tokenExists: false,
      userInfo: {
        id:'',
        secret:'',
        expire_at:'',
        name:'',
        lastname:'',
        fullname:''
      },
      comments:[],
      newComment: ''
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
    loadIdeaInfo(){
      this.id = this.$route.params.iId;
      this.$http.get(SERVER_URL + '/ideas/' + this.id).then(function(response){
          this.idea = response.data;
          // console.log('RESPONSE: ' + this.idea);
          console.log('RESPONSE: ' + JSON.stringify(this.idea));
      })
    },
    voteForIdea(){
      if (this.tokenExists == false) {
        this.$router.push('/register');
      } else {
        this.$http.post((SERVER_URL + '/ideas/' + this.id + '/votes')
        , { headers: {Authorization: 'Token token="' + this.userInfo.secret + '"'}}).then(response => response.json())
          .then(function(json){
            console.log(json);
            // this.$bvModal.show("modalPopover");
            this.$bvModal.show("modalPopover voted");
            console.log('ENTRA CORRECTO')
          },
          (err) => {
            console.log("Err", err);
            console.log('ENTRA ERROR')
            // this.$bvModal.show("modalPopover voted");
            this.$bvModal.show("modalPopover");
          }
        );
      }
    },
    loadComments(){
      this.$http.get(SERVER_URL + '/ideas/' + this.id + '/comments').then(function(response){
        this.comments = response.data;
      })
    },
    commentIdea(){
      this.$http.post((SERVER_URL + '/ideas/' + this.id + '/comments'),{
        title: 'Comentario',
        description: this.newComment
      }, { headers: {Authorization: 'Token token="' + this.userInfo.secret + '"'}}).then(response => response.json())
        .then(function(json){
          console.log(json);
          // this.$router.push('/idea');
          location.reload();
        },
        (err) => {
          console.log("Err", err);
        }
      );
    }
  },
  created(){
    this.loadIdeaInfo();
    this.checkToken();
    this.loadComments();
  }
};
</script>
