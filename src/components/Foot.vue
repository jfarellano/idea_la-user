<template>
  <section class="footer-style">
    <b-row>
      <b-col align="center">
          <img class="logo-ideala col" href="https://idea-la.com/" src="../assets/ideala.png"/>
          <br>
          <a class="link-terms" href="https://idea-la.com/">www.idea-la.com</a>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <p>© Derechos reservados a Ideala Group</p>
      </b-col>
      <b-col align="right">
        <a 
          class="link-terms" 
          href="http://www.camarabaq.org.co/desarrollo-regional/ideas/bases-imagina-tu-ciuda/"
          target="_blank"
        >Términos y condiciones</a>
      </b-col>
    </b-row>
  </section>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.logo-ideala {
  width: 200px;
}
.footer-style {
  background: #081641;
  color: white;
  margin: 0px;
  margin-top: 40px;
  padding: 20px;
  padding-left: 270px;
  padding-right: 270px;
  @media (max-width: 767.98px) {
    padding-left: 0px !important;
    padding-right: 0px;
  }
}
.link-terms {
  color: white
}

</style>