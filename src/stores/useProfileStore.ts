import { ref } from 'vue'
import { defineStore } from 'pinia'
import { post } from 'utils'
import type { ApiUserDetail } from '../api/ApiUserDetail'

export const useProfileStore = defineStore('profile', () => {
    const profile = ref<ApiUserDetail['return'] | null>(null)

    function updateProfile(uid: number) {
        return post<ApiUserDetail>('/user/detail', {
            uid
        }).then((res) => {
            profile.value = res
        })
    }

    return {
        profile,
        updateProfile
    }
})
