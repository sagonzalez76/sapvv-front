<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const origins = ref({})
const emitters = ref({})
const formData = ref({})


const fecha = new Date();
const año = fecha.getFullYear();
const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
const dia = ('0' + fecha.getDate()).slice(-2);
const fechamax = `${año}-${mes}-${dia}`;


onMounted(() => {
    refrescar(),

        new DataTable('#example');
})

const refrescar = async () => {
    await axios.get('http://localhost:8000/origins', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response.data);
            origins.value = response.data
            // console.log(origins.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })



    await axios.get('http://localhost:8000/emitters', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            emitters.value = response.data
            // console.log(emitters.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}


const getOrigin = async (id) => {

    await axios.get('http://localhost:8000/origins/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            formData.value = response.data
        })
        .catch((error) => {
            console.log(error)
        })
}

const createOrigin = async () => {
    console.log(formData.value);
    await axios.post('http://localhost:8000/origins', formData.value)
        .then(() => {
            alert('Origen Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            console.log(error.response.data.error)
        })
}


const editOrigin = async (id) => {

    await axios.put(`http://localhost:8000/origins/${id}`, formData.value)
        .then(() => {
            alert('Origen Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            console.log(error)
        })
}

const deleteOrigin = async (id) => {
    await getOrigin(id)
    await axios.delete('http://localhost:8000/origins/' + id)
        .then(() => {
            alert('Origen Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(origins.value);
            // console.log(response.data);
            refrescar()

        })
        .catch((error) => {
            console.log(error)
        })
}


</script>

<template>
    <div class="d-flex ">
        <h3>Origenes</h3>
        <button type="button" class="btn rounded-0 btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearOrigenModal">Crear
            Origen</button>
    </div>
    <!-- {{ origins }} -->


    <div class="table-responsive small my-4 rounded">
        <table id="" class=" table table-dark table-hover table-striped  stable-sm ">
            <thead>
                <tr class="text-center align-middle">
                    <!-- <th scope="col" class="col-1">ID</th> -->
                    <th scope="col" class="col-auto">Nombre</th>
                    <th scope="col" class="col-auto">Tipo</th>
                    <th scope="col" class="col-auto">Radicado</th>
                    <th scope="col" class="col-auto">Fecha Expedicion</th>
                    <th scope="col" class="col-auto">Fecha Notificacion</th>
                    <th scope="col" class="col-auto">Entidad que Emite</th>
                    <th scope="col" class="col-2">Acciones</th>
                </tr>
            </thead>

            <tbody>

                <tr class="text-center align-middle text-break" v-for="origin in origins" :key=origin.id
                    style="height: 100;">
                    <!-- <td class="py-1 ">{{ origin.id }}</td> -->
                    <td>{{ origin.name }}</td>
                    <td>{{ origin.type }}</td>
                    <td>{{ origin.filing }}</td>
                    <td>{{ origin.origin_date }}</td>
                    <td>{{ origin.notification_date }}</td>
                    <td>{{ origin.emitter.name }}</td>
                    <td>
                        <div class="btn rounded-0-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getOrigin(origin.id)" type="button" class="btn rounded-0 btn-outline-info"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getOrigin(origin.id)" type="button" class="btn rounded-0 btn-outline-danger"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearOrigenModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Origen
                        </h1>
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>


                    <form class="modal-body" @submit.prevent="createOrigin()">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Origen </label>

                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.type" required>
                                <option disabled selected>Selecciona el tipo de origen</option>
                                <option value="Concertacion" class="text-capitalize"> Concertacion
                                </option>
                                <option value="Alerta Temprana" class="text-capitalize"> Alerta Temprana
                                </option>
                                <option value="Muto Propio" class="text-capitalize"> Muto Propio
                                </option>
                                <option value="Sentencia" class="text-capitalize"> Sentencia</option>
                                <option value="Auto" class="text-capitalize"> Auto</option>

                            </select>
                            <label for="floatingSelectGrid">Tipo Origen</label>
                        </div>

                        <div v-if="formData.type === 'Sentencia' || formData.type === 'Auto'">
                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                    v-model="formData.filing" required>
                                <label for="floatingInputGrid">Radicado </label>

                            </div>
                            <div class="form-floating my-2">
                                <input type="date" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                    :max=fechamax v-model="formData.origin_date" required>
                                <label for="floatingInputGrid">Fecha Expedicion </label>

                            </div>
                            <div class="form-floating my-2">
                                <input type="date" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                    :max=fechamax :min=formData.origin_date v-model="formData.notification_date" required>
                                <label for="floatingInputGrid">Fecha Notificacion </label>

                            </div>
                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.emitterId" required>
                                <option disabled selected>Selecciona una Entidad</option>
                                <option v-for="emitter in emitters" :key="emitter.id" :value="emitter.id"
                                    class="text-capitalize">{{ emitter.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Entidad que Emite</label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn rounded-0 btn-success">Crear Origen</button>
                        </div>
                    </form>



                </div>
            </div>
        </div>

        <!---------------------------------------------------------------------------------------------------------------->


        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Origen
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form class="modal-body" @submit.prevent="editOrigin(formData.id)">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Origen </label>

                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.type" required>
                                <option disabled selected>Selecciona el tipo de origen</option>
                                <option value="Concertacion" class="text-capitalize"> Concertacion
                                </option>
                                <option value="Alerta Temprana" class="text-capitalize"> Alerta Temprana
                                </option>
                                <option value="Muto Propio" class="text-capitalize"> Muto Propio
                                </option>
                                <option value="Sentencia" class="text-capitalize"> Sentencia</option>
                                <option value="Auto" class="text-capitalize"> Auto</option>

                            </select>
                            <label for="floatingSelectGrid">Tipo Origen</label>
                        </div>

                        <div v-if="formData.type === 'Sentencia' || formData.type === 'Auto'">
                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                    v-model="formData.filing" required>
                                <label for="floatingInputGrid">Radicado </label>

                            </div>
                            <div class="form-floating my-2">
                                <input type="date" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                    :max=fechamax v-model="formData.origin_date" required>
                                <label for="floatingInputGrid">Fecha Expedicion </label>

                            </div>
                            <div class="form-floating my-2">
                                <input type="date" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                    :max=fechamax :min=formData.origin_date v-model="formData.notification_date" required>
                                <label for="floatingInputGrid">Fecha Notificacion </label>

                            </div>
                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.emitterId" required>
                                <option disabled selected>Selecciona una Entidad</option>
                                <option v-for="emitter in emitters" :key="emitter.id" :value="emitter.id"
                                    class="text-capitalize">{{ emitter.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Entidad que Emite</label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn rounded-0 btn-success">Guardar</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>

        <!-------------------------------------------------------------------------------------------------------->

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="eliminarModal" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este origen?
                        </h1>
                        <button type="button" id="cerrarBotonEliminar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive small my-4">
                            <table class=" table table-light table-hover table-striped  stable-sm ">
                                <thead>
                                    <tr>
                                        <th v-for="(value, key) in formData" :key="key">{{ key }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(value, key) in formData" :key="key">{{ value }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="deleteOrigin(formData.id)" type="button"
                            class="btn rounded-0 btn-danger">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>



<style scoped>
.bi {
    display: inline-block;
    width: 1rem;
    height: 1rem;
}

/*
 * Sidebar
 */

@media (min-width: 768px) {
    .sidebar .offcanvas-lg {
        position: -webkit-sticky;
        position: sticky;
        top: 48px;
    }

    .navbar-search {
        display: block;
    }
}

.sidebar .nav-link {
    font-size: .875rem;
    font-weight: 500;
}

.sidebar .nav-link.active {
    color: #2470dc;
}

.sidebar-heading {
    font-size: .75rem;
}

/*
 * Navbar
 */
.navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    background-color: rgba(0, 0, 0, .25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control {
    padding: .75rem 1rem;
}

.btn-success {

    background-color: rgba(4, 125, 0, 0.998);

}
</style>
