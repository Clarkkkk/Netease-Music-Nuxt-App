<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { type ApiSearchSongDetail, SEARCH } from 'api'
import { IntersectionObserver } from 'components'
import { post, toHttps } from 'utils'
import SongResult from './SongResult.vue'

const props = defineProps<{
    active: boolean
}>()

const route = useRoute()

const keyword = computed<string>(() => {
    return (route.query.keyword as string) || ''
})

const loading = ref(false)
const data = ref<{
    list: Song[]
    more: boolean
    offset: number
}>({
    list: [],
    more: true,
    offset: 0
})

async function getData(offset: number, keyword: string) {
    if ((!data.value.more && offset !== 0) || loading.value) return
    loading.value = true
    try {
        const res = await post<ApiSearchSongDetail>('/cloudsearch', {
            type: SEARCH.SINGLE,
            keywords: keyword,
            offset
        })
        const list = data.value.list
        const newList = res.result.songs.map((item) => {
            return {
                id: item.id,
                name: item.name,
                subName: item.alia?.[0] || '',
                artist: item.ar[0]?.name || '',
                album: item.al.name,
                cover: toHttps(item.al.picUrl),
                timestamp: 0,
                url: '',
                status: 'not-playing' as const
            }
        })
        data.value = {
            more: res.result.songCount > list.length + res.result.songs.length,
            list: offset === 0 ? newList : list.concat(newList),
            offset: offset + newList.length
        }
    } finally {
        loading.value = false
    }
}

watch(
    props,
    (propsVal) => {
        if (propsVal.active && data.value.offset === 0) {
            getData(0, keyword.value)
        }
    },
    { immediate: true, deep: true }
)

onBeforeRouteUpdate((to, from) => {
    if (!props.active) return

    if (to.query.keyword !== from.query.keyword) {
        data.value.list = []
        getData(0, to.query.keyword as string)
    }
})
</script>

<template>
    <div class="w-full">
        <SongResult
            class=""
            :list="data.list"
        />
        <IntersectionObserver
            :is-bottom="!data.more"
            @change="
                (v) => {
                    if (v && data.list.length) {
                        getData(data.offset, keyword)
                    }
                }
            "
        />
    </div>
</template>

<style lang="scss"></style>
