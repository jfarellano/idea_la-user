<template>
  <div class="idea-show">
    <Header></Header>
    <Idea></Idea>

    <div class="main-idea-show container-fluid">
      <div class="row carousell">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Text slides with image -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=52"></b-carousel-slide>
        </b-carousel>
      </div>
      <div class="row title">
        <h1>Titulo de la idea</h1>
      </div>
      <div class="row parag">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias consequuntur, fugiat placeat est incidunt quam mollitia quae id minus maiores, repellendus molestias quidem sequi dolor accusamus esse, sit earum impedit?</p>
      </div>
      <div class="row vote">
        <b-button>Votar por este proyecto</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Idea from "./addIdea.vue";
export default {
  components: {
    Header,
    Idea
  }
};
</script>
