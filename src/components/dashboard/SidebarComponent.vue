<script setup>
import { useAuthStore } from '../../stores/auth.js';

const auth = useAuthStore()

const onLogout = () => {
  auth.logout()
};

const cerrarSidebar = () => {


  const boton = document.getElementById('cerrarSidebar')
  boton.click()

}

const rutasSeguridad = [{
  id: 1,
  nombre: 'Usuarios',
  ruta: '/dashboard/usuarios',
  xlink: '#people'
}, {
  id: 2,
  nombre: 'Roles',
  ruta: '/dashboard/roles',
  xlink: '#people'
}


]

const rutasAtencion = [{
  id: 10,
  nombre: 'Departamentos',
  ruta: '/dashboard/departamentos',
  xlink: '#departamentos'
},
{
  id: 11,
  nombre: 'Municipios',
  ruta: '/dashboard/municipios',
  xlink: '#municipios'
},
{
  id: 12,
  nombre: 'TiposComunidades',
  ruta: '/dashboard/tipo_comunidades',
  xlink: '#tipocomunidad'
},
{
  id: 13,
  nombre: 'Comunidades',
  ruta: '/dashboard/comunidades',
  xlink: '#tipocomunidad'
},
{
  id: 4,
  nombre: 'Representantes',
  ruta: '/dashboard/representantes',
  xlink: '#representante'
}, {
  id: 14,
  nombre: 'Titulares',
  ruta: '/dashboard/titulares',
  xlink: '#tipocomunidad'
}, {
  id: 14,
  nombre: 'Beneficiarios',
  ruta: '/dashboard/beneficiarios',
  xlink: '#tipocomunidad'
}, {
  id: 3,
  nombre: 'Emisores',
  ruta: '/dashboard/emisores',
  xlink: '#representante'
}, {
  id: 14,
  nombre: 'Origenes',
  ruta: '/dashboard/origenes',
  xlink: '#calendario'
}, {
  id: 14,
  nombre: 'Compromisos',
  ruta: '/dashboard/compromisos',
  xlink: '#puzzle'
}, {
  id: 7,
  nombre: 'Acciones',
  ruta: '/dashboard/acciones',
  xlink: '#file-earmark'
},
{
  id: 7,
  nombre: 'Programas',
  ruta: '/dashboard/programas',
  xlink: '#file-earmark'
},
{
  id: 7,
  nombre: 'Dependencias',
  ruta: '/dashboard/dependencias',
  xlink: '#file-earmark'
},
{
  id: 12,
  nombre: 'TiposAcciones',
  ruta: '/dashboard/tipo_acciones',
  xlink: '#tipocomunidad'
},




{
  id: 1,
  nombre: 'Medidas',
  ruta: '/dashboard/medidas',
  xlink: '#graph-up'
}, {
  id: 5,
  nombre: 'Concertaciones',
  ruta: '/dashboard/concertaciones',
  xlink: '#chevron-right'
},



]
</script>

<template>
  <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
    <div class="offcanvas-md offcanvas-end bg-body-tertiary " tabindex="-1" id="sidebarMenu"
      aria-labelledby="sidebarMenuLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="sidebarMenuLabel">SAPVV</h5>
        <button type="button" class="btn-close rounded-0" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu"
          aria-label="Close" id="cerrarSidebar"></button>
      </div>
      <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        <!-- <ul class="nav flex-column mb-2">
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-0 mb-1 text-body-secondary text-uppercase">
            <span>SEGURIDAD</span>
            <a class="link-secondary" href="#" aria-label="Add a new report">
              <svg class="bi">
                <use xlink:href="#plus-circle" />
              </svg>
            </a>
          </h6>
          <li class="nav-item" v-for="ruta in rutasSeguridad" :key=ruta.id>
            <router-link :to="ruta.ruta" class="nav-link d-flex align-items-center gap-2 active" aria-current="page">
              <svg class="bi">
                <use :xlink:href="ruta.xlink" />
              </svg>
              {{ ruta.nombre }}
            </router-link>
          </li>
        </ul> -->



        <ul class="nav flex-column">
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-0 mb-1 text-body-secondary text-uppercase">
            <span>ATENCION POBLACION</span>
            <a class="link-secondary" href="#" aria-label="Add a new report">
              <svg class="bi">
                <use xlink:href="#plus-circle" />
              </svg>
            </a>
          </h6>

          <li class="nav-item" v-for="ruta in rutasAtencion" :key=ruta.id>
            <router-link :to="ruta.ruta" type="button" @click="cerrarSidebar()"
              class="nav-link d-flex align-items-center gap-2 active" aria-current="page">
              <svg class="bi">
                <use :xlink:href="ruta.xlink" />
              </svg>
              {{ ruta.nombre }}
            </router-link>
          </li>
        </ul>

        <hr class="my-3">

        <ul class="nav flex-column mb-auto">
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center gap-2 active" href="#">
              <svg class="bi">
                <use xlink:href="#gear-wide-connected" />
              </svg>
              Configuracion
            </a>
          </li>
          <li class="nav-item">
            <router-link to="/" @click="onLogout" class="nav-link d-flex align-items-center gap-2 active" href="#">
              <svg class="bi">
                <use xlink:href="#door-closed" />
              </svg>
              Cerrar Sesion
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
li:hover,
.nav-link.active:hover {
  color: rgb(255, 255, 255) !important;
  background-color: rgba(4, 125, 0, 0.998);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease-in-out;
  /* Sombra más pronunciada en el estado hover */
  transform: translateY(-2px);
  /* filter: blur(.2px); */

  /* Otros estilos adicionales cuando el enlace está en estado hover */
}



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
  color: #000000;
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
