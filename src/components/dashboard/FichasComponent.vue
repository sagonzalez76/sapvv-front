<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const worksheets = ref({})
const actions = ref({})
const formData = ref({})

onMounted(() => {
    refrescar()
})

const refrescar = async () => {
    await axios.get('https://sapvv-back.onrender.com/worksheets', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            worksheets.value = response.data
            // console.log(worksheets.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })



    await axios.get('https://sapvv-back.onrender.com/actions', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })

        .then((response) => {
            actions.value = response.data
            // console.log(actions.value);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}


const getWorksheet = async (id) => {

    await axios.get('https://sapvv-back.onrender.com/worksheets/' + id, {
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

const createWorksheet = async () => {
    console.log(formData.value);
    await axios.post('https://sapvv-back.onrender.com/worksheets', formData.value)
        .then(() => {
            alert('Ficha Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            console.log(error.response.data.error)
        })
}


const editWorksheet = async (id) => {

    await axios.put(`https://sapvv-back.onrender.com/worksheets/${id}`, formData.value)
        .then(() => {
            alert('Ficha Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            console.log(error)
        })
}

const deleteWorksheet = async (id) => {
    await getWorksheet(id)
    await axios.delete('https://sapvv-back.onrender.com/worksheets/' + id)
        .then(() => {
            alert('Ficha Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(worksheets.value);
            // console.log(response.data);
            refrescar()

        })
        .catch((error) => {
            console.log(error)
        })
}

const fecha = new Date();
const año = fecha.getFullYear();
const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
const dia = ('0' + fecha.getDate()).slice(-2);
const fechamax = `${año}-${mes}-${dia}`;

</script>

<template>
    <div class="d-flex ">
        <h3>Fichas</h3>
        <button type="button" class="btn rounded-0 btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearFichaModal">Crear
            Ficha</button>
    </div>
    <!-- {{ worksheets }} -->


    <div class="table-responsive small my-4 rounded">
        <table id="" class=" table bg-secondary table-hover table-striped  stable-sm ">
            <thead>
                <tr class="text-center align-middle">
                    <th scope="col" class="col-1">ID</th>

                    <th scope="col" class="col-auto">Accion asociada</th>

                    <th scope="col" class="col-auto">Numero de la Ficha</th>
                    <th scope="col" class="col-auto">Estado de la Ficha</th>
                    <th scope="col" class="col-auto">Fecha Inicio</th>
                    <th scope="col" class="col-auto">Fecha Finalizacion</th>
                    <th scope="col" class="col-auto">Nombre Responsable</th>
                    <th scope="col" class="col-auto">Apellido Responsable</th>
                    <th scope="col" class="col-auto">Correo Electronico Responsable</th>
                    <th scope="col" class="col-auto">Telefono del Responsable</th>




                    <th scope="col" class="col-2">Acciones</th>
                </tr>
            </thead>

            <tbody>

                <tr class="text-center align-middle text-break" v-for="worksheet in worksheets" :key=worksheet.id
                    style="height: 100;">
                    <td class="py-1 ">{{ worksheet.id }}</td>
                    <td>{{ worksheet.action.description }}</td>

                    <td>{{ worksheet.number }}</td>
                    <td>{{ worksheet.state }}</td>
                    <td>{{ worksheet.start_date }}</td>
                    <td>{{ worksheet.end_date }}</td>
                    <td>{{ worksheet.responsible_name }}</td>
                    <td>{{ worksheet.responsible_lastname }}</td>
                    <td>{{ worksheet.responsible_email }}</td>
                    <td>{{ worksheet.responsible_phone }}</td>
                    <td>
                        <div class="btn rounded-0-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getWorksheet(worksheet.id)" type="button" class="btn rounded-0 btn-outline-info"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getWorksheet(worksheet.id)" type="button"
                                class="btn rounded-0 btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearFichaModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">

                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Ficha </h1>
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="createWorksheet()" class="modal-body">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Ficha 1"
                                v-model="formData.number" required>
                            <label for="floatingInputGrid">Numero de la Ficha </label>

                        </div>


                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.state" required>
                                <option disabled selected>Selecciona el estado de la Ficha</option>
                                <option value="Sin Iniciar" class="text-capitalize">Sin Iniciar</option>
                                <option value="En Proceso" class="text-capitalize">En Proceso</option>
                                <option value="Terminada" class="text-capitalize">Terminada</option>

                            </select>
                            <label for="floatingSelectGrid">Estado</label>
                        </div>


                        <div class="form-floating my-2">
                            <input type="date" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                :max=fechamax v-model="formData.start_date" required>
                            <label for="floatingInputGrid">Fecha Inicio </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="date" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                :max=fechamax :min=formData.start_date v-model="formData.end_date" required>
                            <label for="floatingInputGrid">Fecha Finalizacion </label>

                        </div>


                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                v-model="formData.responsible_name" required>
                            <label for="floatingInputGrid">Nombre del Responsable </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                v-model="formData.responsible_lastname" required>
                            <label for="floatingInputGrid">Apellido del Responsable </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="email" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                v-model="formData.responsible_email" required>
                            <label for="floatingInputGrid">Correo Electronico del Responsable </label>

                        </div>

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                v-model="formData.responsible_phone" required>
                            <label for="floatingInputGrid">Telefono del Responsable </label>

                        </div>


                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.actionId" required>
                                <option disabled selected>Selecciona y asocia la ficha a una Accion</option>
                                <option v-for="action in actions" :key="action.id" :value="action.id"
                                    class="text-capitalize">{{ action.description }}</option>

                            </select>
                            <label for="floatingSelectGrid">Accion</label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn rounded-0 btn-success">Crear
                                Ficha</button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Ficha
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="editWorksheet(formData.id)" class="modal-body">
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Ficha 1"
                                v-model="formData.number" required>
                            <label for="floatingInputGrid">Numero de la Ficha </label>

                        </div>


                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.state" required>
                                <option disabled selected>Selecciona el estado de la Ficha</option>
                                <option value="Sin Iniciar" class="text-capitalize">Sin Iniciar</option>
                                <option value="En Proceso" class="text-capitalize">En Proceso</option>
                                <option value="Terminada" class="text-capitalize">Terminada</option>

                            </select>
                            <label for="floatingSelectGrid">Estado</label>
                        </div>


                        <div class="form-floating my-2">
                            <input type="date" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                :max=fechamax v-model="formData.start_date" required>
                            <label for="floatingInputGrid">Fecha Inicio </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="date" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                :max=fechamax :min=formData.start_date v-model="formData.end_date" required>
                            <label for="floatingInputGrid">Fecha Finalizacion </label>

                        </div>


                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                v-model="formData.responsible_name" required>
                            <label for="floatingInputGrid">Nombre del Responsable </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                v-model="formData.responsible_lastname" required>
                            <label for="floatingInputGrid">Apellido del Responsable </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="email" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                v-model="formData.responsible_email" required>
                            <label for="floatingInputGrid">Correo Electronico del Responsable </label>

                        </div>

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Origen 1"
                                v-model="formData.responsible_phone" required>
                            <label for="floatingInputGrid">Telefono del Responsable </label>

                        </div>


                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.actionId" required>
                                <option disabled selected>Selecciona y asocia la ficha a una Accion</option>
                                <option v-for="action in actions" :key="action.id" :value="action.id"
                                    class="text-capitalize">{{ action.description }}</option>

                            </select>
                            <label for="floatingSelectGrid">Accion</label>
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
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este ficha?
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
                        <button @click="deleteWorksheet(formData.id)" type="button"
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
