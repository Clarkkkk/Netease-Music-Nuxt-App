<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ApiTopSong } from 'api'
import { usePlaylistStore } from 'stores'
import { Button, SongItem } from 'components'
import { post, toHttps } from 'utils'

const AREA = {
    ALL: 0,
    CHINA: 7,
    WESTERN: 96,
    JAPAN: 8,
    KOREA: 16
} as const

const tabs = [
    {
        name: '全部',
        value: AREA.ALL
    },
    {
        name: '华语',
        value: AREA.CHINA
    },
    {
        name: '欧美',
        value: AREA.WESTERN
    },
    {
        name: '日本',
        value: AREA.JAPAN
    },
    {
        name: '韩国',
        value: AREA.KOREA
    }
]

const list = ref<Array<Song>>([])
const currentTab = ref<(typeof AREA)[keyof typeof AREA]>(AREA.ALL)
const loading = ref(false)
const { switchToThisList } = usePlaylistStore()

async function onPlayAll() {
    if (list.value.length) {
        await switchToThisList(list.value)
    }
}

function getData() {
    if (loading.value) return
    loading.value = true
    post<ApiTopSong>('/top/song', { type: currentTab.value })
        .then((res) => {
            list.value = res.data.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    subName: item.alias[0] || item.transNames?.[0] || '',
                    artist: item.artists[0].name,
                    album: item.album.name,
                    cover: toHttps(item.album.picUrl),
                    timestamp: 0,
                    url: '',
                    status: 'not-playing'
                }
            })
        })
        .finally(() => {
            loading.value = false
        })
}

onMounted(() => {
    getData()
})
</script>

<template>
    <div
        id="new-songs"
        class="flex w-full flex-col rounded-lg bg-gradient-to-b from-accent/5 to-30% p-4"
    >
        <h2
            class="flex items-center justify-between border-l-4 border-accent px-2 text-lg/5 font-bold"
        >
            <span>新歌速递</span>
            <Button
                class="btn-accent btn-outline btn-xs"
                @click="onPlayAll"
            >
                播放全部
            </Button>
        </h2>
        <div class="tabs mt-3">
            <button
                v-for="tab in tabs"
                :key="tab.value"
                :class="['tab', { 'tab-active': tab.value === currentTab }]"
                :disabled="loading"
                @click="
                    () => {
                        currentTab = tab.value
                        getData()
                    }
                "
            >
                {{ tab.name }}
            </button>
        </div>
        <ul class="song-list list relative w-full overflow-x-visible overflow-y-scroll">
            <SongItem
                v-for="song in list"
                :key="song.id"
                :song="song"
            />
        </ul>
    </div>
</template>

<style lang="scss">
#new-songs {
    @media (min-width: 768px) {
        .list {
            height: calc(100vh - 400px);
        }
    }

    .song-list::after {
        content: '';
        position: sticky;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 15px;
        background: linear-gradient(to top, hsl(var(--b1)) 0%, hsl(var(--b1) / 0%));
    }
}
</style>
