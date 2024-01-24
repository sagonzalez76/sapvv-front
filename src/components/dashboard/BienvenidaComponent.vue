<script setup>
import { useAuthStore } from '../../stores/auth';
// const token = useAuthStore().token
const role = useAuthStore().tokenRole

</script>

<template>
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center" id="container">
        <div class="col-md-6 p-lg-5 mx-auto my-5">
            <h1 class="display-1 fw-bold">Bienvenido!!!</h1>
            <h3 class="fw-normal text-muted mb-3">Maneja y Administra la informacion a la medida de un <p
                    class="text-uppercase">{{ role }}
                </p>
            </h3>
            <div class="d-flex gap-3 justify-content-center lead fw-normal">
                <a class="icon-link" href="#">
                    Mas
                    <svg class="bi">
                        <use xlink:href="#chevron-right" />
                    </svg>
                </a>
                <a class="icon-link" href="#">
                    Iniciar
                    <svg class="bi">
                        <use xlink:href="#chevron-right" />
                    </svg>
                </a>
            </div>
        </div>
        <div class="product-device shadow-sm d-none d-md-block"></div>
        <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
</template>


<style scoped>
#container {
    background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.889), rgb(232, 255, 235)) !important;

}
</style>

