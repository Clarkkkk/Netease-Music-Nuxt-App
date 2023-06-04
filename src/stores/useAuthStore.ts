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
        if (userId.value) {
            return post<ApiLogout>('/logout').then(() => {
                loggedIn.value = false
            })
        } else {
            loggedIn.value = false
            return Promise.resolve()
        }
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
