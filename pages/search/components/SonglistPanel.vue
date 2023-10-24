<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { type ApiSearchDetail, SEARCH } from 'api'
import { IntersectionObserver } from 'components'
import { post, toHttps } from 'utils'
import SonglistResult, { type SonglistItem } from './SonglistResult.vue'

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

async function getData(offset: number, keyword: string) {
    if ((!data.value.more && offset !== 0) || loading.value) return
    loading.value = true
    try {
        const res = await post<ApiSearchDetail<typeof SEARCH.PLAYLIST>>('/search', {
            type: SEARCH.PLAYLIST,
            keywords: keyword,
            offset
        })
        const list = data.value.list
        const newList = res.result.playlists.map((item) => {
            return {
                name: item.name,
                creator: item.creator.nickname || '',
                id: item.id,
                cover: toHttps(item.coverImgUrl || '')
            }
        })
        data.value = {
            more: res.result.playlistCount > list.length + res.result.playlists.length,
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
        <SonglistResult
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
