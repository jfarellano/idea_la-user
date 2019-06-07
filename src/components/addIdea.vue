<template>
  <b-button class="add-button title" v-on:click.prevent="createIdea">Agrega nueva idea</b-button>
</template>

<script>
export default {
  data() {
    return {
      tokenExists: false,
      userInfo: {
        id: "",
        secret: "",
        expire_at: "",
        name: "",
        lastname: "",
        fullname: ""
      }
    };
  },
  methods: {
    createIdea() {
      this.checkToken();
      if (this.tokenExists == false) {
        this.$router.push("/login");
      } else {
        this.$router.push("/creareditaridea");
      }
    },
    checkToken() {
      if (this.$cookie.get("secret") == null) {
        this.tokenExists = false;
      } else {
        this.tokenExists = true;
        console.log("COOKIE: " + this.$cookie.get("secret"));
        var userInfo = JSON.parse(this.$cookie.get("secret"));
        this.userInfo.id = userInfo.user_id;
        this.userInfo.secret = userInfo.secret;
        this.userInfo.expire_at = userInfo.expire_at;
        this.userInfo.name = userInfo.name;
        this.userInfo.lastname = userInfo.lastname;
      }
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.add-button {
  position: fixed;
  padding: 20px;
  z-index: 1000;
  border: none;
  background-color: #ffe01b;
  color: #4d4d4d;
  border-radius: 0px;
  right: 0px;
  bottom: 70px;
  -webkit-box-shadow: -19px 17px 25px -12px rgba(115, 115, 115, 0.53);
  -moz-box-shadow: -19px 17px 25px -12px rgba(115, 115, 115, 0.53);
  box-shadow: -19px 17px 25px -12px rgba(115, 115, 115, 0.53);
}
</style>
