<script setup>
import { useAuthStore } from '../../stores/auth.js';

const auth = useAuthStore()
const role = useAuthStore().tokenRole
const onLogout = () => {
  auth.logout()
};

const cerrarSidebar = () => {


  const boton = document.getElementById('cerrarSidebar')
  boton.click()

}


const rutasSeguridad = [
  {
    id: 1,
    nombre: 'Usuarios',
    ruta: '/dashboard/usuarios',
    xlink: '#people',
    role: ['administrador', 'director']
  },
  {
    id: 2,
    nombre: 'Roles',
    ruta: '/dashboard/roles',
    xlink: '#people',
    role: ['administrador', 'director']
  }
];

const rutasAtencion = [
  {
    id: 3,
    nombre: 'Departamentos',
    ruta: '/dashboard/departamentos',
    xlink: '#departamentos',
    role: ['administrador', 'director']
  },
  {
    id: 4,
    nombre: 'Municipios',
    ruta: '/dashboard/municipios',
    xlink: '#municipios',
    role: ['administrador', 'director']
  },
  {
    id: 5,
    nombre: 'Tipos Comunidades',
    ruta: '/dashboard/tipo_comunidades',
    xlink: '#tipocomunidad',
    role: ['enlace', 'administrador', 'director']
  },
  {
    id: 6,
    nombre: 'Comunidades',
    ruta: '/dashboard/comunidades',
    xlink: '#tipocomunidad',
    role: ['enlace', "juridico", 'administrador', 'director']
  },
  {
    id: 7,
    nombre: 'Representantes',
    ruta: '/dashboard/representantes',
    xlink: '#representante',
    role: ['enlace', 'administrador', 'director']
  },
  {
    id: 8,
    nombre: 'Titulares',
    ruta: '/dashboard/titulares',
    xlink: '#tipocomunidad',
    role: ['juridico', 'administrador', 'director']
  },
  {
    id: 9,
    nombre: 'Beneficiarios',
    ruta: '/dashboard/beneficiarios',
    xlink: '#tipocomunidad',
    role: ['juridico', 'administrador', 'director']
  },
  {
    id: 10,
    nombre: 'Emprendedores',
    ruta: '/dashboard/emprendedores',
    xlink: '#tipocomunidad',
    role: ['dinamizador', 'administrador', 'director']
  },
  {
    id: 11,
    nombre: 'Emisores',
    ruta: '/dashboard/emisores',
    xlink: '#representante',
    role: ['administrador', 'director']
  },
  {
    id: 12,
    nombre: 'Origenes',
    ruta: '/dashboard/origenes',
    xlink: '#calendario',
    role: ['administrador', 'director']
  },
  {
    id: 13,
    nombre: 'Compromisos',
    ruta: '/dashboard/compromisos',
    xlink: '#puzzle',
    role: ['enlace', 'juridico', 'administrador', 'director']
  },
  {
    id: 14,
    nombre: 'Acciones',
    ruta: '/dashboard/acciones',
    xlink: '#acciones',
    role: ['enlace', 'juridico', 'administrador', 'director']
  },
   {
    id: 14,
    nombre: 'Fichas',
    ruta: '/dashboard/fichas',
    xlink: '#acciones',
    role: ['enlace', 'juridico', 'administrador', 'director']
  },
  {
    id: 15,
    nombre: 'Programas',
    ruta: '/dashboard/programas',
    xlink: '#programa',
    role: ['administrador', 'director']
  },
  {
    id: 16,
    nombre: 'Dependencias',
    ruta: '/dashboard/dependencias',
    xlink: '#dependencia',
    role: ['administrador', 'director']
  },
  {
    id: 17,
    nombre: 'Tipos Acciones',
    ruta: '/dashboard/tipo_acciones',
    xlink: '#tipocomunidad',
    role: ['administrador', 'director']
  },
  {
    id: 18,
    nombre: 'Medidas',
    ruta: '/dashboard/medidas',
    xlink: '#accion',
    role: ['enlace', 'juridico', 'administrador', 'director']
  },
  {
    id: 19,
    nombre: 'Concertaciones',
    ruta: '/dashboard/concertaciones',
    xlink: '#concertaciones',
    role: ['enlace', 'juridico', 'administrador', 'director']
  },
  {
    id: 20,
    nombre: 'Regionales',
    ruta: '/dashboard/regionales',
    xlink: '#regional',
    role: ['administrador', 'director']
  },
  {
    id: 21,
    nombre: 'Centros',
    ruta: '/dashboard/centros',
    xlink: '#school',
    role: ['administrador', 'director']
  },
  {
    id: 22,
    nombre: 'Actividades Economicas',
    ruta: '/dashboard/actividades_economicas',
    xlink: '#bank',
    role: ['dinamizador', 'administrador', 'director']
  },
  {
    id: 23,
    nombre: 'Fuentes de Financiacion',
    ruta: '/dashboard/fuentes_financiacion',
    xlink: '#finance',
    role: ['dinamizador', 'administrador', 'director']
  },
  {
    id: 24,
    nombre: 'Unidades Productivas',
    ruta: '/dashboard/unidades_productivas',
    xlink: '#empresa',
    role: ['dinamizador', 'administrador', 'director']
  },
  {
    id: 25,
    nombre: 'Planes de Negocio',
    ruta: '/dashboard/planes_negocio',
    xlink: '#plan',
    role: ['dinamizador', 'administrador', 'director']
  }
];



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

        <ul v-if="rutasSeguridad[0].role.includes(role)" class="nav flex-column mb-2">
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-0 mb-1 text-body-secondary text-uppercase">
            <span>SEGURIDAD</span>
            <a class="link-secondary" href="#" aria-label="Add a new report">
              <svg class="bi">
                <use xlink:href="#plus-circle" />
              </svg>
            </a>
          </h6>
          <li class="nav-item" v-for="ruta in rutasSeguridad" :key="ruta.id">
            <template v-if="ruta.role.includes(role)">

              <router-link :to="ruta.ruta" class="nav-link d-flex align-items-center gap-2 active" aria-current="page"
                @click="cerrarSidebar()">
                <svg class="bi">
                  <use :xlink:href="ruta.xlink" />
                </svg>
                {{ ruta.nombre }}
              </router-link>
            </template>
          </li>
        </ul>


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
             <template v-if="ruta.role.includes(role)">

                <router-link :to="ruta.ruta" class="nav-link d-flex align-items-center gap-2 active" aria-current="page"
                  @click="cerrarSidebar()">
                  <svg class="bi">
                    <use :xlink:href="ruta.xlink" />
                  </svg>
                  {{ ruta.nombre }}
                </router-link>
              </template>
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
