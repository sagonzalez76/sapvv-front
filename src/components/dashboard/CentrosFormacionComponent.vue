<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const trainingcenters = ref({})
const regionals = ref({})
const municipalitys = ref({})
const formData = ref({})

onMounted(() => {
    refrescar(),

        new DataTable('#example');
})

const refrescar = async () => {
    await axios.get('https://sapvv-back.onrender.com/training_centers', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            trainingcenters.value = response.data
            // console.log(trainingcenters.value);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })



    await axios.get('https://sapvv-back.onrender.com/regionals', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            regionals.value = response.data
            // console.log(regionals.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })



    await axios.get(`https://sapvv-back.onrender.com/municipalitys`, {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            municipalitys.value = response.data
            // console.log(regionals.value);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })


}

const getDepartmentMunicipalitys = async () => {

    // await axios.get(`https://sapvv-back.onrender.com/departments/${formData.value.regionalId}/municipalitys`, {

    //     //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

    //     headers: {
    //         'Authorization': `Bearer ${token}`,

    //     },
    // })
    //     .then((response) => {
    //         municipalitys.value = response.data
    //         // console.log(regionals.value);
    //         console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
}



const getTrainingCenter = async (id) => {

    await axios.get('https://sapvv-back.onrender.com/training_centers/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            formData.value = response.data
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}

const createTrainingCenter = async () => {
    // console.log(formData.value);
    await axios.post('https://sapvv-back.onrender.com/training_centers', formData.value)
        .then(() => {
            alert('Centro de Formacion Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
             alert(error.response.data.message)
            // console.log(error.response.data.message)
        })
}


const editTrainingCenter = async (id) => {

    await axios.put(`https://sapvv-back.onrender.com/training_centers/${id}`, formData.value)
        .then(() => {
            alert('Centro de Formacion Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            alert(error.response.data.message)
            console.log(error)
        })
}

const deleteTrainingCenter = async (id) => {
    await getTrainingCenter(id)
    await axios.delete('https://sapvv-back.onrender.com/training_centers/' + id)
        .then(() => {
            alert('Centro de Formacion Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(trainingcenters.value);
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
        <h3>Centro de Formacion</h3>
        <button type="button" class="btn rounded-0 btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearMunicipioModal">Crear
            Centro de Formacion</button>
    </div>
    <!-- {{ trainingcenters }} -->


    <div class="table-responsive small my-4 rounded">
        <table id="" class=" table bg-secondary table-hover table-striped  stable-sm ">
            <thead class="">
                <tr class="text-center align-middle">
                    <th scope="col" class="col-1">ID</th>

                    <th scope="col" class="col-auto">Codigo</th>
                    <th scope="col" class="col-auto">Nombre</th>
                    <th scope="col" class="col-auto">Regional a la que pertenece</th>
                    <!-- <th scope="col" class="col-auto">Ubicacion</th> -->

                    <th scope="col" class="col-2">Acciones</th>
                </tr>
            </thead>

            <tbody>

                <tr class="text-center align-middle text-break" v-for="trainingcenter in trainingcenters"
                    :key=trainingcenter.id style="height: 100;">
                    <td class="py-1 ">{{ trainingcenter.id }}</td>

                    <td>{{ trainingcenter.code }}</td>
                    <td>{{ trainingcenter.name }}</td>
                    <td>{{ trainingcenter.regional.name }}</td>
                    <!-- <td>{{ trainingcenter.municipality.name }}</td> -->


                    <td>
                        <div class="btn rounded-0-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getTrainingCenter(trainingcenter.id)" type="button"
                                class="btn rounded-0 btn-outline-info" data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getTrainingCenter(trainingcenter.id)" type="button"
                                class="btn rounded-0 btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearMunicipioModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">

                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Centro de Formacion </h1>
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="createTrainingCenter(formData.id)" class="modal-body">
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid"
                                placeholder="Centro de Formacion 1" v-model="formData.code" required>
                            <label for="floatingInputGrid">Codigo del Centro de Formacion </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid"
                                placeholder="Centro de Formacion 1" v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Centro de Formacion </label>

                        </div>
                        <div class="form-floating my-2">
                            <select @change="getDepartmentMunicipalitys()" class="form-select" id="floatingSelectGrid"
                                v-model="formData.regionalId" required>
                                <option disabled selected>Selecciona la regional a la que pertenece el Centro</option>
                                <option v-for="regional in regionals" :key="regional.id" :value="regional.id"
                                    class="text-capitalize">{{ regional.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Regional</label>
                        </div>
                        <!-- <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.municipalityId" required>
                                <option disabled selected>Selecciona el municipio en el que se ubica el Centro</option>
                                <option v-for="municipality in municipalitys" :key="municipality.id"
                                    :value="municipality.id" class="text-capitalize">{{ municipality.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Municipio</label>
                        </div> -->
                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn rounded-0 btn-success">Crear
                                Centro de Formacion</button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Centro de Formacion {{ formData }}
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form class="modal-body">
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid"
                                placeholder="Centro de Formacion 1" v-model="formData.code" required>
                            <label for="floatingInputGrid">Codigo del Centro de Formacion </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid"
                                placeholder="Centro de Formacion 1" v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Centro de Formacion</label>

                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.regionalId" required>
                                <option disabled selected>Selecciona la regional a la que pertenece el Centro</option>
                                <option v-for="regional in regionals" :key="regional.id" :value="regional.id"
                                    class="text-capitalize">{{ regional.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Regional</label>
                        </div>
                        <!-- <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.municipalityId" required>
                                <option disabled selected>Selecciona el municipio en el que se ubica el Centro</option>
                                <option v-for="municipality in municipalitys" :key="municipality.id"
                                    :value="municipality.id" class="text-capitalize">{{ municipality.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Municipio</label>
                        </div> -->
                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button @click="editTrainingCenter(formData.id)" type="button"
                                class="btn rounded-0 btn-success">Guardar</button>
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
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este centro de formacion?
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
                        <button @click="deleteTrainingCenter(formData.id)" type="button"
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
