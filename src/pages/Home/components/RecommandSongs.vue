<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ApiRecommendSongs } from 'api'
import { useAuthStore, usePlaylistStore } from 'stores'
import { Button, SongItem } from 'components'
import { post, toHttps } from 'utils'

const auth = useAuthStore()
const list = ref<Array<Song>>([])
const { switchToThisList } = usePlaylistStore()

async function onPlayAll() {
    if (list.value.length) {
        await switchToThisList(list.value)
    }
}

watch(
    auth,
    (val) => {
        if (val.loggedIn) {
            post<ApiRecommendSongs>('/recommend/songs').then((res) => {
                list.value = res.data.dailySongs.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        subName: item.alia[0] || item.tns?.[0] || '',
                        artist: item.ar[0].name,
                        album: item.al.name,
                        cover: toHttps(item.al.picUrl),
                        timestamp: 0,
                        url: '',
                        status: 'not-playing'
                    }
                })
            })
        }
    },
    { immediate: true }
)
</script>

<template>
    <div
        id="recommand-songs"
        class="flex w-full flex-col rounded-lg"
    >
        <h2
            class="flex items-center justify-between border-l-4 border-primary px-2 text-lg/5 font-bold"
        >
            <span>每日推荐歌曲</span>
            <Button
                class="btn-primary btn-outline btn-xs"
                @click="onPlayAll"
            >
                播放全部
            </Button>
        </h2>
        <ul class="list w-full overflow-x-visible overflow-y-scroll px-2">
            <SongItem
                v-for="song in list"
                :key="song.id"
                :song="song"
            />
        </ul>
    </div>
</template>

<style lang="scss">
#recommand-songs {
    @media (min-width: 768px) {
        .list {
            max-height: calc(100vh - 200px);
        }
    }
}
</style>
