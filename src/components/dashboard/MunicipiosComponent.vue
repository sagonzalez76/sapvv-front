<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const municipalitys = ref({})
const departments = ref({})
const formData = ref({})

onMounted(() => {
    refrescar(),

        new DataTable('#example');
})

const refrescar = async () => {
    await axios.get('http://localhost:8000/municipalitys', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            municipalitys.value = response.data
            // console.log(municipalitys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })



    await axios.get('http://localhost:8000/departments', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            departments.value = response.data
            // console.log(departments.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}


const getMunicipality = async (id) => {

    await axios.get('http://localhost:8000/municipalitys/' + id, {
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

const createMunicipality = async () => {
    console.log(formData.value);
    await axios.post('http://localhost:8000/municipalitys', formData.value)
        .then(() => {
            alert('Municipio Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            console.log(error.response.data.error)
        })
}


const editMunicipality = async (id) => {

    await axios.put(`http://localhost:8000/municipalitys/${id}`, formData.value)
        .then(() => {
            alert('Municipio Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            console.log(error)
        })
}

const deleteMunicipality = async (id) => {
    await getMunicipality(id)
    await axios.delete('http://localhost:8000/municipalitys/' + id)
        .then(() => {
            alert('Municipio Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(municipalitys.value);
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
        <h3>Municipios</h3>
        <button type="button" class="btn btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearMunicipioModal">Crear
            Municipio</button>
    </div>
    <!-- {{ municipalitys }} -->


    <div class="table-responsive small my-4 rounded">
        <table id="" class=" table table-dark table-hover table-striped  stable-sm ">
            <thead>
                <tr class="text-center align-middle">
                    <th scope="col" class="col-1">ID</th>

                    <th scope="col" class="col-auto">Departamento al que pertenece</th>
                    <th scope="col" class="col-1">ID Departamento</th>
                    <th scope="col" class="col-auto">Nombre</th>
                    <th scope="col" class="col-2">Acciones</th>
                </tr>
            </thead>

            <tbody>

                <tr class="text-center align-middle text-break" v-for="municipality in municipalitys" :key=municipality.id
                    style="height: 100;">
                    <td class="py-1 ">{{ municipality.id }}</td>
                    <td>{{ municipality.department.name }}</td>
                    <td>{{ municipality.departmentId }}</td>
                    <td>{{ municipality.name }}</td>


                    <td>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getMunicipality(municipality.id)" type="button" class="btn btn-outline-info"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getMunicipality(municipality.id)" type="button" class="btn btn-outline-danger"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearMunicipioModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Municipio </h1>
                        <button type="button" id="cerrarBotonCrear" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Municipio 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Municipio </label>

                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.departmentId" required>
                                <option disabled selected>Selecciona el departamento</option>
                                <option v-for="department in departments" :key="department.id" :value="department.id"
                                    class="text-capitalize">{{ department.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Ubicacion</label>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="createMunicipality" type="button" class="btn btn-success">Crear Municipio</button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Municipio {{ formData }}
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Municipio 1"
                                v-model="formData.name">
                            <label for="floatingInputGrid">Nombre del Municipio</label>

                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.departmentId" required>
                                <option disabled selected>Selecciona el departamento</option>
                                <option v-for="department in departments" :key="department.id" :value="department.id"
                                    class="text-capitalize">{{ department.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Ubicacion</label>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="editMunicipality(formData.id)" type="button"
                            class="btn btn-success">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-------------------------------------------------------------------------------------------------------->

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="eliminarModal" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este municipio?
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
                        <button @click="deleteMunicipality(formData.id)" type="button"
                            class="btn btn-danger">Eliminar</button>
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
