import { onServerPrefetch } from 'vue'
import type { ApiLoginStatus } from 'api'
import { ONE_DAY } from 'common'
import { useCookie } from 'nuxt/app'
import { useAuthStore, useProfileStore } from 'stores'
import { useRequest } from 'utils'

export const useLoginInitEffect = async () => {
    const { login, logout } = useAuthStore()
    const { updateProfile } = useProfileStore()
    const post = useRequest()

    onServerPrefetch(async () => {
        const userCookie = useCookie('user_sct', {
            expires: new Date(Date.now() + 6 * 30 * ONE_DAY),
            httpOnly: true,
            sameSite: 'strict'
        })
        const musicCookie = useCookie('MUSIC_U')
        if (musicCookie.value) {
            const info = JSON.parse(atob(userCookie.value || '') || '{}') as { userId: number }
            if (!info.userId) {
                try {
                    const res = await post<ApiLoginStatus>('/login/status')
                    const data = res.data
                    if (data?.profile) {
                        login(data.profile.userId)
                        await updateProfile(data.profile.userId)
                        info.userId = data.profile.userId
                        userCookie.value = btoa(JSON.stringify(info))
                    }
                } catch (e) {
                    console.error(e)
                }
            } else {
                login(info.userId)
                await updateProfile(info.userId)
            }
        } else {
            userCookie.value = undefined
            await logout()
        }
    })
}
