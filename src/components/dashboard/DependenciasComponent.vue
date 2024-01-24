<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const programs = ref({})
const formData = ref({})

onMounted(() => {
    refrescar()

    // new DataTable('#example');
})

const refrescar = async () => {
    await axios.get('https://sapvv-back.onrender.com/dependencys', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            programs.value = response.data
            // console.log(dependencys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}


const getProgram = async (id) => {

    await axios.get('https://sapvv-back.onrender.com/dependencys/' + id, {
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

const createProgram = async () => {
    console.log(formData.value);
    await axios.post('https://sapvv-back.onrender.com/dependencys', formData.value)
        .then(() => {
            alert('Dependencia Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            console.log(error.response.data.error)
        })
}


const editProgram = async (id) => {

    await axios.put(`https://sapvv-back.onrender.com/dependencys/${id}`, formData.value)
        .then(() => {
            alert('Dependencia Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            console.log(error)
        })
}

const deleteProgram = async (id) => {
    await getProgram(id)
    await axios.delete('https://sapvv-back.onrender.com/dependencys/' + id)
        .then(() => {
            alert('Dependencia Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(dependencys.value);
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
        <h3>Dependencias</h3>
        <button type="button" class="btn rounded-0 btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearDependenciaModal">Crear
            Dependencia</button>
    </div>


    <div class="table-responsive small my-4 rounded">
        <table id="example" class=" table bg-secondary table-hover table-striped  stable-sm ">
            <thead>
                <tr class="text-center align-middle">
                    <th scope="col" class="col-1">ID</th>
                    <th scope="col" class="col-auto">Nombre</th>
                    <th scope="col" class="col-2">Acciones</th>
                </tr>
            </thead>

            <tbody>
                <tr class="text-center align-middle text-break" v-for="program in programs" :key=program.id
                    style="height: 100;">
                    <td class="py-1 ">{{ program.id }}</td>
                    <td>{{ program.name }}</td>
                    <td>
                        <div class="btn rounded-0-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getProgram(program.id)" type="button" class="btn rounded-0 btn-outline-info"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getProgram(program.id)" type="button" class="btn rounded-0 btn-outline-danger"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearDependenciaModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">

                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Dependencia </h1>
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Dependencia 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Dependencia </label>

                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="createProgram" type="button" class="btn rounded-0 btn-success">Crear
                            Dependencia</button>
                    </div>
                </div>
            </div>
        </div>

        <!---------------------------------------------------------------------------------------------------------------->


        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Dependencia
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Dependencia 1"
                                v-model="formData.name">
                            <label for="floatingInputGrid">Nombre del Dependencia</label>

                        </div>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="editProgram(formData.id)" type="button"
                            class="btn rounded-0 btn-success">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-------------------------------------------------------------------------------------------------------->

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="eliminarModal" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este dependencia?
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
                        <button @click="deleteProgram(formData.id)" type="button"
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
