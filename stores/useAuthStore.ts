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

    async function logout() {
        await post<ApiLogout>('/logout')
        loggedIn.value = false
        userId.value = 0
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
        userId,
        showLoginModal,
        openLogin,
        closeLogin
    }
})
