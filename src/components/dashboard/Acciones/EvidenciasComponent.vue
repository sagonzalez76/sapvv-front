
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'

import { useActionStore } from '../../../stores/action';
import { useAuthStore } from '../../../stores/auth';

const token = useAuthStore().token
const action = useActionStore().action;
const archivosInput = ref(null);
const evidences = ref({})



onMounted(() => {
    getEvidences(action.id)
console.log(action.id)
    // new DataTable('#example');
})



const getEvidences = async () => {

    await axios.get(`http://localhost:8000/actions/${action.id}/evidences`, {
        
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            evidences.value = response.data
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}



const subirArchivos = async () => {
    const archivos = archivosInput.value.files;
    console.log(archivos);
    const formData = new FormData();
    Array.from(archivos).forEach((archivo) => {
        formData.append('id', action.id);
        formData.append('archivos', archivo);
    });

    console.log(formData);

    try {
        await axios.post('http://localhost:8000/evidences', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        alert('Evidencia(s) Creada(s)');

        let botonCerrarModal = document.getElementById('cerrarBotonCrear');
        botonCerrarModal.click();

        // Lógica adicional después de subir los archivos
    } catch (error) {
        console.error('Error al subir archivos:', error.response.data);
    }
};






</script>


<template>
    <body>


        <header class="mb-4">
            <section>

                <h1>Nombre</h1>
                <h4>{{ action.description }}</h4>
                <h1>Estado</h1>
                <h4>{{ action.done }}</h4>
                <h1>Creado</h1>
                <h4>{{ action.createdAt }}</h4>
                <h1>Actualizado</h1>
                <h4>{{ action.updatedAt }}</h4>
            </section>
            <section>

                <button type="button" class="btn btn-outline-primary ms-auto" data-bs-toggle="modal"
                    data-bs-target="#crearAccionModal">Crear Evidencia</button>
            </section>

        </header>

        <main class="my-5">
            <h1>Imagenes</h1>
            <ul>
                <li>
                    uploads\eb3ced79a4b576eba1fad23da78e153b
                    <img src="http://localhost:8000/uploads/eb3ced79a4b576eba1fad23da78e153bg" alt="Mi Archivo">
                   {{evidences}}
                </li>
            </ul>

            <h1>Videos</h1>
            <ul>
                <li>
                    Li
                </li>
            </ul>
            <h1>Documentos</h1>
            <ul>
                <li>
                    Li
                </li>
            </ul>

        </main>
        <footer>

        </footer>


        <div class="modal fade" id="crearAccionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Evidencia </h1> {{ archivosInput }}
                        <button type="button" id="cerrarBotonCrear" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>


                    <form class="modal-body" @submit.prevent="subirArchivos()">

                        <input type="file" ref="archivosInput" class="form-control" id="floatingInputGrid" placeholder=""
                            multiple required>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn btn-success">Crear Accion</button>

                        </div>
                    </form>



                </div>
            </div>
        </div>

    </body>
</template>




<style></style>