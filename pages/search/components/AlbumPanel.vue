<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { type ApiSearchDetail, SEARCH } from 'api'
import { IntersectionObserver } from 'components'
import { post, toHttps } from 'utils'
import AlbumResult from './AlbumResult.vue'
import { type SonglistItem } from './SonglistResult.vue'

const props = defineProps<{
    active: boolean
}>()

const route = useRoute()

const keyword = computed<string>(() => {
    return (route.query.keyword as string) || ''
})

const loading = ref(false)
const data = ref<{
    list: SonglistItem[]
    more: boolean
    offset: number
}>({
    list: [],
    more: true,
    offset: 0
})

async function getData(offset: number) {
    if ((!data.value.more && offset !== 0) || loading.value) return
    loading.value = true
    try {
        const res = await post<ApiSearchDetail<typeof SEARCH.ALBUM>>('/search', {
            type: SEARCH.ALBUM,
            keywords: keyword.value,
            offset
        })
        const list = data.value.list
        const newList = res.result.albums.map((item) => {
            return {
                name: item.name,
                creator: item.artist.name || '',
                id: item.id,
                cover: toHttps(item.picUrl || '')
            }
        })
        data.value = {
            more: res.result.albumCount > list.length + res.result.albums.length,
            list: offset === 0 ? newList : list.concat(newList),
            offset: offset + newList.length
        }
    } finally {
        loading.value = false
    }
}

watch(
    [props, route],
    ([propsVal, routeVal], [_, routeOldVal]) => {
        if (
            propsVal.active &&
            (data.value.offset === 0 || routeVal.query.keyword !== routeOldVal?.query.keyword)
        ) {
            getData(0)
        }
    },
    { immediate: true, deep: true }
)
</script>

<template>
    <div class="w-full">
        <AlbumResult
            class=""
            :list="data.list"
        />
        <IntersectionObserver
            :is-bottom="!data.more"
            @change="
                (v) => {
                    if (v && data.list.length) {
                        getData(data.offset)
                    }
                }
            "
        />
    </div>
</template>

<style lang="scss"></style>
