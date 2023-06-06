import { onBeforeMount } from 'vue'
import { useStorage } from '@vueuse/core'
import type { ApiLoginStatus } from 'api'
import { ONE_HOUR } from 'common'
import { useAuthStore, useProfileStore } from 'stores'
import { post } from 'utils'

export const useLoginInitEffect = () => {
    const { login, logout } = useAuthStore()
    const { updateProfile } = useProfileStore()
    const loginStorage = useStorage<{ userId: number; expires: number }>('music-app-login', {
        userId: 0,
        expires: 0
    })

    function resetLoginStorage() {
        loginStorage.value.userId = 0
        loginStorage.value.expires = 0
    }

    onBeforeMount(() => {
        if (Date.now() + 2 * ONE_HOUR < loginStorage.value.expires) {
            if (loginStorage.value.userId) {
                login(loginStorage.value.userId)
                updateProfile(loginStorage.value.userId)
            } else {
                post<ApiLoginStatus>('/login/status')
                    .then(({ data }) => {
                        if (data.profile) {
                            login(data.profile.userId)
                            updateProfile(data.profile.userId)
                            loginStorage.value.userId = data.profile.userId
                        } else {
                            resetLoginStorage()
                            logout()
                        }
                    })
                    .catch(() => {
                        resetLoginStorage()
                        logout()
                    })
            }
        } else {
            if (loginStorage.value.userId) {
                logout()
                window.location.reload()
            }
            resetLoginStorage()
        }
    })
}
