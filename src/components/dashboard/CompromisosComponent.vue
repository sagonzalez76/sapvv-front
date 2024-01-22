<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const commitments = ref({})
const origins = ref({})
const formData = ref({})



onMounted(() => {
    refrescar(),

        new DataTable('#example');
})

const refrescar = async () => {
    await axios.get('https://sapvv-front.onrender.com/commitments', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            commitments.value = response.data
            // console.log(commitments.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })



    await axios.get('https://sapvv-front.onrender.com/origins', {


        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            origins.value = response.data
            // console.log(origins.value);
            // console.log("Esta es la respuesta" + response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}


const getCommitment = async (id) => {

    await axios.get('https://sapvv-front.onrender.com/commitments/' + id, {
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

const createCommitment = async () => {
    console.log(formData.value);
    await axios.post('https://sapvv-front.onrender.com/commitments', formData.value)
        .then(() => {
            alert('Compromiso Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            console.log(error.response.data.error)
        })
}


const editCommitment = async (id) => {

    await axios.put(`https://sapvv-front.onrender.com/commitments/${id}`, formData.value)
        .then(() => {
            alert('Compromiso Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            console.log(error)
        })
}

const deleteCommitment = async (id) => {
    await getCommitment(id)
    await axios.delete('https://sapvv-front.onrender.com/commitments/' + id)
        .then(() => {
            alert('Compromiso Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(commitments.value);
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
        <h3>Compromisos</h3>
        <button type="button" class="btn rounded-0 btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearCompromisoModal">Crear
            Compromiso</button>
    </div>
    <!-- {{ commitments }} -->


    <div class="table-responsive small my-4 rounded">
        <table id="" class=" table table-dark table-hover table-striped  stable-sm ">
            <thead>
                <tr class="text-center align-middle">
                    <!-- <th scope="col" class="col-1">ID</th> -->
                    <th scope="col" class="col-auto">Nombre</th>

                    <th scope="col" class="col-auto">Origen del Compromiso</th>
                    <th scope="col" class="col-2">Acciones</th>
                </tr>
            </thead>

            <tbody>

                <tr class="text-center align-middle text-break" v-for="commitment in commitments" :key=commitment.id
                    style="height: 100;">
                    <!-- <td class="py-1 ">{{ commitment.id }}</td> -->
                    <td>{{ commitment.name }}</td>
                    <td>{{ commitment.origin.name }}</td>
                    <td>
                        <div class="btn rounded-0-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getCommitment(commitment.id)" type="button"
                                class="btn rounded-0 btn-outline-info" data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getCommitment(commitment.id)" type="button"
                                class="btn rounded-0 btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearCompromisoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Compromiso
                        </h1>
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>


                    <form class="modal-body" @submit.prevent="createCommitment()">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Compromiso 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre / Descripcion del Compromiso </label>

                        </div>



                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.originId" required>
                                <option disabled selected>Selecciona un Origen</option>
                                <option v-for="origin in origins" :key="origin.id" :value="origin.id"
                                    class="text-capitalize">{{ origin.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Origen</label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn rounded-0 btn-success">Crear Compromiso</button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Compromiso
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form class="modal-body" @submit.prevent="editCommitment(formData.id)">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Compromiso 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Compromiso </label>

                        </div>

                        <div v-if="formData.type === 'Sentencia' || formData.type === 'Auto'">
                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Compromiso 1"
                                    v-model="formData.filing" required>
                                <label for="floatingInputGrid">Radicado </label>

                            </div>
                            <div class="form-floating my-2">
                                <input type="date" class="form-control" id="floatingInputGrid" placeholder="Compromiso 1"
                                    :max=fechamax v-model="formData.commitment_date" required>
                                <label for="floatingInputGrid">Fecha Expedicion </label>

                            </div>
                            <div class="form-floating my-2">
                                <input type="date" class="form-control" id="floatingInputGrid" placeholder="Compromiso 1"
                                    :max=fechamax :min=formData.commitment_date v-model="formData.notification_date"
                                    required>
                                <label for="floatingInputGrid">Fecha Notificacion </label>

                            </div>
                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.originId" required>
                                <option disabled selected>Selecciona una Entidad</option>
                                <option v-for="origin in origins" :key="origin.id" :value="origin.id"
                                    class="text-capitalize">{{ origin.name }}</option>

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
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este compromiso?
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
                        <button @click="deleteCommitment(formData.id)" type="button"
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
