<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';

const token = useAuthStore().token
const centers = ref({})
const comunitys = ref({})
const users = ref({})
const activitys = ref({})

const enterprises = ref({})
const municipalitys = ref({})
const foundings = ref({})
const role = useAuthStore().tokenRole


const formData = ref({})

const fecha = new Date();
const año = fecha.getFullYear();
const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
const dia = ('0' + fecha.getDate()).slice(-2);
const fechamax = `${año}-${mes}-${dia}`;

formData.value.type = "Plan Negocio"


onMounted(() => {
    refrescar(),

        new DataTable('#example');
})

const refrescar = async () => {
    await axios.get('https://sapvv-back.onrender.com/business_plans', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {

            enterprises.value = response.data
            // console.log(enterprises.value);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })

    await axios.get('https://sapvv-back.onrender.com/financial_foundings', {

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            foundings.value = response.data
            // console.log(financialfoundings.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })

    await axios.get('https://sapvv-back.onrender.com/training_centers', {

        headers: {
            'Authorization': `Bearer ${token}`,

        },
    })
        .then((response) => {
            centers.value = response.data
            // console.log(financialfoundings.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })


    await axios.get('https://sapvv-back.onrender.com/entrepreneurs/', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            // console.log(response);
            comunitys.value = response.data
            // console.log(comunitys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })


    await axios.get('https://sapvv-back.onrender.com/municipalitys/', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            municipalitys.value = response.data
            // console.log(comunitys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })


    await axios.get('https://sapvv-back.onrender.com/users/', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            // console.log(response);
            users.value = response.data
            // console.log(comunitys.value);
            // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })



    await axios.get('https://sapvv-back.onrender.com/economic_activitys/', {

        //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            // console.log(response);
            activitys.value = response.data
            // console.log(comunitys.value);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })


    // await axios.get('https://sapvv-back.onrender.com/type_enterprises', {

    //     //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS

    //     headers: {
    //         'Authorization': `Bearer ${token}`,

    //     },
    // })
    //     .then((response) => {
    //         type_enterprises.value = response.data
    //         // console.log(type_enterprises.value);
    //         // console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })


    // await axios.get('https://sapvv-back.onrender.com/municipalitys', {

    //     //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //     },
    // })
    //     .then((response) => {
    //         municipalitys.value = response.data
    //         // console.log(municipalitys.value);
    //         // console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })



    // await axios.get('https://sapvv-back.onrender.com/comunitys/entrepreneurs', {

    //     //ENCABEZADO DE LA PETICION, ENVIO DE TOKEN PARA AUTH DE SERVICIOS
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //     },
    // })
    //     .then((response) => {
    //         console.log(response);
    //         entrepreneurs.value = response.data
    //         // console.log(entrepreneurs.value);
    //         // console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })

}

const getEnterprise = async (id) => {

    await axios.get('https://sapvv-back.onrender.com/productive_unity/' + id, {
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

const createEnterprise = async () => {

    formData.value.type = "Plan Negocio"
    await axios.post('https://sapvv-back.onrender.com/enterprises', formData.value)
        .then(() => {
            alert('Plan de Negocio Creada')
            let botonCerrarModal = document.getElementById('cerrarBotonCrear')
            botonCerrarModal.click()
            refrescar()
            console.log(formData.value);
        })
        .catch((error) => {
            alert('Plan de Negocio ya existe')
            console.log(error)
        })
}


const editEnterprise = async (id) => {
    formData.value.type = "Plan Negocio"
    await axios.put(`https://sapvv-back.onrender.com/enterprises/${id}`, formData.value)
        .then(() => {
            alert('Plan de Negocio Actualizado')
            let botonCerrarModal = document.getElementById('cerrarBotonActualizar')
            botonCerrarModal.click()
            refrescar()

        })
        .catch((error) => {
            alert(error.response.data.message)
            console.log(error)
        })
}

const deleteEnterprise = async (id) => {
    await getEnterprise(id)
    await axios.delete('https://sapvv-back.onrender.com/enterprises/' + id)
        .then(() => {
            alert('Plan de Negocio Eliminado')
            let botonCerrarModal = document.getElementById('cerrarBotonEliminar')
            botonCerrarModal.click()
            // console.log(enterprises.value);
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
        <h3>Planes de Negocio</h3>{{ role }}
        <button type="button" class="btn rounded-0 btn-primary ms-auto rounded rounded-0 btn-sm" data-bs-toggle="modal"
            data-bs-target="#crearComunidadModal">Crear
            Plan de Negocio</button>
        <!-- {{ enterprises }}  -->
    </div>
    <!-- {{ enterprises }} -->


    <div class="table-responsive small my-4 rounded">
        <table id="" class=" table bg-secondary table-hover table-striped  stable-sm ">
            <thead>
                <tr class="text-center align-middle">
                    <th scope="col" class="col-1">ID</th>
                    <th scope="col" class="col-auto">Nombre</th>
                    <th scope="col" class="col-auto">Zona</th>
                    <th scope="col" class="col-auto">Sector Economico</th>
                    <th scope="col" class="col-auto">Observaciones</th>
                    <th scope="col" class="col-auto">Mes</th>
                    <th scope="col" class="col-auto">Centro de Formacion</th>
                    <th scope="col" class="col-auto">Actividad Economica</th>
                    <th scope="col" class="col-auto">Fuente del Servicio</th>

                    <th scope="col" class="col-auto">Municipio</th>
                    <th scope="col" class="col-auto">Emprendedor</th>
                    <th scope="col" class="col-auto">Dinamizador</th>

                    <th scope="col" class="col-auto">Acciones</th>

                </tr>
            </thead>

            <tbody>

                <tr class="text-center align-middle text-break" v-for="enterprise in enterprises" :key=enterprise.id
                    style="height: 100;">
                    <td class="py-1 ">{{ enterprise.id }}</td>
                    <td>{{ enterprise.name }}</td>
                    <td>{{ enterprise.zone }}</td>
                    <td>{{ enterprise.economic_sector }}</td>
                    <td>{{ enterprise.observation }}</td>
                    <td>{{ enterprise.month }}</td>
                    <td>{{ enterprise.trainingCenter.name }}</td>
                    <td>{{ enterprise.economicActivity.name }}</td>
                    <td>{{ enterprise.source_service }}</td>

                    <td>{{ enterprise.municipality.name }}</td>
                    <td>{{ enterprise.comunity.name }} {{ enterprise.comunity.lastname }}</td>
                    <td>{{ enterprise.user.name }} {{ enterprise.user.lastname }}</td>



                    <td>
                        <div class="btn rounded-0-group" role="group" aria-label="Basic mixed styles example">
                            <button @click="getEnterprise(enterprise.id)" type="button"
                                class="btn rounded-0 btn-outline-info" data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"><i class="bi bi-pencil-fill"></i>
                            </button>

                            <button @click="getEnterprise(enterprise.id)" type="button"
                                class="btn rounded-0 btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#exampleModal"><i class="bi bi-trash-fill"></i>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Plan de Negocio </h1>
                        <!-- {{
                            formData }} -->
                        <button type="button" id="cerrarBotonCrear" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form class="modal-body" @submit.prevent="createEnterprise">

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Comunidad 1"
                                v-model="formData.name" required>
                            <label for="floatingInputGrid">Nombre de la Empresa </label>

                        </div>

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.zone" required>
                                <option disabled selected>Selecciona la Zona</option>
                                <option value="Zona Urbana" class="text-capitalize">Zona Urbana</option>
                                <option value="Zona Rural" class="text-capitalize">Zona Rural</option>

                            </select>

                            <label for="floatingSelectGrid">Zona</label>
                        </div>

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.economic_sector" required>
                                <option disabled selected>Selecciona el Sector Economico</option>
                                <option value="Sector Agropecuario" class="text-capitalize">Sector Agropecuario</option>
                                <option value="Sector Servicios" class="text-capitalize">Sector Servicios</option>
                                <option value="Sector Industrial" class="text-capitalize">Sector Industrial</option>
                                <option value="Sector Transporte" class="text-capitalize">Sector Transporte</option>
                                <option value="Sector Comercio" class="text-capitalize">Sector Comercio</option>
                                <option value="Sector Financiero" class="text-capitalize">Sector Financiero</option>
                                <option value="Sector Construccion" class="text-capitalize">Sector Construccion</option>
                                <option value="Sector Minero y Energetico" class="text-capitalize">Sector Minero y
                                    Energetico</option>
                                <option value="Sector Solidario" class="text-capitalize">Sector Solidario</option>
                                <option value="Sector Comunicaciones" class="text-capitalize">Sector Comunicaciones</option>

                            </select>

                            <label for="floatingSelectGrid">Sector Economico</label>
                        </div>

                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.source_service" required>
                                <option disabled selected>Selecciona una Fuente</option>
                                <option value="Resultado de Formacion SENA" class="text-capitalize">Resultado de
                                    Formacion SENA</option>
                                <option value="Solicitud Ente Territorial" class="text-capitalize">Solicitud Ente
                                    Territorial</option>
                                <option value="Remision otras Entidades" class="text-capitalize">Remision otras
                                    Entidades</option>
                                <option value="Interes Particular" class="text-capitalize">Interes Particular</option>

                            </select>

                            <label for="floatingSelectGrid"> Fuente del Servicio</label>
                        </div>

                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="Comunidad 1"
                                v-model="formData.observation" required>
                            <label for="floatingInputGrid">Observacion </label>

                        </div>



                        <div class="form-floating my-2">
                            <select class="form-select" id="floatingSelectGrid" v-model="formData.month" required>
                                <option disabled selected>Selecciona el Mes</option>
                                <option value="Enero" class="text-capitalize">Enero</option>
                                <option value="Febrero" class="text-capitalize">Febrero</option>
                                <option value="Marzo" class="text-capitalize">Marzo</option>
                                <option value="Abril" class="text-capitalize">Abril</option>
                                <option value="Mayo" class="text-capitalize">Mayo</option>
                                <option value="Junio" class="text-capitalize">Junio</option>
                                <option value="Julio" class="text-capitalize">Julio</option>
                                <option value="Agosto" class="text-capitalize">Agosto</option>
                                <option value="Septiembre" class="text-capitalize">Septiembre</option>
                                <option value="Octubre" class="text-capitalize">Octubre</option>
                                <option value="Noviembre" class="text-capitalize">Noviembre</option>
                                <option value="Diciembre" class="text-capitalize">Diciembre</option>
                            </select>


                            <label for="floatingSelectGrid">Mes</label>
                        </div>

                        <div class="form-floating my-2">


                            <select class="form-select h-auto" id="floatingSelectGrid" v-model="formData.trainingCenterId"
                                required>
                                <option disabled selected>Selecciona un Centro de Formacion</option>
                                <option v-for="center in centers" :key="center.id" :value="center.id"
                                    class="text-capitalize">{{ center.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Asocia el Plan de Negocio a un Centro de Formacion
                            </label>
                        </div>


                        <div class="form-floating my-2">


                            <select class="form-select h-auto" id="floatingSelectGrid" v-model="formData.comunityId"
                                required>
                                <option disabled selected>Selecciona un Emprendedor</option>
                                <option v-for="comunity in comunitys" :key="comunity.id" :value="comunity.id"
                                    class="text-capitalize">{{ comunity.name }} {{ comunity.lastname }}</option>

                            </select>
                            <label for="floatingSelectGrid">Asocia el Plan de Negocio a un Emprendedor
                            </label>
                        </div>
                        <div class="form-floating my-2">


                            <select class="form-select h-auto" id="floatingSelectGrid" v-model="formData.economicActivityId"
                                required>
                                <option disabled selected>Selecciona una Actividad Economica</option>
                                <option v-for="activity in activitys" :key="activity.id" :value="activity.id"
                                    class="text-capitalize">{{ activity.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Asocia el Plan de Negocio a una Actividad Economica
                            </label>
                        </div>
                        <div class="form-floating my-2">


                            <select class="form-select h-auto" id="floatingSelectGrid" v-model="formData.municipalityId"
                                required>
                                <option disabled selected>Selecciona un Municipio</option>
                                <option v-for="municipality in municipalitys" :key="municipality.id"
                                    :value="municipality.id" class="text-capitalize">{{ municipality.name }}</option>

                            </select>
                            <label for="floatingSelectGrid">Asocia el Plan de Negocio a un Municipio
                            </label>
                        </div>


                        <div class="form-floating my-2">


                            <select class="form-select h-auto" id="floatingSelectGrid" v-model="formData.userId" required>
                                <option disabled selected>Selecciona un Dinamizador</option>
                                <option v-for="user in users" :key="user.id" :value="user.id" class="text-capitalize">{{
                                    user.name }} {{ user.lastname }}</option>

                            </select>
                            <label for="floatingSelectGrid">Asocia el Plan de Negocio a un Dinamizador
                            </label>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <button type="submit" class="btn rounded-0 btn-success">Crear Plan de Negocio </button>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Comunidad <br>
                        </h1>
                        <button type="button" id="cerrarBotonActualizar" class="btn rounded-0-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="editEnterprise(formData.id)">
                        <div class="modal-body">

                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Comunidad 1"
                                    v-model="formData.name" required>
                                <label for="floatingInputGrid">Nombre de la Empresa </label>

                            </div>

                            <div class="form-floating my-2">
                                <select class="form-select" id="floatingSelectGrid" v-model="formData.zone" required>
                                    <option disabled selected>Selecciona la Zona</option>
                                    <option value="Zona Urbana" class="text-capitalize">Zona Urbana</option>
                                    <option value="Zona Rural" class="text-capitalize">Zona Rural</option>

                                </select>

                                <label for="floatingSelectGrid">Zona</label>
                            </div>

                            <div class="form-floating my-2">
                                <select class="form-select" id="floatingSelectGrid" v-model="formData.economic_sector"
                                    required>
                                    <option disabled selected>Selecciona el Sector Economico</option>
                                    <option value="Sector Agropecuario" class="text-capitalize">Sector Agropecuario</option>
                                    <option value="Sector Servicios" class="text-capitalize">Sector Servicios</option>
                                    <option value="Sector Industrial" class="text-capitalize">Sector Industrial</option>
                                    <option value="Sector Transporte" class="text-capitalize">Sector Transporte</option>
                                    <option value="Sector Comercio" class="text-capitalize">Sector Comercio</option>
                                    <option value="Sector Financiero" class="text-capitalize">Sector Financiero</option>
                                    <option value="Sector Construccion" class="text-capitalize">Sector Construccion</option>
                                    <option value="Sector Minero y Energetico" class="text-capitalize">Sector Minero y
                                        Energetico</option>
                                    <option value="Sector Solidario" class="text-capitalize">Sector Solidario</option>
                                    <option value="Sector Comunicaciones" class="text-capitalize">Sector Comunicaciones
                                    </option>

                                </select>

                                <label for="floatingSelectGrid">Sector Economico</label>
                            </div>

                            <div class="form-floating my-2">
                                <select class="form-select" id="floatingSelectGrid" v-model="formData.source_service"
                                    required>
                                    <option disabled selected>Selecciona una Fuente</option>
                                    <option value="Resultado de Formacion SENA" class="text-capitalize">Resultado de
                                        Formacion SENA</option>
                                    <option value="Solicitud Ente Territorial" class="text-capitalize">Solicitud Ente
                                        Territorial</option>
                                    <option value="Remision otras Entidades" class="text-capitalize">Remision otras
                                        Entidades</option>
                                    <option value="Interes Particular" class="text-capitalize">Interes Particular</option>

                                </select>

                                <label for="floatingSelectGrid"> Fuente del Servicio</label>
                            </div>

                            <div class="form-floating my-2">
                                <input type="text" class="form-control" id="floatingInputGrid" placeholder="Comunidad 1"
                                    v-model="formData.observation" required>
                                <label for="floatingInputGrid">Observacion </label>

                            </div>



                            <div class="form-floating my-2">
                                <select class="form-select" id="floatingSelectGrid" v-model="formData.month" required>
                                    <option disabled selected>Selecciona el Mes</option>
                                    <option value="Enero" class="text-capitalize">Enero</option>
                                    <option value="Febrero" class="text-capitalize">Febrero</option>
                                    <option value="Marzo" class="text-capitalize">Marzo</option>
                                    <option value="Abril" class="text-capitalize">Abril</option>
                                    <option value="Mayo" class="text-capitalize">Mayo</option>
                                    <option value="Junio" class="text-capitalize">Junio</option>
                                    <option value="Julio" class="text-capitalize">Julio</option>
                                    <option value="Agosto" class="text-capitalize">Agosto</option>
                                    <option value="Septiembre" class="text-capitalize">Septiembre</option>
                                    <option value="Octubre" class="text-capitalize">Octubre</option>
                                    <option value="Noviembre" class="text-capitalize">Noviembre</option>
                                    <option value="Diciembre" class="text-capitalize">Diciembre</option>
                                </select>


                                <label for="floatingSelectGrid">Mes</label>
                            </div>

                            <div class="form-floating my-2">


                                <select class="form-select h-auto" id="floatingSelectGrid"
                                    v-model="formData.trainingCenterId" required>
                                    <option disabled selected>Selecciona un Centro de Formacion</option>
                                    <option v-for="center in centers" :key="center.id" :value="center.id"
                                        class="text-capitalize">{{ center.name }}</option>

                                </select>
                                <label for="floatingSelectGrid">Asocia el Plan de Negocio a un Centro de Formacion
                                </label>
                            </div>


                            <div class="form-floating my-2">


                                <select class="form-select h-auto" id="floatingSelectGrid" v-model="formData.comunityId"
                                    required>
                                    <option disabled selected>Selecciona un Emprendedor</option>
                                    <option v-for="comunity in comunitys" :key="comunity.id" :value="comunity.id"
                                        class="text-capitalize">{{ comunity.name }} {{ comunity.lastname }}</option>

                                </select>
                                <label for="floatingSelectGrid">Asocia el Plan de Negocio a un Emprendedor
                                </label>
                            </div>
                            <div class="form-floating my-2">


                                <select class="form-select h-auto" id="floatingSelectGrid"
                                    v-model="formData.economicActivityId" required>
                                    <option disabled selected>Selecciona una Actividad Economica</option>
                                    <option v-for="activity in activitys" :key="activity.id" :value="activity.id"
                                        class="text-capitalize">{{ activity.name }}</option>

                                </select>
                                <label for="floatingSelectGrid">Asocia el Plan de Negocio a una Actividad Economica
                                </label>
                            </div>
                            <div class="form-floating my-2">


                                <select class="form-select h-auto" id="floatingSelectGrid" v-model="formData.municipalityId"
                                    required>
                                    <option disabled selected>Selecciona un Municipio</option>
                                    <option v-for="municipality in municipalitys" :key="municipality.id"
                                        :value="municipality.id" class="text-capitalize">{{ municipality.name }}</option>

                                </select>
                                <label for="floatingSelectGrid">Asocia el Plan de Negocio a un Municipio
                                </label>
                            </div>


                            <div class="form-floating my-2">


                                <select class="form-select h-auto" id="floatingSelectGrid" v-model="formData.userId"
                                    required>
                                    <option disabled selected>Selecciona un Dinamizador</option>
                                    <option v-for="user in users" :key="user.id" :value="user.id" class="text-capitalize">{{
                                        user.name }} {{ user.lastname }}</option>

                                </select>
                                <label for="floatingSelectGrid">Asocia el Plan de Negocio a un Dinamizador
                                </label>
                            </div>


                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn rounded-0 btn-primary" data-bs-dismiss="modal">Volver</button>
                            <!-- <button @click="editEnterprise(formData.id)" type="button"
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
                        <button @click="deleteEnterprise(formData.id)" type="button"
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
