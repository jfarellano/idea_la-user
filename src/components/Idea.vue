<template>
  <div class="idea-show">
    <Header></Header>
    <div class="main-container container-fluid">
      <div class="row first">
        <div class="col">
          <img
            src="https://ep01.epimg.net/internacional/imagenes/2018/07/23/billete_a_macondo/1532310440_143390_1532310884_noticia_normal.jpg"
          >
        </div>
      </div>
      <div class="row second">
        <h1 class="title">El nombre de la idea</h1>
      </div>
      <div class="row third">
        <p
          class="parag"
        >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, repellendus repudiandae debitis id numquam, quibusdam placeat sit necessitatibus non libero, quo veritatis error velit est labore voluptatibus nobis assumenda alias!</p>
      </div>
      <div class="row fourth justify-content-center">
        <iframe
          src="https://www.youtube.com/embed/JVRY5z7-MpM"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="row fifth">
        <b-button class="title">Votar por esta idea</b-button>
      </div>
      <div class="row sixth">
        <b-form-group class="w-comment" label="Cuentanos que tal te parecio esta idea">
          <b-form-textarea placeholder="Comentario"></b-form-textarea>
        </b-form-group>
				<b-button>Enviar</b-button>
      </div>
			<div class="row comments">
				<div class="comment container-fluid">
					<div class="row">
						<div class="col">
							<h4 class="title">Nombre</h4>
							<p class="parag">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quam tempore placeat dicta illum fugit non culpa minus sint, odio perferendis praesentium voluptas rerum dolorum hic repudiandae, ullam inventore! At.</p>
						</div>
					</div>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
export default {
  components: {
    Header
  }
};
</script>
