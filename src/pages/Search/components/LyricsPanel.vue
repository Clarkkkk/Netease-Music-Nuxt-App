<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { type ApiSearchSongDetail, SEARCH } from 'api'
import { Collapsible, IntersectionObserver, SongItem } from 'components'
import { post, toHttps } from 'utils'

const props = defineProps<{
    active: boolean
}>()

const route = useRoute()

const keyword = computed<string>(() => {
    return (route.query.keyword as string) || ''
})

type SongWithLyrics = Song & { lyrics: string[] }

const loading = ref(false)
const data = ref<{
    list: SongWithLyrics[]
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
        const res = await post<ApiSearchSongDetail<typeof SEARCH.LYRICS>>('/cloudsearch', {
            type: SEARCH.LYRICS,
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
                status: 'not-playing' as const,
                lyrics: item.lyrics
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

function highlightKeyword(text: string) {
    return text
        .replaceAll(/<\/?b>/g, '')
        .replaceAll(new RegExp(`(${keyword.value})`, 'gi'), '<span class="keyword">$1</span>')
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

<!-- eslint-disable vue/no-v-html -->
<template>
    <div class="lyrics-panel w-full">
        <div class="w-full rounded-xl bg-gradient-to-b from-primary/5 to-50% p-4">
            <div class="flex w-full">
                <h2
                    class="flex h-6 items-center border-l-4 border-primary px-2 text-lg font-bold text-base-content"
                >
                    歌词
                </h2>
            </div>
            <div
                v-for="song in data.list"
                :key="song.id"
            >
                <SongItem :song="song" />
                <Collapsible
                    :collapse-height="110"
                    :collapsible="song.lyrics.length >= 5"
                >
                    <div
                        v-for="line in song.lyrics"
                        :key="line"
                        class="mb-2 text-sm text-base-content/70"
                        v-html="highlightKeyword(line)"
                    />
                </Collapsible>
            </div>
        </div>
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

<style lang="scss">
.lyrics-panel {
    .keyword {
        @apply text-primary;
    }
}
</style>
