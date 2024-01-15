
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'

import { useActionStore } from '../../../stores/action';
import { useAuthStore } from '../../../stores/auth';

const token = useAuthStore().token
const action = useActionStore().action;
const archivosInput = ref(null);
const evidences = ref({})
const servidor = "http://localhost:8000/uploads/"


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

        mostrarModal()
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
    } finally {
        cerrarModal()
    }
};


const isDocument = (type) => {
    return (
        type.startsWith('application/pdf') ||
        type.startsWith('application/msword') ||
        type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        // Agrega otros tipos de documentos según sea necesario
        // ...
    );
};


const modalVisible = ref(false);

// Función para mostrar el modal
const mostrarModal = () => {
    modalVisible.value = true;
};

// Función para cerrar el modal
const cerrarModal = () => {
    // Aquí puedes agregar lógica adicional antes de cerrar el modal, si es necesario.
    modalVisible.value = false;
};


</script>


<template>
    <button @click="mostrarModal">Abrir</button>{{ modalVisible }}



    <body class="container" style="max-width: 100%;">
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
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div v-for="evidence in evidences" :key="evidence.id">
                    <div v-if="evidence.type.startsWith('image/')">
                        <div class="card" style="height: 18rem; overflow: hidden;">
                            <img :src="servidor + evidence.url" class="card-img-top img-fluid" alt="..."
                                style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>
                </div>
            </div>

            <h1>Audios</h1>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div v-for="evidence in evidences" :key="evidence.id">
                    <div v-if="evidence.type.startsWith('audio/')">
                        <div class="card" style="width: 18rem;">
                            <audio controls :src="servidor + evidence.url"></audio>
                        </div>
                    </div>
                </div>
            </div>

            <h1>Videos</h1>
            <div class="row row-cols-1 row-cols-md-4 g-4">
                <div v-for="evidence in evidences" :key="evidence.id">
                    <div v-if="evidence.type.startsWith('video/')">
                        <div class="card" style="width: 18rem;">
                            <video controls :src="servidor + evidence.url"></video>
                            <div class="card-body">
                                <h5 class="card-title">{{ evidence.name }}</h5>
                                <p class="card-text">{{ evidence.createdAt }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h1>Documentos</h1>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div v-for="evidence in evidences" :key="evidence.id">
                    <div v-if="isDocument(evidence.type)">
                        <div class="card" style="width: 18rem;">
                            <a :href="servidor + evidence.url" target="_blank" rel="noopener noreferrer" download>
                                <div class="card-body">
                                    <h5 class="card-title">{{ evidence.type }}</h5>
                                    <p class="card-text">{{ evidence.createdAt }}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>


        <footer>
            <!-- Contenido del pie de página -->
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