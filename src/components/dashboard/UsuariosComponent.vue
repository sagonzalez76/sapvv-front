<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const users = ref({})
const roles = ref({})
const formData = ref({
    id: 0,
    name: "",
    lastname: "",
    email: "",
    roleId: 0,
    role: {
        description: null // Inicializamos description como null
    }
});

onMounted(() => {
    refrescar()
        // new DataTable('#example');

})

const refrescar = async () => {
    await axios.get('http://localhost:8000/users', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            users.value = response.data
            // console.log(users.value);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })

    await axios.get('http://localhost:8000/roles', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            roles.value = response.data
            // console.log(roles.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}


const getUser = async (id) => {

    await axios.get('http://localhost:8000/users/' + id, {
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

const createUser = async () => {
    console.log(formData.value);
    await axios.post('http://localhost:8000/signUp', formData.value)
        .then(() => {
            alert('Usuario Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            console.log(error.response.data.error)
        })
}


const editUser = async (id) => {

    await axios.put(`http://localhost:8000/users/${id}`, formData.value)
        .then(() => {
            alert('Usuario Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            console.log(error)
        })
}

const deleteUser = async (id) => {
    await getUser(id)
    await axios.delete('http://localhost:8000/users/' + id)
        .then(() => {
            alert('Usuario Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(users.value);
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
        <h2>Usuarios</h2>
        <button type="button" class="btn btn-outline-primary ms-auto" data-bs-toggle="modal"
            data-bs-target="#crearUsuarioModal">Crear
            Usuario</button>
    </div>


    <div class="table-responsive small my-4 rounded">
        <table id="example" class=" table table-dark table-hover table-striped  stable-sm fade-in-down">
            <thead>
                <tr class="text-center align-middle">
                    <th scope="col" class="col-1">ID</th>
                    <th scope="col" class="col-auto">Nombre(s)</th>
                    <th scope="col" class="col-auto">Apellido(s)</th>
                    <th scope="col" class="col-auto">Correo Electr&oacute;nico</th>
                    <th scope="col" class="col-2">Rol / Cargo</th>
                    <!-- <th scope="col" class="col-2">Contra</th> -->


                    <th scope="col" class="col-2">Acciones</th>
                </tr>
            </thead>

            <tbody>
                <tr class="text-center align-middle text-break" v-for="user in users" :key=user.id style="height: 100;">
                    <td class="">{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.email }}</td>
                    <td class="text-capitalize">{{ user.role.description }}</td>
                    <!-- <td class="text-capitalize">{{ user.password }}</td> -->
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getUser(user.id)" type="button" class="btn btn-outline-info"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getUser(user.id)" type="button" class="btn btn-outline-danger"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearUsuarioModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Usuario </h1>
                        <!-- {{ formData.role.description }} -->
                        <button type="button" id="cerrarBotonCrear" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Usuario 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombres </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Usuario 1"
                                v-model="formData.lastname" required>
                            <label for="floatingInputGrid">Apellidos </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Usuario 1"
                                v-model="formData.password" required>
                            <label for="floatingInputGrid">Contrase&ntilde;a </label>

                        </div>



                        <div class="form-floating my-2">
                            <input type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com"
                                v-model="formData.email" required>
                            <label for="floatingInputGrid">Correo Electr&oacute;nico</label>
                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" required v-model="formData.roleId">
                                <option disabled selected>Selecciona el cargo del Usuario</option>
                                <option v-for="role in roles" :key="role.id" :value="role.id" class="text-capitalize">{{
                                    role.description }}</option>

                            </select>
                            <label for="floatingSelectGrid">Rol</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="createUser" type="button" class="btn btn-success">Crear Usuario</button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Usuario
                            <!-- {{ formData }} -->
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Usuario 1"
                                v-model="formData.name">
                            <label for="floatingInputGrid">Nombre</label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Usuario 1"
                                v-model="formData.lastname">
                            <label for="floatingInputGrid">Apellido</label>

                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" required v-model="formData.roleId">
                                <option disabled selected>Selecciona el cargo del Usuario</option>
                                <option v-for="role in roles" :key="role.id" :value="role.id" class="text-capitalize">{{
                                    role.description }}</option>

                            </select>
                            <label for="floatingSelectGrid">Rol</label>
                        </div>

                        <div class="form-floating my-2">
                            <input type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com"
                                v-model="formData.email" required>
                            <label for="floatingInputGrid">Correo Electr&oacute;nico</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Volver</button>
                        <button @click="editUser(formData.id)" type="button" class="btn btn-success">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-------------------------------------------------------------------------------------------------------->

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="eliminarModal" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este usuario? {{ formData }}
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
                        <button @click="deleteUser(formData.id)" type="button" class="btn btn-danger">Eliminar</button>
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
