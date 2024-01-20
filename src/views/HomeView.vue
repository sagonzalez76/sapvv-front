<script setup>
import FooterComponent from '../components/FooterComponent.vue';
import HeroComponent from '../components/HeroComponent.vue'
import NavBarComponent from '../components/NavBarComponent.vue';
</script>

<template>
  <main class="fade-in-down">
    <NavBarComponent></NavBarComponent>
    <HeroComponent />
    <FooterComponent></FooterComponent>
  </main>
</template>


<style  scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 5;
    transform: translateY(0);
  }
}

.fade-in-down {
  animation: fadeInDown 0.5s ease-out;
}
</style>