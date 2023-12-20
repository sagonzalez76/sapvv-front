import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/DashboardMain.vue'
import Error from '../views/Error404Page.vue'
import { useAuthStore } from '../stores/auth.js'
import Programas from '../components/dashboard/ProgramasComponent.vue'
import Medidas from '../components/dashboard/MedidasComponent.vue'
import Usuarios from '../components/dashboard/UsuariosComponent.vue'
import Roles from '../components/dashboard/RolesComponent.vue'
import Departamentos from '../components/dashboard/DepartamentosComponent.vue'
import Emisores from '../components/dashboard/EmisoresComponent.vue'
import Municipios from '../components/dashboard/MunicipiosComponent.vue'
import TipoComunidades from '../components/dashboard/TipoComunidadesComponent.vue'
import Comunidades from '../components/dashboard/ComunidadesComponent.vue'
import Representantes from '../components/dashboard/RepresentantesComponent.vue'
import Concertaciones from '../components/dashboard/ConcertacionesComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true, roles: ['student', 'director', 'juridico', 'enlace', 'dinamizador'] },
      children: [
        { path: '/dashboard/usuarios', component: Usuarios },
        { path: '/dashboard/roles', component: Roles },
        { path: '/dashboard/programas', component: Programas },
        { path: '/dashboard/medidas', component: Medidas },
        { path: '/dashboard/programas', component: Programas },
        { path: '/dashboard/programas', component: Programas },
        { path: '/dashboard/programas', component: Programas },
        { path: '/dashboard/emisores', component: Emisores },
        { path: '/dashboard/departamentos', component: Departamentos },
        { path: '/dashboard/municipios', component: Municipios },
        { path: '/dashboard/tipo_comunidades', component: TipoComunidades },
        { path: '/dashboard/comunidades', component: Comunidades },
        { path: '/dashboard/representantes', component: Representantes },
        { path: '/dashboard/concertaciones', component: Concertaciones },





      ],
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
      meta: { requiresAuth: false }
    },

  ]
});

router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token')

  const auth = useAuthStore()
  auth.decodedToken()

  const role = auth.tokenRole

  if (to.meta.requiresAuth) {
    if (!token) {
      // No hay token, redirige a la página de inicio
      next('/');
    } else {
      if (to.meta.roles && !to.meta.roles.includes(role)) {
        // Rol no coincide, redirige a la página de error
        next('/error');
      } else {
        // Cumple con los requisitos de autenticación y rol, continúa la navegación
        next();
      }
    }
  } else {
    // No requiere autenticación, continúa la navegación
    next();
  }



});

export default router
