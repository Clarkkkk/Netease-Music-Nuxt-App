import { ref } from 'vue'
import type { ApiAlbumSublist } from 'api'
import { post, usePageData } from 'utils'

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

    async function initAlbumlist() {
        const { data } = await usePageData<ApiAlbumSublist>({
            api: '/album/sublist',
            params: {
                limit: SIZE,
                offset: currentOffset.value
            }
        })
        currentOffset.value += SIZE
        more.value = data.value.hasMore
        list.value.push(...data.value.data)
    }

    return {
        list,
        more,
        initAlbumlist,
        getData
    }
}
