<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { ApiPlaylistDetail, ApiSongDetail } from 'api'
import { IntersectionObserver } from 'components'
import { post, toHttps } from 'utils'
import { Info, List } from './components'

const route = useRoute()
const info = ref<ApiPlaylistDetail['return']['playlist'] | null>(null)
const songlist = ref<Song[]>([])
const songIdList = ref<number[]>([])
const more = ref(true)
const offset = ref(0)
const loading = ref(false)
const PAGE_SIZE = 30

async function onChange(visible: boolean) {
    console.log('on change')
    console.log(visible)
    console.log(loading.value)
    console.log(more.value)
    console.log(!visible || loading.value || !more.value)
    if (!visible || loading.value || !more.value) return
    loading.value = true
    try {
        const { songs } = await post<ApiSongDetail>('/song/detail', {
            ids: songIdList.value
                .slice(offset.value, Math.min(offset.value + PAGE_SIZE, songIdList.value.length))
                .join(',')
        })
        const list: Song[] = songs.map((item) => {
            return {
                id: item.id,
                name: item.name,
                subName: item.alia[0] || '',
                artist: item.ar[0]?.name || '',
                album: item.al.name,
                cover: toHttps(item.al.picUrl) || '',
                timestamp: 0,
                url: '',
                status: 'not-playing'
            }
        })
        more.value = offset.value + PAGE_SIZE < songIdList.value.length
        offset.value = offset.value + PAGE_SIZE
        songlist.value.push(...list)
    } finally {
        loading.value = false
    }
}

watch(
    route,
    (val) => {
        if (!val.path.includes('songlist')) return
        console.log(val.params.id)
        post<ApiPlaylistDetail>('/playlist/detail', {
            id: Number(val.params.id),
            s: 1
        }).then((res) => {
            console.log(res)
            info.value = res.playlist
            songlist.value = res.playlist.tracks.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    subName: item.alia[0] || '',
                    artist: item.ar[0]?.name || '',
                    album: item.al.name,
                    cover: toHttps(item.al.picUrl) || '',
                    timestamp: 0,
                    url: '',
                    status: 'not-playing'
                }
            })
            songIdList.value = res.playlist.trackIds.map((item) => item.id)
            more.value = res.playlist.trackIds.length > res.playlist.tracks.length
            offset.value = res.playlist.tracks.length
        })
    },
    {
        immediate: true
    }
)
</script>

<template>
    <div
        id="songlist-page"
        class="container mx-auto mt-6 px-12 pt-16"
    >
        <Info :info="info" />
        <List :list="songlist" />
        <IntersectionObserver
            v-if="songlist.length"
            :is-bottom="!more"
            @change="onChange"
        />
    </div>
</template>

<style></style>
