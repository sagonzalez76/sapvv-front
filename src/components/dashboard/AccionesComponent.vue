<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'


onMounted(() => {



})


const formData = ref(
   {
      nombre: null,
      lastname: null

   }
)

</script>


<template>
   {{ formData }}
   <div class="container">
      <div class="">

         <select name="" id="" v-model="formData.nombre" required>
            <option value="" selected disabled> Elige una opcion: </option>
            <option value="Sory">Sory</option>
            <option value="Otro">Otro</option>
         </select>

      </div>
      <div class="bg-primary" v-if="formData.nombre == 'Sory'">
         primary

      </div>

      <div class="bg-secondary" v-else>

         secondary
      </div>

   </div>
</template>



<style scoped></style>
