<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const measures = ref({})
const comunitys = ref({})
const commitments = ref({})

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
    await axios.get('http://localhost:8000/measures', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            measures.value = response.data
            // console.log(measures.value);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })



    await axios.get('http://localhost:8000/all', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            comunitys.value = response.data
            // console.log(municipalitys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })


    await axios.get('http://localhost:8000/commitments', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            commitments.value = response.data
            // console.log(municipalitys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}


const getMeasure = async (id) => {

    await axios.get('http://localhost:8000/measures/' + id, {
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

const createMeasure = async () => {
    console.log(formData.value);
    await axios.post('http://localhost:8000/measures', formData.value)
        .then(() => {
            alert('Medida Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            console.log(error.response.data.error)
        })
}


const editMeasure = async (id) => {

    await axios.put(`http://localhost:8000/measures/${id}`, formData.value)
        .then(() => {
            alert('Medida Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            alert(error.response.data.message)
            console.log(error)
        })
}

const deleteMeasure = async (id) => {
    await getMeasure(id)
    await axios.delete('http://localhost:8000/measures/' + id)
        .then(() => {
            alert('Medida Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(measures.value);
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
        <h3>Medidas</h3>
        <button type="button" class="btn rounded-0 btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearMedidaModal">Crear
            Medida</button>
    </div>
    <!-- {{ measures }} -->


    <div class="table-responsive small my-4 rounded">
        <table id="" class=" table bg-secondary table-hover table-striped  stable-sm ">
            <thead>
                <tr class="text-center align-middle">
                    <th scope="col" class="col-1">ID</th>

                    <!-- <th scope="col" class="col-auto">Departamento al que pertenece</th> -->
                    <!-- <th scope="col" class="col-1">ID Departamento</th> -->
                    <th scope="col" class="col-auto">Nombre</th>
                    <th scope="col" class="col-auto">Estado</th>
                    <th scope="col" class="col-auto">Anio</th>
                    <th scope="col" class="col-auto">Comunidades Asociadas a la Medida</th>


                    <th scope="col" class="col-2">Acciones</th>
                </tr>
            </thead>

            <tbody>

                <tr class="text-center align-middle text-break" v-for="measure in measures" :key=measure.id
                    style="height: 100;">
                    <td class="py-1 ">{{ measure.id }}</td>
                    <!-- <td>{{ measure.department.name }}</td> -->
                    <td>{{ measure.name }}</td>
                    <td>{{ measure.state }}</td>
                    <td>{{ measure.year }}</td>
                    <td class="align-middle"> <span v-for="comunity in measure.comunitys" :key="comunity.id"> {{
                        comunity.name }}<br><br> </span>
                    </td>

                    <td>
                        <div class="btn rounded-0-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getMeasure(measure.id)" type="button" class="btn rounded-0 btn-outline-info"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getMeasure(measure.id)" type="button" class="btn rounded-0 btn-outline-danger"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearMedidaModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">

                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Medida </h1>
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="createMeasure()" class="modal-body">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Medida 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Medida </label>

                        </div>

                        <div class="form-floating my-2">
                            <input type="number" class="form-control" id="floatingInputGrid" placeholder="Medida 1"
                                min="1900" :max=año v-model="formData.year" required>
                            <label for="floatingInputGrid">Anio de la Medida </label>
                        </div>


                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.state" required>
                                <option disabled selected>Selecciona el Estado de la Medida</option>
                                <option value="Por Atender" class="text-capitalize"> Por Atender
                                </option>
                                <option value="En Atencion" class="text-capitalize"> En Atencion
                                </option>
                                <option value="Atendido" class="text-capitalize"> Atendido
                                </option>

                            </select>
                            <label for="floatingSelectGrid">Estado</label>
                        </div>


                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.comunityIds" multiple
                                required>
                                <option disabled selected>Selecciona una o mas Comunidades</option>
                                <option v-for="comunity in comunitys" :key="comunity.id" :value="comunity.id"
                                    class="text-capitalize">{{ comunity.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Comunidad, Titular o Emprendedor</label>
                        </div>
                        <br><br>
                        <br>

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.commitmentId" multiple
                                required>
                                <option disabled selected>Selecciona un Compromiso</option>
                                <option v-for="commitment in commitments" :key="commitment.id" :value="commitment.id"
                                    class="text-capitalize">{{ commitment.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Compromiso</label>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn rounded-0 btn-success">Crear
                                Medida</button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Medida
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Medida 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Medida </label>

                        </div>

                        <div class="form-floating my-2">
                            <input type="number" class="form-control" id="floatingInputGrid" placeholder="Medida 1"
                                min="1900" :max=año v-model="formData.year" required>
                            <label for="floatingInputGrid">Anio de la Medida </label>
                        </div>
                        <!-- <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.departmentId" required>
                                <option disabled selected>Selecciona el departamento</option>
                                <option v-for="department in departments" :key="department.id" :value="department.id"
                                    class="text-capitalize">{{ department.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Ubicacion</label>
                        </div> -->

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.state" required>
                                <option disabled selected>Selecciona el Estado de la Medida</option>
                                <option value="Por Atender" class="text-capitalize"> Por Atender
                                </option>
                                <option value="En Atencion" class="text-capitalize"> En Atencion
                                </option>
                                <option value="Atendido" class="text-capitalize"> Atendido
                                </option>

                            </select>
                            <label for="floatingSelectGrid">Estado</label>
                        </div>

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.comunityIds" multiple
                                required>
                                <option disabled selected>Selecciona una o mas Comunidades</option>
                                <option v-for="comunity in comunitys" :key="comunity.id" :value="comunity.id"
                                    class="text-capitalize">{{ comunity.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Comunidad, Titular o Emprendedor</label>
                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.commitmentId" multiple
                                required>
                                <option disabled selected>Selecciona un Compromiso</option>
                                <option v-for="commitment in commitments" :key="commitment.id" :value="commitment.id"
                                    class="text-capitalize">{{ commitment.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Compromiso</label>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="editMeasure(formData.id)" type="button"
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
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este medida?
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
                        <button @click="deleteMeasure(formData.id)" type="button"
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
