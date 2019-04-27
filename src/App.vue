<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto+Slab');

  .title {
    font-family: 'Roboto Slab', serif;
  }
  .parag {
    font-family: 'Montserrat', sans-serif;
  }
  #app {
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: justify; */
    /* color: #2c3e50; */
    /* margin-top: 60px; */
  }
</style>