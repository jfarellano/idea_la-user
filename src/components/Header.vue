<template>
  <b-navbar toggleable="lg" fixed="top">
    <b-navbar-brand href="#">
      <img src="../assets/CS_BC.svg" alt="IdeaLa">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-button class="login" rigth>Search</b-button> -->

        <b-nav-item-dropdown text="Juan Arellano" class="title user-drop" right>
          <b-dropdown-item class="title" href="#">Mi Perfil</b-dropdown-item>
          <b-dropdown-item class="title" href="#">Mis Ideas</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item class="title signout" href="#">Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>

