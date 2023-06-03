import { ref } from 'vue'
import { defineStore } from 'pinia'
import { post } from 'utils'
import type { ApiLogout } from '../api/ApiLogout'

export const useAuthStore = defineStore('auth', () => {
    const loggedIn = ref(false)
    const userId = ref(0)
    const showLoginModal = ref(false)

    function login(id: number) {
        loggedIn.value = true
        userId.value = id
    }

    function logout() {
        return post<ApiLogout>('/logout').then((res) => {
            console.log(res)
            loggedIn.value = false
        })
    }

    function openLogin() {
        showLoginModal.value = true
    }

    function closeLogin() {
        showLoginModal.value = false
    }

    return {
        loggedIn,
        login,
        logout,
        showLoginModal,
        openLogin,
        closeLogin
    }
})
