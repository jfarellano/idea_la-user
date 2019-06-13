<template>
  <!-- MODAL -->
  <div class="main-container">
    <b-modal
      id="survey"
      centered
      scrollable
      title="Priorización de Retos"
      class="modalStyle"
      hide-footer
      hide-header-close
      @hide="prevent"
    >
      <div v-if="selected.length != challenges.length">
				<p class="parag">Selecciona en orden cuales retos te parecen mas importantes</p>
        <b-button
          @click="selectChallenge(challenge)"
          class="challenge"
          v-for="challenge in availableChallenges()"
          :key="challenge.id"
          v-b-tooltip.hover
          :title="challenge.description"
        >{{challenge.title}}</b-button>
      </div>
			<div v-else>
				<p>Este fue el orden que elegiste:</p>
				<ol>
					<li v-for='(challenge, i) in selected' :key="i">{{getElement(challenge).title}}</li>
				</ol>
				<b-button
          @click="clear()"
          class="clear"
        >Reorganizar retos</b-button>
				<b-button
          @click="save()"
          class="challenge"
        >Guardar mi selección</b-button>
			</div>
    </b-modal>
    <b-button @click="open()">Open</b-button>
  </div>
</template>

<script>
import api from "../requests.js";
export default {
  data() {
    return {
      challenges: [],
			selected: [],
			saved: false
    };
  },
  methods: {
    open() {
      this.$bvModal.show("survey");
    },
    prevent(bvModalEvt) {
			if (this.saved){
				this.$bvModal.hide("survey");
			}else{
				bvModalEvt.preventDefault();
			}
    },
    availableChallenges() {
      var here = this;
      return here.challenges.filter(function(challenge) {
        return !here.selected.includes(challenge.id);
      });
    },
    selectChallenge(challenge) {
      this.selected.push(challenge.id);
		},
		getElement(id){
			return this.challenges.filter(function(challenge){
				return challenge.id == id
			})[0]
		},
		clear(){
			this.selected = []
		},
		save(){
			console.log('guardado')
			this.saved = true
			this.$bvModal.hide("survey");
		}
  },
  created() {
    api.challenges.index().then(response => {
      this.challenges = response.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.challenge {
  width: 100%;
  margin-bottom: 7px;
  background-color: #0e2469;
  color: white;
}
.clear{
	width: 100%;
  margin-bottom: 7px;
  background-color: transparent;
	border: solid 1px #0e2469;
  color: #0e2469;
}
</style>

