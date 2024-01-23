<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';
import { useActionStore } from '../../stores/action';

const actionStore = useActionStore();

const token = useAuthStore().token
const actions = ref({})
const type_actions = ref({})
const formData = ref({})
formData.value.done = false

const dependencys = ref({})

const getActionEvidence = (id) => {
    actionStore.getAction(id)
};

onMounted(() => {
    refrescar(),

        new DataTable('#example');
})


const refrescar = async () => {
    await axios.get('http://localhost:8000/actions', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            actions.value = response.data
            console.log(actions.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })


    await axios.get('http://localhost:8000/dependencys', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            dependencys.value = response.data
            // console.log(departments.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })



    await axios.get('http://localhost:8000/type_actions', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            type_actions.value = response.data
            // console.log(type_comunitys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })



}


const getAction = async (id) => {

    await axios.get('http://localhost:8000/actions/' + id, {
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

const createAction = async () => {
    console.log(formData.value);
    await axios.post('http://localhost:8000/actions', formData.value)
        .then(() => {
            alert('Accion Creada')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            console.log(error.response.data.error)
        })
}


const editAction = async (id) => {

    await axios.put(`http://localhost:8000/actions/${id}`, formData.value)
        .then(() => {
            alert('Accion Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            console.log(error)
        })
}

const deleteAction = async (id) => {
    await getAction(id)
    await axios.delete('http://localhost:8000/actions/' + id)
        .then(() => {
            alert('Accion Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(actions.value);
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
        <h3>Acciones</h3>
        <button type="button" class="btn rounded-0 btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearAccionModal">Crear
            Accion</button>
    </div>
    <!-- {{ actions }} -->


    <div class="table-responsive small my-4 rounded">
        <table id="" class=" table bg-secondary table-hover table-striped  stable-sm ">
            <thead>
                <tr class="text-center align-middle">
                    <th scope="col" class="col-auto">Descripcion</th>
                    <th scope="col" class="col-auto">Tipo Accion</th>

                    <th scope="col" class="col-2">Accion Completada</th>
                    <th scope="col" class="col-auto">Dependencia que Atiende</th>
                    <th scope="col" class="col-2">Acciones</th>

                </tr>
            </thead>

            <tbody>

                <tr class="text-center align-middle text-break" v-for="action in actions" :key=action.id
                    style="height: 100;">
                    <td>{{ action.description }}</td>
                    <td>{{ action.typeAction.name }}</td>

                    <td v-if="action.done == true">SI</td>
                    <td v-else>NO</td>
                    <td>{{ action.dependency.name }}</td>

                    <td>
                        <div class="btn rounded-0-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getAction(action.id)" type="button" class="btn rounded-0 btn-outline-info"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>
                            <button @click="getAction(action.id)" type="button" class="btn rounded-0 btn-outline-danger"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                            <button @click="getActionEvidence(action.id)" type="button"
                                class="btn rounded-0 btn-outline-warning"><i class="bi bi-eye-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearAccionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header ">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Accion </h1> {{ formData }}
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form class="modal-body" @submit.prevent="createAction()">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Accion 1"
                                v-model="formData.description" required>
                            <label for="floatingInputGrid">Descripcion del Accion </label>

                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.dependencyId" required>
                                <option disabled selected>Selecciona la dependencia que atiende</option>
                                <option v-for="dependency in dependencys" :key="dependency.id" :value="dependency.id"
                                    class="text-capitalize">{{ dependency.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Dependencia</label>
                        </div>


                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.typeActionId" required>
                                <option disabled selected>Selecciona el tipo de Accion:</option>
                                <option v-for="type_action in type_actions" :key="type_action.id" :value="type_action.id"
                                    class="text-capitalize">{{ type_action.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Tipo de Accion</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                v-model="formData.done">
                            <label class="form-check-label" for="flexSwitchCheckDefault">Accion Completada</label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn rounded-0 btn-success">Crear Accion</button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Accion {{ formData }}
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form class="modal-body" @submit.prevent="editAction(formData.id)">
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Accion 1"
                                v-model="formData.description">
                            <label for="floatingInputGrid">Descripcion del Accion</label>

                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                v-model="formData.done">
                            <label class="form-check-label" for="flexSwitchCheckDefault">Accion Completada</label>
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
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este accion?
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
                        <button @click="deleteAction(formData.id)" type="button"
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
