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
    await axios.get('http://localhost:8000/departments', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            programs.value = response.data
            // console.log(departments.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}


const getProgram = async (id) => {

    await axios.get('http://localhost:8000/departments/' + id, {
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
    await axios.post('http://localhost:8000/departments', formData.value)
        .then(() => {
            alert('Departamento Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            console.log(error.response.data.error)
        })
}


const editProgram = async (id) => {

    await axios.put(`http://localhost:8000/departments/${id}`, formData.value)
        .then(() => {
            alert('Departamento Actualizado')
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
    await axios.delete('http://localhost:8000/departments/' + id)
        .then(() => {
            alert('Departamento Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(departments.value);
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
        <h2>Departamentos</h2>
        <button type="button" class="btn btn-outline-primary ms-auto" data-bs-toggle="modal"
            data-bs-target="#crearDepartamentoModal">Crear
            Departamento</button>
    </div>


    <div class="table-responsive small my-4 rounded">
        <table id="example" class=" table table-dark table-hover table-striped  stable-sm ">
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
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getProgram(program.id)" type="button" class="btn btn-outline-info"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getProgram(program.id)" type="button" class="btn btn-outline-danger"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearDepartamentoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Departamento </h1>
                        <button type="button" id="cerrarBotonCrear" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Departamento 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Departamento </label>

                        </div>
                       
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="createProgram" type="button" class="btn btn-success">Crear Departamento</button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Departamento
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Departamento 1"
                                v-model="formData.name" >
                            <label for="floatingInputGrid">Nombre del Departamento</label>

                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="editProgram(formData.id)" type="button" class="btn btn-success">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-------------------------------------------------------------------------------------------------------->

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="eliminarModal" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este departamento?
                        </h1>
                        <button type="button" id="cerrarBotonEliminar" class="btn-close" data-bs-dismiss="modal"
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
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="deleteProgram(formData.id)" type="button" class="btn btn-danger">Eliminar</button>
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
</style>
