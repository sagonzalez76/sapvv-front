<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const comunitys = ref({})
const municipalitys = ref({})
const formData = ref({})


formData.value.holder_type = "Emprendedor"


onMounted(() => {
    refrescar(),

        new DataTable('#example');
})

const refrescar = async () => {
    await axios.get('https://sapvv-front.onrender.com/entrepreneurs/', {

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



    await axios.get('https://sapvv-front.onrender.com/municipalitys/', {

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

    await axios.get('https://sapvv-front.onrender.com/entrepreneurs/' + id, {
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
            alert('Titular Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            alert('Titular ya existe')
            console.log(error)
        })
}


const editComunity = async (id) => {

    await axios.put(`https://sapvv-front.onrender.com/comunitys/${id}`, formData.value)
        .then(() => {
            alert('Titular Actualizado')
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
            alert('Titular Eliminado')
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
        <h3>Titulares</h3>
        <!-- {{ formData }} -->
        <button type="button" class="btn rounded-0 btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearTitularModal">Crear
            Titular</button>
        <!-- {{ comunitys }}  -->
    </div>
    <!-- {{ comunitys }} -->


    <div class="table-responsive small my-4 rounded">
        <table id="" class=" table table-dark table-hover table-striped  stable-sm ">
            <thead>
                <tr class="text-center align-middle">
                    <th scope="col" class="col-auto">Nombre </th>
                    <th scope="col" class="col-auto">Apellido</th>
                    <th scope="col" class="col-auto">Tipo Documento</th>
                    <th scope="col" class="col-auto">No. Documento</th>
                    <th scope="col" class="col-auto">Genero</th>
                    <th scope="col" class="col-auto">Telefono</th>
                    <th scope="col" class="col-auto">Correo Electronico</th>
                    <th scope="col" class="col-auto">Edad</th>


                    <th scope="col" class="col-2">Acciones</th>
                </tr>
            </thead>

            <tbody>
                <tr class="text-center align-middle text-break" v-for="comunity in comunitys" :key=comunity.id
                    style="height: 100;">
                    <td>{{ comunity.name }}</td>
                    <td>{{ comunity.lastname }}</td>
                    <td>{{ comunity.id_type }}</td>
                    <td>{{ comunity.id_number }}</td>
                    <td>{{ comunity.genre }}</td>
                    <td>{{ comunity.phone }}</td>
                    <td>{{ comunity.email }}</td>
                    <td>{{ comunity.age }}</td>



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


        <div class="modal fade" id="crearTitularModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content modal-dialog-scrollable">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Titular </h1>
                        <!-- {{
                            formData }} -->
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form class="modal-body" @submit.prevent="createComunity()">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Titular 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Titular </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Titular 1"
                                v-model="formData.lastname" required>
                            <label for="floatingInputGrid">Apellido del Titular </label>

                        </div>

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.id_type" required>
                                <option disabled selected>Selecciona el tipo de documento</option>
                                <option value="Cedula de Ciudadania" class="text-capitalize"> Cedula de Ciudadania
                                </option>
                                <option value="Tarjeta de Identidad" class="text-capitalize"> Tarjeta de Identidad
                                </option>
                                <option value="Cedula de Extranjeria" class="text-capitalize"> Cedula de Extranjeria
                                </option>
                                <option value="Pasaporte" class="text-capitalize"> Pasaporte</option>

                            </select>
                            <label for="floatingSelectGrid">Tipo Documento</label>
                        </div>

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Titular 1"
                                v-model="formData.id_number" required>
                            <label for="floatingInputGrid">Numero de Identificacion del Titular </label>

                        </div>

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.genre" required>
                                <option disabled selected>Selecciona el genero</option>
                                <option value="Masculino" class="text-capitalize"> Masculino
                                </option>
                                <option value="Femenino" class="text-capitalize"> Femenino
                                </option>


                            </select>
                            <label for="floatingSelectGrid">Genero/Identidad Genero</label>
                        </div>

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.education_level" required>
                                <option disabled selected>Selecciona el Nivel Educativo</option>
                                <option value="Basica" class="text-capitalize"> Basica
                                </option>
                                <option value="Bachiller" class="text-capitalize"> Bachiller
                                </option>
                                <option value="Tecnico" class="text-capitalize"> Tecnico
                                </option>
                                <option value="Tecnologo" class="text-capitalize"> Tecnologo
                                </option>
                                <option value="Profesional" class="text-capitalize"> Profesional
                                </option>
                                <option value="Postgrado" class="text-capitalize"> Postgrado
                                </option>
                                <option value="Sin Formacion" class="text-capitalize"> Sin Formacion Academica
                                </option>


                            </select>
                            <label for="floatingSelectGrid">Nivel Educativo</label>
                        </div>

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Titular 1"
                                v-model="formData.phone" required>
                            <label for="floatingInputGrid">Telefono/Celular del Emprendedor </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="email" class="form-control" id="floatingInputGrid" placeholder="Titular 1"
                                v-model="formData.email" required>
                            <label for="floatingInputGrid">Correo Electronico del Emprendedor </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="number" class="form-control" id="floatingInputGrid" placeholder="Titular 1" min="0"
                                max="120" v-model="formData.age" required>
                            <label for="floatingInputGrid">Edad del Emprendedor </label>

                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn rounded-0 btn-success">Crear Titular</button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Titular <br>
                            {{ formData }}
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form class="modal-body" @submit.prevent="editComunity(formData.id)">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Titular 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre del Titular </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Titular 1"
                                v-model="formData.lastname" required>
                            <label for="floatingInputGrid">Apellido del Titular </label>

                        </div>

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.id_type" required>
                                <option disabled selected>Selecciona el tipo de documento</option>
                                <option value="Cedula de Ciudadania" class="text-capitalize"> Cedula de Ciudadania
                                </option>
                                <option value="Tarjeta de Identidad" class="text-capitalize"> Tarjeta de Identidad
                                </option>
                                <option value="Cedula de Extranjeria" class="text-capitalize"> Cedula de Extranjeria
                                </option>
                                <option value="Pasaporte" class="text-capitalize"> Pasaporte</option>

                            </select>
                            <label for="floatingSelectGrid">Tipo Documento</label>
                        </div>

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Titular 1"
                                v-model="formData.id_number" required>
                            <label for="floatingInputGrid">Numero de Identificacion del Titular </label>

                        </div>

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.genre" required>
                                <option disabled selected>Selecciona el genero</option>
                                <option value="Masculino" class="text-capitalize"> Masculino
                                </option>
                                <option value="Femenino" class="text-capitalize"> Femenino
                                </option>


                            </select>
                            <label for="floatingSelectGrid">Genero/Identidad Genero</label>
                        </div>
                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.education_level" required>
                                <option disabled selected>Selecciona el Nivel Educativo</option>
                                <option value="Basica" class="text-capitalize"> Basica
                                </option>
                                <option value="Bachiller" class="text-capitalize"> Bachiller
                                </option>
                                <option value="Tecnico" class="text-capitalize"> Tecnico
                                </option>
                                <option value="Tecnologo" class="text-capitalize"> Tecnologo
                                </option>
                                <option value="Profesional" class="text-capitalize"> Profesional
                                </option>
                                <option value="Postgrado" class="text-capitalize"> Postgrado
                                </option>
                                <option value="Sin Formacion" class="text-capitalize"> Sin Formacion Academica
                                </option>


                            </select>
                            <label for="floatingSelectGrid">Nivel Educativo</label>
                        </div>

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Titular 1"
                                v-model="formData.phone" required>
                            <label for="floatingInputGrid">Telefono/Celular del Emprendedor </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="email" class="form-control" id="floatingInputGrid" placeholder="Titular 1"
                                v-model="formData.email" required>
                            <label for="floatingInputGrid">Correo Electronico del Emprendedor </label>

                        </div>
                        <div class="form-floating my-2">
                            <input type="number" class="form-control" id="floatingInputGrid" placeholder="Titular 1"
                                v-model="formData.age" required>
                            <label for="floatingInputGrid">Edad del Emprendedor </label>

                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn rounded-0 btn-success">Crear Titular</button>
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
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este titular?
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
