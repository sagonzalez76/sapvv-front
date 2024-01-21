import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import axios from 'axios'

export const useEvidenceStore = defineStore('evidence', () => {
    // const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    // const { role } = jwt_decode(token.role);

    const evidence = ref({})
    const token = useAuthStore().token

    const getEvidence = async (id) => {
        console.log("WORKINGGGGGG");
        await axios.get(`http://localhost:8000/actions/${id}/evidences`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => {
                evidence.value = response.data
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

    return { evidence, getEvidence }
})