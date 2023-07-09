import { onMounted, ref } from 'vue'
import type { ApiAlbumSublist } from 'api'
import { post } from 'utils'

export function useAlbumList() {
    const list = ref<ApiAlbumSublist['return']['data']>([])
    const SIZE = 50
    const currentOffset = ref(0)
    const more = ref(true)
    const loading = ref(false)

    async function getData() {
        if (!more.value || loading.value) return
        const res = await post<ApiAlbumSublist>('/album/sublist', {
            limit: SIZE,
            offset: currentOffset.value
        })
        currentOffset.value += SIZE
        more.value = res.hasMore
        list.value.push(...res.data)
    }

    onMounted(() => {
        getData()
    })

    return {
        list,
        more,
        getData
    }
}
