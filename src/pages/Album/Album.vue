<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { ApiAlbum } from 'api'
import { post, toHttps } from 'utils'
import { Info, List } from './components'

const route = useRoute()
const info = ref<ApiAlbum['return']['album'] | null>(null)
const songlist = ref<Song[]>([])

watch(
    route,
    (val) => {
        if (!val.path.includes('album')) return
        console.log(val.params.id)
        post<ApiAlbum>('/album', {
            id: +val.params.id.toString()
        }).then((res) => {
            console.log(res)
            info.value = res.album
            songlist.value = res.songs.map((item) => {
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
        class="container mx-auto mt-6 px-12 pt-16"
    >
        <Info :info="info" />
        <List :list="songlist" />
    </div>
</template>

<style></style>
