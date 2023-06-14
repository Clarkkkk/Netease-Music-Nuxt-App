import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

export const useDeviceType = () => {
    const isPc = useMediaQuery('(min-width: 640px)')

    const isMobile = computed(() => {
        return !isPc.value
    })

    return {
        isPc,
        isMobile
    }
}
