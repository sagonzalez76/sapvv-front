<template>
  <nav class="navbar navbar-expand-lg bg-body-secondary fixed-top max-h-25" id="navbar-sapvv">

    <div class="container-fluid">

      <img class="mx-2" src="https://cdn.contactcenterworld.com/images/company/sena-1200px-logo.png" alt="senalogo"
        width="30">

      <a class="navbar-brand fw-bold d-none d-lg-block text-success" href="#">Coordinacion Misional - Regional Cauca</a>
      <a class="navbar-brand fw-bold d-lg-none" href="#">Coordinacion Misional</a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>

      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>

        <ul class="navbar-nav nav-pills me-2 mb-2 mb-lg-0 rounded-0">
          <li class="nav-item p-1">

            <a class="nav-link rounded-4 px-2" href="#hero">Inicio</a>
          </li>
          <li class="nav-item p-1">
            <a class="nav-link rounded-4 px-2" href="#hero2">Quienes Somos</a>
          </li>
          <li class="nav-item p-1">
            <a class="nav-link rounded-4 px-2" href="#hero3">PQR's</a>
          </li>
          <li class="nav-item p-1">
            <a class="nav-link rounded-4 px-2" href="#hero4">Contacto</a>
          </li>

          <li class="nav-item p-1">
            <a class="nav-link disabled" aria-disabled="true">Sena Comunica</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>





</script>



<style scoped>
.nav-link.active {
  transform: scale(1.07);
  background-color: rgba(4, 125, 0, 0.998);
  color: #fff;
  transition: box-shadow 15s ease;
  transition-duration: 100ms;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);


  /* Cambiar la sombra */

  /* transition: border-width 0.3s ease, border-color 0.3s ease; */
}
</style>

