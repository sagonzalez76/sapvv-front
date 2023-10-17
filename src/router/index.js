import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/DashboardMain.vue'
import Error from '../views/Error404Page.vue'
import { useAuthStore } from '../stores/auth.js'



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
      meta: { requiresAuth: true, role: 'student' }
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
      meta: { requiresAuth: true, role: 'director' }
    },

  ]
});

router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token')
  const auth = useAuthStore()

  setTimeout(() => {
    console.log(token);

    const role = auth.tokenUser
    
    console.log(role);

    if (to.meta.requiresAuth) {
      if (!token) {
        // No hay token, redirige a la página de inicio
        next('/');
      } else {
        if (to.meta.role && to.meta.role !== role) {
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
  }, 500);


});

export default router
