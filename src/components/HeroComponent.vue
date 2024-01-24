<script setup>
import { ref, onMounted } from 'vue';
// import axios from 'axios';
// imp ort router from '../router';                           . 
import { useAuthStore } from '../stores/auth.js';

const json = ref({
  email: '',
  password: ''
});
const authStore = useAuthStore();
const signIn = ref(authStore.signIn);
const auth = useAuthStore()

onMounted(() => {
  signIn.value = authStore.signIn;
});

const onSubmit = () => {
  auth.submitForm(json.value)

};

</script>

<template>
  <div data-bs-spy="scroll" data-bs-root-margin="0px 0px -40%" data-bs-target="#navbar-sapvv" data-bs-smooth-scroll="true"
    tabindex="0" class="papa">

    <div class="container col-xl-10 col-xxl-8 px-4 py-4 min-vh-100  center-vertically" id="hero">
      <div class="row align-items-center g-lg-5 py-5">
        <div class="col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3 text ">Sistema de Atencion a Poblacion
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

        <div class="col-md-10 mx-auto col-lg-5 px-1 ">
          <form @submit.prevent="onSubmit" class="p-4 p-md-5 border rounded-3 ">
            <div class="form-floating mb-3 ">
              <input type="email" autocomplete="email" v-model="json.email" class="form-control" id="floatingInput"
                placeholder="correo@correo.com" required>
              <label for="floatingInput">Correo Electronico</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" autocomplete="current-password" v-model="json.password" class="form-control"
                id="floatingPassword" placeholder="Contrasena" required>
              <label for="floatingPassword">Contrase&ntilde;a</label>
            </div>
            <div class="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me"> Recuerdame
              </label>
            </div>

            <div class="g-recaptcha align-center mw-100" data-sitekey="6Lfws4MoAAAAAIi5jk_hYaqwDz74UWMPeankCfUE"></div>

            <button v-if=!authStore.signIn class="w-100 btn btn-lg btn-primary mt-2 rounded-0" type="submit">Iniciar
              Sesion
            </button>


            <button v-else class="btn rounded-0 btn-primary w-100 btn btn-lg mt-2" type="button" disabled>
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status"> Cargando...</span>
            </button>

            <!-- <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small> -->
          </form>
        </div>
      </div>
    </div>

    <hr>


    <div class="container col-xl-10 col-xxl-8 px-4 py-4 min-vh-100  center-vertically" id="hero2">

      <div class="row align-items-center g-lg-5 py-5">


        <div class="col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3 my-2">Quienes Somos</h1>
          <p class="col-lg-10 fs-4 text-justify">Somos una estructura organizativa y conjunto de programas o servicios
            diseñados para
            brindar asistencia,
            apoyo y protección a personas que han sufrido situaciones de vulnerabilidad o victimización,
            como víctimas de desastres naturales, violencia, abuso,
            discriminación o cualquier otra circunstancia que los coloque en una posición de debilidad</p>
        </div>

        <div class="col-md-10 mx-auto col-lg-5 p-0">
          <img src="/imagen3.png" alt="" width="100%" height="">
        </div>

      </div>
    </div>

    <hr>

    <div class="container col-xl-10 col-xxl-8 px-4 py-4 min-vh-100  center-vertically" id="hero3">
      <div class="row align-items-center g-lg-5 py-5 ">
        <div class="col-md-10 mx-0 col-lg-5">
          <img src="/imagen2.png" alt="" width="100%" id="imagen2">
        </div>
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

    <div class="container col-xl-10 col-xxl-8 px-4 py-4 min-vh-100  center-vertically" id="hero4">
      <div class="row align-items-center g-lg-5 py-5">
        <div class="col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3 text-">Contacto</h1>
          <p class="col-lg-10 fs-4 text-justify">Somos una estructura organizativa y conjunto de programas o servicios
            diseñados para brindar asistencia,
            apoyo y protección a personas que han sufrido situaciones de vulnerabilidad o victimización,
            como víctimas de desastres naturales, violencia, abuso,
            discriminación o cualquier otra circunstancia que los coloque en una posición de debilidad</p>
        </div>
        <div class="col-md-10 mx-0 col-lg-5">
          <img src="/imagen4.png" alt="" width="100%" id="imagen4">
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>
.text-justify {
  text-align: justify;
}

img {

  object-fit: fill;
}

.center-vertically {
  display: flex;
  justify-content: center;
  align-items: center;
  /* Esto asegura que el contenedor ocupe toda la altura de la ventana */
}

.row {
  /* background-image: url('../../public/imagen2.png') !important;
  background-size: cover !important; */
  position: relative;
}



.row img {
  width: 100%;
  mask-image: linear-gradient(to top, transparent, white 10%);

}

@media (max-width: 768px) {
  .container {
    width: 100%;
    margin: 0 10px;
  }

  #imagen2 {
    margin-block-end: 50px;
  }

  #imagen4 {
    margin-block-start: 50px;
  }
}

form {
  background-color: rgba(4, 131, 0, 0.09);

}
</style>
