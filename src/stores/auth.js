import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import { ref } from 'vue'
import jwt_decode from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {

    const token = ref(localStorage.getItem('token')) || null
    const tokenRole = ref()
    let signIn = ref(false)


    const submitForm = async (json) => {
        signIn.value = true

        await axios.post('https://sapvv-front.onrender.com/signIn', json)

            .then((response) => {
                router.push('/dashboard/programas')
                localStorage.setItem('token', response.data.tokenSession)
                token.value = localStorage.getItem('token')
                decodedToken()
            })

            .catch((error) => {
                alert(error.response.data.message)
            })
            .finally(() => {
                signIn.value = false
            })
    }

    const logout = async () => {
        await localStorage.removeItem('token');
    }

    const decodedToken = async () => {
        if (token.value) {
            try {

                const decodedToken = jwt_decode(token.value);
                tokenRole.value = decodedToken.role

            } catch (error) {
                console.error('Error al decodificar el token: ', error);
            }
        } else {
            console.log('No se encontró un token en el localStorage.');
        }
    }


    return { token, tokenRole, submitForm, logout, decodedToken, signIn }
})
