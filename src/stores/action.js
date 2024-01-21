import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import axios from 'axios'
import router from '../router';


export const useActionStore = defineStore('action', () => {
  // const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
  // const { role } = jwt_decode(token.role);

  const action = ref({})
  const token = useAuthStore().token

  const getAction = async (id) => {

    await axios.get(`http://localhost:8000/actions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        action.value = response.data
        router.push('/dashboard/evidencias')
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  return { action, getAction }
})