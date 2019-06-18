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
  p{
    white-space: pre-wrap;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>