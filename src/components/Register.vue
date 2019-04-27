<template>
  <div class="registerComponent">
    <div id="divStyle" class="container-fluid">
      <div id="rowStyle" class="row align-items-center">
        <div class="col align-self-center">
            <router-link to="/">
                <img src="../assets/CS_BC.svg" alt="" height="140px" class="iconImage">
            </router-link>
            <div class="fieldsContainer">
                <h3 class="title">Correo electrónico</h3>
                <div class="input-group">
                    <input type="email" class="form-control inputStyles" placeholder="ej. example@email.com">
                </div>
                <div class="divSeparator"></div>
                <h3 class="title">Contraseña</h3>
                <div class="input-group">
                    <input type="password" class="form-control inputStyles" placeholder="********">
                </div>
                <div class="divSeparator"></div>
                <p class="parag" id="registerStyle">¿No tienes una cuenta todavía? <router-link to="/register">Registrate aquí.</router-link></p>
                <button type="button" class="btn btn-primary btn-lg btn-block" id="btnLoginStyle">Ingresar</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>