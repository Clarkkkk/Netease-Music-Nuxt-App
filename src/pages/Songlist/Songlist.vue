<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { ApiPlaylistDetail } from 'api'
import { post, toHttps } from 'utils'
import { Info, List } from './components'

const route = useRoute()
const info = ref<ApiPlaylistDetail['return']['playlist'] | null>(null)
const songlist = ref<Song[]>([])

watch(
    route,
    (val) => {
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
        class="container mx-auto mt-6 px-12"
    >
        <Info :info="info" />
        <List :list="songlist" />
    </div>
</template>

<style scoped></style>
