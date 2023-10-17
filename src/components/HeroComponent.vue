<script setup>
import { ref } from 'vue';
// import axios from 'axios';
// imp ort router from '../router';                           . 
import { useAuthStore } from '../stores/auth.js';

const json = ref({
  email: '',
  password: ''
});

const auth = useAuthStore()

const onSubmit = () => {
  auth.submitForm(json.value);

};

</script>

<template>
  <div data-bs-spy="scroll" data-bs-root-margin="0px 0px -40%" data-bs-target="#navbar-sapvv" data-bs-smooth-scroll="true"
    tabindex="0">

    <div class="container col-xl-10 col-xxl-8 px-4 py-5 min-vh-100 center-vertically" id="hero">
      <div class="row align-items-center g-lg-5 py-5">
        <div class="col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3 text">Sistema de Atencion a Poblacion
            Victima y
            Vulnerable</h1>
          <p class="col-lg-10 fs-4 text-justify">Somos una estructura organizativa y conjunto de programas o servicios
            diseñados para brindar asistencia,
            apoyo y protección a personas que han sufrido situaciones de vulnerabilidad o victimización,
            como víctimas de desastres naturales, violencia, abuso,
            discriminación o cualquier otra circunstancia que los coloque en una posición de debilidad</p>
        </div>

        <!-- <div class="d-lg-none">

        <hr class="border border-primary border-3 opacity-75">

      </div> -->

        <div class="col-md-10 mx-auto col-lg-5">
          <form @submit.prevent="onSubmit" class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            <div class="form-floating mb-3">
              <input type="email" autocomplete="email" v-model="json.email" class="form-control" id="floatingInput"
                placeholder="correo@correo.com">
              <label for="floatingInput">Correo Electronico</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" autocomplete="current-password" v-model="json.password" class="form-control"
                id="floatingPassword" placeholder="Contrasena">
              <label for="floatingPassword">Contrase&ntilde;a</label>
            </div>
            <div class="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me"> Recuerdame
              </label>
            </div>

            <div class="g-recaptcha align-center mw-100" data-sitekey="6Lfws4MoAAAAAIi5jk_hYaqwDz74UWMPeankCfUE"></div>

            <button class="w-100 btn btn-lg btn-primary mt-2" type="submit">Iniciar Sesion</button>

            <!-- <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small> -->
          </form>
        </div>
      </div>
    </div>

    <hr>


    <div class="container col-xl-10 col-xxl-8 px-4 py-5 min-vh-100 center-vertically" id="hero2">

      <div class="row align-items-center g-lg-5 py-5">

        <div class="col-md-10 mx-auto col-lg-5">
          <img src="https://colombiaestudia.com/wp-content/uploads/2021/06/SENA-1.jpg" alt="" width="100%">
        </div>

        <div class="col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3 my-2">Quienes Somos</h1>
          <p class="col-lg-10 fs-4 text-justify">Somos una estructura organizativa y conjunto de programas o servicios
            diseñados para
            brindar asistencia,
            apoyo y protección a personas que han sufrido situaciones de vulnerabilidad o victimización,
            como víctimas de desastres naturales, violencia, abuso,
            discriminación o cualquier otra circunstancia que los coloque en una posición de debilidad</p>
        </div>
      </div>
    </div>

    <hr>

    <div class="container col-xl-10 col-xxl-8 px-4 py-5 min-vh-100 center-vertically" id="hero3">
      <div class="row align-items-center g-lg-5 py-5">
        <div class="col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3 text-">PQR</h1>
          <p class="col-lg-10 fs-4 text-justify">Somos una estructura organizativa y conjunto de programas o servicios
            diseñados para brindar asistencia,
            apoyo y protección a personas que han sufrido situaciones de vulnerabilidad o victimización,
            como víctimas de desastres naturales, violencia, abuso,
            discriminación o cualquier otra circunstancia que los coloque en una posición de debilidad</p>
        </div>



      </div>
    </div>

    <hr>

    <div class="container col-xl-10 col-xxl-8 px-4 py-5 min-vh-100 center-vertically" id="hero4">
      <div class="row align-items-center g-lg-5 py-5">
        <div class="col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3 text-">Contacto</h1>
          <p class="col-lg-10 fs-4 text-justify">Somos una estructura organizativa y conjunto de programas o servicios
            diseñados para brindar asistencia,
            apoyo y protección a personas que han sufrido situaciones de vulnerabilidad o victimización,
            como víctimas de desastres naturales, violencia, abuso,
            discriminación o cualquier otra circunstancia que los coloque en una posición de debilidad</p>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>
.text-justify {
  text-align: justify;
}


.center-vertically {
  display: flex;
  justify-content: center;
  align-items: center;
  /* Esto asegura que el contenedor ocupe toda la altura de la ventana */
}
</style>
