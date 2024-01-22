<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const comunitys = ref({})
const municipalitys = ref({})
const type_comunitys = ref({})
const formData = ref({})


formData.value.holder_type = "Comunidad"


onMounted(() => {
    refrescar(),

        new DataTable('#example');
})

const refrescar = async () => {
    await axios.get('https://sapvv-front.onrender.com/comunitys', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            comunitys.value = response.data
            // console.log(comunitys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })



    await axios.get('https://sapvv-front.onrender.com/type_comunitys', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            type_comunitys.value = response.data
            // console.log(type_comunitys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })


    await axios.get('https://sapvv-front.onrender.com/municipalitys', {

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

}


const getComunity = async (id) => {

    await axios.get('https://sapvv-front.onrender.com/comunitys/' + id, {
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

const createComunity = async () => {
    console.log(formData.value);
    await axios.post('https://sapvv-front.onrender.com/comunitys', formData.value)
        .then(() => {
            alert('Comunidad Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            alert('Comunidad ya existe')
            console.log(error)
        })
}


const editComunity = async (id) => {

    await axios.put(`https://sapvv-front.onrender.com/comunitys/${id}`, formData.value)
        .then(() => {
            alert('Comunidad Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            alert(error.response.data.message)
            console.log(error)
        })
}

const deleteComunity = async (id) => {
    await getComunity(id)
    await axios.delete('https://sapvv-front.onrender.com/comunitys/' + id)
        .then(() => {
            alert('Comunidad Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(comunitys.value);
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
        <h3>Comunidades</h3>
        <button type="button" class="btn rounded-0 btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearComunidadModal">Crear
            Comunidad</button>
        <!-- {{ comunitys }}  -->
    </div>
    <!-- {{ comunitys }} -->


    <div class="table-responsive small my-4 rounded">
        <table id="" class=" table table-dark table-hover table-striped  stable-sm ">
            <thead>
                <tr class="text-center align-middle">
                    <th scope="col" class="col-1">ID</th>
                    <th scope="col" class="col-auto">Tipo de Comunidad al que pertenece</th>
                    <th scope="col" class="col-1">Municipios a los que pertenece</th>
                    <th scope="col" class="col-auto">Nombre de la Comunidad</th>
                    <th scope="col" class="col-2">Acciones</th>
                </tr>
            </thead>

            <tbody>

                <tr class="text-center align-middle text-break" v-for="comunity in comunitys" :key=comunity.id
                    style="height: 100;">
                    <td class="py-1 ">{{ comunity.id }}</td>
                    <td>{{ comunity.typeComunity.name }}</td>
                    <!-- <td>{{ comunity.typeComunityId }}</td> -->

                    <td> <span v-for="municipality in comunity.municipalitys" :key="municipality.id">{{ municipality.name
                    }}<br> </span></td>
                    <td>{{ comunity.name }}</td>

                    <td>
                        <div class="btn rounded-0-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getComunity(comunity.id)" type="button" class="btn rounded-0 btn-outline-info"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getComunity(comunity.id)" type="button" class="btn rounded-0 btn-outline-danger"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearComunidadModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content modal-dialog-scrollable">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Comunidad </h1>
                        <!-- {{
                            formData }} -->
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Comunidad 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Comunidad </label>

                        </div>

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.typeComunityId" required>
                                <option disabled selected>Selecciona el el tipo de Comunidad</option>
                                <option v-for="type_comunity in type_comunitys" :key="type_comunity.id"
                                    :value="type_comunity.id" class="text-capitalize">{{ type_comunity.name }}</option>
                            </select>

                            <label for="floatingSelectGrid">Tipo de Comunidad</label>
                        </div>


                        <div class="form-floating my-2">


                            <select class="form-select h-auto" id="floatingSelectGrid" v-model="formData.municipalityIds"
                                multiple required>
                                <option disabled selected>Selecciona los municipios</option>
                                <option v-for="municipality in municipalitys" :key="municipality.id"
                                    :value="municipality.id" class="text-capitalize">{{ municipality.name }}</option>

                            </select>


                            <label for="floatingSelectGrid">Asocia la comunidad a uno o mas municipios</label>
                        </div>





                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="createComunity" type="button" class="btn rounded-0 btn-success">Crear
                            Comunidad</button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Comunidad <br>
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="editComunity(formData.id)">
                        <div class="modal-body">

                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Comunidad 1"
                                    v-model="formData.name" required>
                                <label for="floatingInputGrid">Nombre del Comunidad</label>

                            </div>
                            <div class="form-floating my-2">


                                <select class="form-select" id="floatingSelectGrid" v-model="formData.typeComunityId"
                                    required>
                                    <option selected disabled>Selecciona el el tipo de Comunidad</option>
                                    <option v-for="type_comunity in type_comunitys" :key="type_comunity.id"
                                        :value="type_comunity.id" class="text-capitalize">{{ type_comunity.name }}</option>

                                </select>

                                <label for="floatingSelectGrid">Ubicacion</label>
                            </div>

                            <div class="form-floating my-2">
                                <tr class="text-center align-middle text-break" v-for="comunity in comunitys"
                                    :key=comunity.id style="height: 100;">

                                    <!-- <td> <span v-for="municipality in comunity.municipalitys" :key="municipality.id">{{
                                    municipality.name }}<br> </span></td> -->
                                </tr>

                            </div>


                            <div class="form-floating my-2">
                                <!-- {{ municipalitys }} -->
                                <!-- {{ formData.municipalitys[0] }} -->
                            </div>


                            <div class="form-floating my-2">
                                <select class="form-select h-auto" id="floatingSelectGrid"
                                    v-model="formData.municipalityIds" required multiple>
                                    <option disabled>Selecciona los municipios:</option>
                                    <option v-for="municipality in municipalitys" :key="municipality.id"
                                        :value="municipality.id" class="text-capitalize"
                                        :selected="formData.municipalitys && formData.municipalitys.some(item => item.id === municipality.id)">
                                        {{ municipality.name }}
                                    </option>

                                </select>


                                <label for="floatingSelectGrid">Asocia la comunidad a uno o mas municipios</label>
                            </div>

                            <div v-for="municipality in municipalitys" :key="municipality.id">

                            </div>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <!-- <button @click="editComunity(formData.id)" type="button"
                                class="btn rounded-0 btn-success">Guardar</button> -->
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
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este comunidad?
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
                        <button @click="deleteComunity(formData.id)" type="button"
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
