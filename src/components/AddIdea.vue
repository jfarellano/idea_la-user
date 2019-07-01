<template>
  <b-button data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="100" v-if="active" class="add-button title" v-on:click.prevent="createIdea">Postula tu idea</b-button>
</template>

<script>
import auth from "../authentication.js"
  export default {
  data() {
    return {
      active: false
    };
  },
  methods: {
    createIdea() {
      if (auth.storage.get('secret') == null) {
        this.$router.push("/login");
      } else {
        this.$router.push("/creareditaridea/new");
      }
    }
  },
  created() {
    this.active = auth.storage.get('stage') == 1
  }
};
</script>

<style lang="scss" scoped>
.add-button {
  position: fixed;
  padding: 20px;
  z-index: 1000;
  border: none;
  background-color: #0E2469;
  color: white;
  border-radius: 5px;
  right: -3px;
  bottom: 70px;
  -webkit-box-shadow: 0px 12px 40px -12px rgba(14,36,105,0.35); 
  box-shadow: 0px 12px 40px -12px rgba(14,36,105,0.35);
}
</style>