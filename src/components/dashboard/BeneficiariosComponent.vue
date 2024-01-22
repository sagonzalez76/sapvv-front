<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const beneficiarys = ref({})
const comunitys = ref({})
const formData = ref({})

onMounted(() => {
    refrescar(),

        new DataTable('#example');
})

const refrescar = async () => {
    await axios.get('https://sapvv-back.onrender.com/beneficiarys', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            beneficiarys.value = response.data
            // console.log(beneficiarys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log('Error en refrescar', error)
        })

    await axios.get('https://sapvv-back.onrender.com/holders', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            comunitys.value = response.data
            // console.log(comunitys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log('Error en refrescar', error)
        })
}


const getBeneficiary = async (id) => {

    await axios.get('https://sapvv-back.onrender.com/beneficiarys/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            formData.value = response.data
        })
        .catch((error) => {
            console.log('Error en GetBeneficiaryFront', error)
        })
}

const createBeneficiary = async () => {
    console.log(formData.value);
    await axios.post('https://sapvv-back.onrender.com/beneficiarys', formData.value)
        .then(() => {
            alert('Beneficiario Creado')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
        })
        .catch((error) => {
            console.log('Error en CreateBeneficiaryFront', error)
        })
}


const editBeneficiary = async (id) => {

    await axios.put(`https://sapvv-back.onrender.com/beneficiarys/${id}`, formData.value)
        .then(() => {
            alert('Beneficiario Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            console.log(error)
        })
}

const deleteBeneficiary = async (id) => {
    await getBeneficiary(id)
    await axios.delete('https://sapvv-back.onrender.com/beneficiarys/' + id)
        .then(() => {
            alert('Beneficiario Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(beneficiarys.value);
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
        <h3>Beneficiarios de las Titulares</h3>
        <button type="button" class="btn rounded-0 btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearBeneficiarioModal">Crear
            Beneficiario</button>
    </div>
    <!-- {{ beneficiarys }} -->


    <div class="table-responsive small my-4 rounded">
        <table id="" class=" table table-dark table-hover table-striped  stable-sm ">
            <thead>
                <tr class="text-center align-middle">
                    <th scope="col" class="col-auto">Nombre</th>
                    <th scope="col" class="col-auto">Apellido</th>
                    <th scope="col" class="col-auto">Telefono</th>
                    <th scope="col" class="col-auto">Tipo de Documento</th>
                    <th scope="col" class="col-auto">No. Documento</th>
                    <th scope="col" class="col-auto">Titular del que es Beneficiario</th>

                    <th scope="col" class="col-2">Acciones</th>
                </tr>
            </thead>

            <tbody>

                <tr class="text-center align-middle text-break" v-for="beneficiary in beneficiarys" :key=beneficiary.id
                    style="height: 100;">

                    <td>{{ beneficiary.name }}</td>
                    <td>{{ beneficiary.lastname }}</td>
                    <td>{{ beneficiary.phone }}</td>
                    <td>{{ beneficiary.id_type }}</td>
                    <td>{{ beneficiary.id_number }}</td>
                    <td>{{ beneficiary.comunity.name }} {{ beneficiary.comunity.lastname }} </td>

                    <td>
                        <div class="btn rounded-0-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getBeneficiary(beneficiary.id)" type="button"
                                class="btn rounded-0 btn-outline-info" data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getBeneficiary(beneficiary.id)" type="button"
                                class="btn rounded-0 btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL MODAL -->


        <div class="modal fade" id="crearBeneficiarioModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Beneficiario </h1>
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="createBeneficiary()">
                        <div class="modal-body">

                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Beneficiario 1"
                                    v-model="formData.name" required>
                                <label for="floatingInputGrid">Nombre del Beneficiario </label>

                            </div>
                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Beneficiario 1"
                                    v-model="formData.lastname" required>
                                <label for="floatingInputGrid">Apellido del Beneficiario </label>

                            </div>
                            <div class="form-floating my-2">
                                <input type="tel" class="form-control" id="floatingInputGrid" placeholder="Beneficiario 1"
                                    v-model="formData.phone" required>
                                <label for="floatingInputGrid">Celular del Beneficiario </label>

                            </div>
                            <div class="form-floating my-2">
                                <select class="form-select" id="floatingSelectGrid" v-model="formData.id_type" required>
                                    <option disabled selected>Selecciona el tipo de documento</option>
                                    <option value="Cedula de Ciudadania" class="text-capitalize"> Cedula de Ciudadania
                                    </option>
                                    <option value="Tarjeta de Identidad" class="text-capitalize"> Tarjeta de Identidad
                                    </option>
                                    <option value="Cedula de Extranjeria" class="text-capitalize"> cedula de Extranjeria
                                    </option>
                                    <option value="Pasaporte" class="text-capitalize"> Cedula de pasaporte</option>

                                </select>
                                <label for="floatingSelectGrid">Tipo Documento</label>
                            </div>
                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Beneficiario 1"
                                    v-model="formData.id_number" required>
                                <label for="floatingInputGrid"> Numero Documento de Identidad </label>

                            </div>
                            <div class="form-floating my-2">
                                <select class="form-select" id="floatingSelectGrid" v-model="formData.comunityId" required>
                                    <option disabled selected>Selecciona un(a) titular</option>
                                    <option v-for="comunity in comunitys" :key="comunity.id" :value="comunity.id"
                                        class="text-capitalize">{{ comunity.name }}</option>

                                </select>
                                <label for="floatingSelectGrid">Titular del que es beneficiario</label>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <!-- <button @click="createBeneficiary" type="button" class="btn rounded-0 btn-success">Crear Beneficiario</button> -->
                            <button type="submit" class="btn rounded-0 btn-success">Crear Beneficiario</button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Beneficiario
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="editBeneficiary(formData.id)">
                        <div class="modal-body">

                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Beneficiario 1"
                                    v-model="formData.name" required>
                                <label for="floatingInputGrid">Nombre </label>

                            </div>
                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Beneficiario 1"
                                    v-model="formData.lastname" required>
                                <label for="floatingInputGrid">Apellido</label>

                            </div>
                            <div class="form-floating my-2">
                                <input type="tel" class="form-control" id="floatingInputGrid" placeholder="Beneficiario 1"
                                    v-model="formData.phone" required>
                                <label for="floatingInputGrid">Celular </label>

                            </div>
                            <div class="form-floating my-2">
                                <select class="form-select" id="floatingSelectGrid" v-model="formData.id_type" required>
                                    <option disabled selected>Selecciona el tipo de documento</option>
                                    <option value="Cedula de Ciudadania" class="text-capitalize"> Cedula de Ciudadania
                                    </option>
                                    <option value="Tarjeta de Identidad" class="text-capitalize"> Tarjeta de Identidad
                                    </option>
                                    <option value="Cedula de Extranjeria" class="text-capitalize"> cedula de Extranjeria
                                    </option>
                                    <option value="Pasaporte" class="text-capitalize"> Cedula de pasaporte</option>

                                </select>
                                <label for="floatingSelectGrid">Tipo Documento</label>
                            </div>
                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Beneficiario 1"
                                    v-model="formData.id_number" required>
                                <label for="floatingInputGrid"> Numero Documento de Identidad </label>

                            </div>
                            <div class="form-floating my-2">
                                <select class="form-select" id="floatingSelectGrid" v-model="formData.comunityId" required>
                                    <option disabled selected>Selecciona un(a) titular</option>
                                    <option v-for="comunity in comunitys" :key="comunity.id" :value="comunity.id"
                                        class="text-capitalize">{{ comunity.name }}</option>

                                </select>
                                <label for="floatingSelectGrid">Titular del que es beneficiario</label>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <!-- <button @click="editBeneficiary(formData.id)" type="button" class="btn rounded-0 btn-success">Guardar</button> -->
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
                        <h1 class="modal-title fs-5" id="eliminarModal">Seguro deseas eliminar este beneficiario?
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
                        <button @click="deleteBeneficiary(formData.id)" type="button"
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
