<script setup lang="ts">
import { ref } from 'vue'
import type { ApiUserRecord } from 'api'
import { storeToRefs } from 'pinia'
import { useLoginService } from 'services'
import { SongItem } from 'components'
import { post, toHttps } from 'utils'
import { useProfileStore } from '../../../stores/useProfileStore'

const tabs = [
    {
        name: '近一周',
        value: 1
    },
    {
        name: '全部',
        value: 0
    }
] as const

type RecentSong = Song & { playCount: number }

const { onProfileLoaded } = useLoginService()
const { profile } = storeToRefs(useProfileStore())
const loading = ref(false)
const currentTab = ref<0 | 1>(tabs[0].value)
const weekList = ref<Array<RecentSong>>([])
const allList = ref<Array<RecentSong>>([])

function getData(type: 0 | 1) {
    if (
        !profile.value ||
        (type === 0 && !!allList.value.length) ||
        (type === 1 && !!weekList.value.length)
    ) {
        return
    }

    post<ApiUserRecord>('/user/record', {
        uid: profile.value.profile.userId,
        type
    }).then((res) => {
        if (type === 0) {
            allList.value = res.allData.map((item) => {
                return {
                    id: item.song.id,
                    name: item.song.name,
                    subName: item.song.alia[0] || '',
                    artist: item.song.ar[0].name,
                    album: item.song.al.name,
                    cover: toHttps(item.song.al.picUrl),
                    timestamp: 0,
                    url: '',
                    status: 'not-playing',
                    playCount: item.playCount
                } as RecentSong
            })
        } else {
            weekList.value = res.weekData.map((item) => {
                return {
                    id: item.song.id,
                    name: item.song.name,
                    subName: item.song.alia[0] || '',
                    artist: item.song.ar[0].name,
                    album: item.song.al.name,
                    cover: toHttps(item.song.al.picUrl),
                    timestamp: 0,
                    url: '',
                    status: 'not-playing',
                    playCount: item.playCount
                } as RecentSong
            })
        }
    })
}

onProfileLoaded(() => {
    getData(1)
})
</script>

<template>
    <div
        class="recent-songs flex w-full flex-col rounded-lg bg-gradient-to-b from-accent/5 to-30% p-4"
    >
        <h2
            class="flex items-center justify-between border-l-4 border-accent px-2 text-lg/5 font-bold"
        >
            <span>最近播放</span>
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
                        getData(tab.value)
                    }
                "
            >
                {{ tab.name }}
            </button>
        </div>
        <ul class="song-list list relative w-full overflow-x-visible overflow-y-scroll">
            <SongItem
                v-for="song in allList"
                v-show="currentTab === 0"
                :key="song.id"
                :song="song"
            >
                <div class="flex-fixed whitespace-nowrap text-xs text-base-content/80">
                    {{ song.playCount }}次
                </div>
            </SongItem>
            <SongItem
                v-for="song in weekList"
                v-show="currentTab === 1"
                :key="song.id"
                :song="song"
            >
                <div class="flex-fixed whitespace-nowrap text-xs text-base-content/80">
                    {{ song.playCount }}次
                </div>
            </SongItem>
        </ul>
    </div>
</template>

<style lang="scss">
.recent-songs {
    height: 900px;
}
</style>
