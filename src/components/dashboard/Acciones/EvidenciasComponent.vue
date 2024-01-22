
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'

import { useActionStore } from '../../../stores/action';
import { useAuthStore } from '../../../stores/auth';

const token = useAuthStore().token
const action = useActionStore().action;
const archivosInput = ref(null);
const images = ref({})
const videos = ref({})
const audios = ref({})
const documentos = ref({})


const servidor = "https://sapvv-front.onrender.com/uploads/"


onMounted(() => {
    getImages(action.id)
    getVideos(action.id)
    getAudios(action.id)
    getDocumentos(action.id)


    calcularTiempoTranscurrido()
    console.log(action.id)
    // new DataTable('#example');
})



const getImages = async () => {

    await axios.get(`https://sapvv-front.onrender.com/actions/${action.id}/evidences/images`, {

        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            images.value = response.data
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}

const getVideos = async () => {

    await axios.get(`https://sapvv-front.onrender.com/actions/${action.id}/evidences/videos`, {

        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            videos.value = response.data
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}
const getAudios = async () => {

    await axios.get(`https://sapvv-front.onrender.com/actions/${action.id}/evidences/audios`, {

        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            audios.value = response.data
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}
const getDocumentos = async () => {

    await axios.get(`https://sapvv-front.onrender.com/actions/${action.id}/evidences/documentos`, {

        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            documentos.value = response.data
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


        await axios.post('https://sapvv-front.onrender.com/evidences', formData, {
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
        // cerrarModal()
    }
}


const calcularTiempoTranscurrido = (createdAt) => {
    const fechaSubida = new Date(createdAt);
    const ahora = new Date();

    const diferenciaEnMilisegundos = ahora - fechaSubida;
    const diferenciaEnSegundos = Math.floor(diferenciaEnMilisegundos / 1000);
    const diferenciaEnMinutos = Math.floor(diferenciaEnSegundos / 60);
    const diferenciaEnHoras = Math.floor(diferenciaEnMinutos / 60);
    const diferenciaEnDias = Math.floor(diferenciaEnHoras / 24);
    const diferenciaEnSemanas = Math.floor(diferenciaEnDias / 7);
    const diferenciaEnMeses = Math.floor(diferenciaEnDias / 30);
    const diferenciaEnAnios = Math.floor(diferenciaEnDias / 365);

    if (diferenciaEnSegundos < 60) {
        return 'Hace un momento';
    } else if (diferenciaEnMinutos < 60) {
        return `Hace ${diferenciaEnMinutos} min`;
    } else if (diferenciaEnHoras < 24) {
        return `Hace ${diferenciaEnHoras} hr`;
    } else if (diferenciaEnDias < 7) {
        return `Hace ${diferenciaEnDias} day`;
    } else if (diferenciaEnSemanas < 4) {
        return `Hace ${diferenciaEnSemanas} semanas`;
    } else if (diferenciaEnMeses < 12) {
        return `Hace ${diferenciaEnMeses} mes`;
    } else {
        return `Hace ${diferenciaEnAnios} año`;
    }
}


const descargarArchivo = async (url) => {

    await axios.get(`https://sapvv-front.onrender.com/download/${url}`, {


    })
        .then((response) => {
            console.log(response.config);
            const link = document.createElement('a');
            link.href = `https://sapvv-front.onrender.com/download/${url}`;
            // link.target = '_blank';   Abre el enlace en una nueva pestaña
            link.download = ''; // Puedes establecer un nombre de archivo si lo deseas
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            console.log(error)
        })

}
const verArchivo = async (url) => {

    await axios.get(`https://sapvv-front.onrender.com/download/${url}`, {

        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            const link = document.createElement('a');
            link.href = `https://sapvv-front.onrender.com/uploads/${url}`;
            link.target = '_blank'; // Abre el enlace en una nueva pestaña
            // Puedes establecer un nombre de archivo si lo deseas
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            console.log(error)
        })

}

</script>


<template>
    <body class="container" style="max-width: 100%;">
        <header class="d-flex justify-content-center py-0 mb-2 border-bottom">
            <p class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <img class="bi me-2" width="75" height="70" src="/sena_logo_png.png">
                <span class="fs-6 text-break">{{ action.description }}</span>
            </p>

            <button type="button" class="btn rounded-0 btn-primary ms-5 btn-sm my-3 rounded-0" data-bs-toggle="modal"
                data-bs-target="#crearAccionModal">Crear Evidencia</button>
        </header>

        <main class="my-5">
            <h1>Imagenes</h1>
            <div v-if="images[0]" class="album py-2 mb-5 bg-body-secondary border-rounded rounded-4">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
                        <div class="col" v-for="image in images" :key="image.id">
                            <div class="card shadow-sm" v-if="image.type.startsWith('image/')">
                                <div class="image-container" style="max-height: ;">
                                    <img :src="servidor + image.url" class="card-img-top img-fluid object-fit-cover"
                                        alt="..." />
                                </div>
                                <div class="card-body">
                                    <p class="card-text text-center fw-bold text-center fw-bold">{{ image.name }}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn rounded-0-group">
                                            <button type="button" class="btn rounded-0 btn-sm btn-outline-secondary"
                                                @click="verArchivo(image.url)">Ver</button>
                                            <button type="button" class="btn rounded-0 btn-sm btn-outline-secondary"
                                                @click="descargarArchivo(image.url)">Descargar</button>
                                        </div>
                                        <small class="text-body-secondary">{{ calcularTiempoTranscurrido(image.createdAt)
                                        }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 v-else class="">No hay imagenes disponible</h5>

            <hr>
            <h1>Audios</h1>

            <div v-if="audios[0]" class="album py-2 mb-5 bg-body-secondary border-rounded rounded-4">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3">
                        <div class="col" v-for="audio in audios" :key="audio.id">
                            <div class="card shadow-sm text-center" v-if="audio.type.startsWith('audio/')">
                                <audio controls :src="servidor + audio.url" class="mx-auto mt-3"></audio>

                                <div class="card-body">
                                    <p class="card-text text-center fw-bold">{{ audio.name }}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn rounded-0-group">
                                            <button type="button" class="btn rounded-0 btn-sm btn-outline-secondary"
                                                @click="verArchivo(audio.url)">Ver</button>
                                            <button type="button" class="btn rounded-0 btn-sm btn-outline-secondary"
                                                @click="descargarArchivo(audio.url)">Descargar</button>
                                        </div>
                                        <small class="text-body-secondary">{{ calcularTiempoTranscurrido(audio.createdAt)
                                        }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 v-else class="">No hay audios disponible</h5>

            <hr>
            <h1>Videos</h1>

            <div v-if="videos[0]" class="album py-2 mb-5 bg-body-secondary border-rounded rounded-4">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div class="col" v-for="video in videos" :key="video.id">
                            <div class="card shadow-sm" v-if="video.type.startsWith('video/')">
                                <video controls :src="servidor + video.url"></video>

                                <div class="card-body">
                                    <p class="card-text text-center fw-bold">{{ video.name }}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn rounded-0-group">
                                            <button type="button" class="btn rounded-0 btn-sm btn-outline-secondary"
                                                @click="verArchivo(video.url)">Ver</button>
                                            <button type="button" class="btn rounded-0 btn-sm btn-outline-secondary"
                                                @click="descargarArchivo(video.url)">Descargar</button>
                                        </div>
                                        <small class="text-body-secondary">{{ calcularTiempoTranscurrido(video.createdAt)
                                        }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 v-else class="">No hay videos disponible</h5>

            <hr>
            <h1>Documentos</h1>
            <div v-if="documentos[0]" class="album py-2 mb-5 bg-body-secondary border-rounded rounded-4">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div class="col" v-for="documento in documentos" :key="documento.id">
                            <div class="card shadow-sm">
                                <!-- Utilizar el icono correspondiente al tipo de documento -->
                                <h2 v-if="documento.type.startsWith('application/pdf')" class="text-center my-3"><i
                                        class="bi bi-file-earmark-pdf-fill"></i></h2>
                                <h2 v-else-if="documento.type.startsWith('application/msword')" class="text-center my-3"><i
                                        class="bi bi-file-earmark-word-fill text-center"></i></h2>
                                <h2 v-else-if="documento.type.startsWith('application/vnd.ms-excel')"
                                    class="text-center my-3"><i class="bi bi-file-earmark-spreadsheet-fill text-center"></i>
                                </h2>
                                <h2 v-else-if="documento.type.startsWith('application/x-compressed')"
                                    class="text-center my-3"> <i class="bi bi-file-earmark-zip-fill text-center"></i></h2>

                                <!-- Puedes agregar más condiciones según los tipos de documentos que necesites -->
                                <div class="card-body text-center">
                                    <a class="card-text text-center fw-bold text-wrap link-success link-offset-2 link-underline-opacity-0"
                                        href="www.google.com">{{ documento.name }}</a>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn rounded-0-group">
                                            <button type="button" class="btn rounded-0 btn-sm btn-outline-secondary"
                                                @click="verArchivo(documento.url)">Ver</button>
                                            <button type="button" class="btn rounded-0 btn-sm btn-outline-secondary"
                                                @click="descargarArchivo(documento.url)">Descargar</button>
                                        </div>
                                        <small class="text-body-secondary">{{
                                            calcularTiempoTranscurrido(documento.createdAt) }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 v-else class="">No hay documentos disponible</h5>


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
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form class="modal-body" @submit.prevent="subirArchivos()">
                        <input type="file" ref="archivosInput" class="form-control" id="floatingInputGrid" placeholder=""
                            multiple required>
                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn rounded-0 btn-success">Crear Accion</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>




    </body>
</template>

<style>
* {

    font-family: 'Work Sans';
}

.object-fit-cover {
    object-fit: cover;
    height: 15rem;
}


.album {

    animation: fadeIn 2s
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.01);
    }


}

@keyframes fadeIn {


    0% {
        opacity: 0;
    }

    50% {
        transform: opacity 5;
    }

    100% {
        transform: opacity 0;
    }

}
</style>








<!-- <div class="accordion" id="imagenesAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="imagenesHeader">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#imagenesCollapse" aria-expanded="true" aria-controls="imagenesCollapse">
                  Imagenes
                </button>
              </h2>
              <div id="imagenesCollapse" class="accordion-collapse collapse show" aria-labelledby="imagenesHeader" data-bs-parent="#imagenesAccordion">
                <div class="accordion-body">
                  <div class="album py-2 mb-5 bg-body-secondary border-rounded rounded-4">
             
            <div class="album py-2 mb-5 bg-body-secondary border-rounded rounded-4">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
                        <div class="col" v-for="image in images" :key="image.id">
                            <div class="card shadow-sm" v-if="image.type.startsWith('image/')">
                                <div class="image-container" style="max-height: 300px;">
                                    <img :src="servidor + image.url" class="card-img-top img-fluid" alt="..."
                                        style="width: 100%; height: 15rem; object-fit:fill; max-width: 100;" />
                                </div>
<div class="card-body">
                                    <p class="card-text text-center fw-bold text-center fw-bold">{{ image.name }}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn rounded-0-group">
                                            <button type="button" class="btn rounded-0 btn-sm btn-outline-secondary"
                                                @click="verArchivo(image.url)">Ver</button>
                                            <button type="button" class="btn rounded-0 btn-sm btn-outline-secondary"
                                                @click="descargarArchivo(image.url)">Descargar</button>
                                        </div>
<small class="text-body-secondary">{{ calcularTiempoTranscurrido(image.createdAt)
                                        }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
              </div>
            </div>
          </div></div> -->
