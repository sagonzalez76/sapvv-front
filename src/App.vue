<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <!-- <div class="smooth-scroll-container"> -->
    <RouterView />
  <!-- </div> -->
</template>

<style scoped>


*{
  font-family: 'Work Sans';
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */

  /* color: #b60404;
  background-color: #008304f0;*/
  font-size: 1rem; 
  /* margin: 0;
  padding: 0; */
}

.smooth-scroll-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  scroll-behavior: smooth;
  /* Ajusta la altura según tus necesidades */
}

.smooth-scroll-container div {
  scroll-snap-align: start;
  /* Ajusta otros estilos según tus necesidades */
}

</style>
