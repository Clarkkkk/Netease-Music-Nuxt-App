import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const loggedIn = ref(false)
    const showLoginModal = ref(false)

    function login() {
        loggedIn.value = true
    }

    function logout() {
        loggedIn.value = false
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
