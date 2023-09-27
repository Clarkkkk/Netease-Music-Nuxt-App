import { onBeforeMount } from 'vue'
import type { ApiLoginStatus } from 'api'
import { ONE_HOUR } from 'common'
import { storeToRefs } from 'pinia'
import { useAuthStore, useProfileStore } from 'stores'
import { post } from 'utils'

export const useLoginInitEffect = () => {
    const { login, logout, storeLoginInfo } = useAuthStore()
    const { loginInfo } = storeToRefs(useAuthStore())
    const { updateProfile } = useProfileStore()

    onBeforeMount(async () => {
        if (Date.now() + 2 * ONE_HOUR < loginInfo.value.expires) {
            // cookie未过期，则直接更新store中的登录态
            if (loginInfo.value.userId) {
                login(loginInfo.value.userId)
                updateProfile(loginInfo.value.userId)
            } else {
                // 刚完成登录后，本地loginInfo的userId暂不存在，需要请求接口获取
                try {
                    const { data } = await post<ApiLoginStatus>('/login/status')
                    if (data.profile) {
                        login(data.profile.userId)
                        storeLoginInfo({ userId: data.profile.userId })
                        await updateProfile(data.profile.userId)
                    } else {
                        await logout()
                    }
                } catch (e) {
                    console.error(e)
                    await logout()
                }
            }
        } else {
            // 为保证用户体验，如果cookie在两小时内过期，则登出让用户重新登录
            await logout()
        }
    })
}
