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
  @import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');

  *{
    font-family: 'Rubik', sans-serif;
  }
  .jump{
    white-space: pre-line;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>