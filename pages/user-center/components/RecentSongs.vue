<script setup lang="ts">
import { ref } from 'vue'
import type { ApiUserRecord } from 'api'
import { storeToRefs } from 'pinia'
import { useAuthStore, useProfileStore } from 'stores'
import { SongItem, Tabs } from 'components'
import { toHttps, usePageData, useRequest } from 'utils'

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

const { profile } = storeToRefs(useProfileStore())
const { userId } = storeToRefs(useAuthStore())
const loading = ref(false)
const weekList = ref<Array<RecentSong>>([])
const allList = ref<Array<RecentSong>>([])
const post = useRequest()

if (userId.value) {
    const { data } = await usePageData<ApiUserRecord>({
        api: '/user/record',
        params: {
            uid: userId.value,
            type: 1
        },
        transform(input) {
            return {
                code: input.code,
                weekData: input.weekData.map((item) => {
                    return {
                        playCount: item.playCount,
                        score: item.score,
                        song: {
                            id: item.song.id,
                            name: item.song.name,
                            alia: item.song.alia,
                            ar: [
                                {
                                    name: item.song.ar[0].name
                                }
                            ],
                            al: {
                                name: item.song.al.name,
                                picUrl: item.song.al.picUrl
                            },
                            playCount: item.playCount
                        }
                    }
                }) as unknown as ApiUserRecord['return']['weekData'],
                allData: []
            }
        }
    })

    weekList.value = data.value.weekData.map((item) => {
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

async function getData(type: 0 | 1) {
    if (
        !profile.value ||
        (type === 0 && !!allList.value.length) ||
        (type === 1 && !!weekList.value.length)
    ) {
        return
    }

    const res = await post<ApiUserRecord>('/user/record', {
        uid: profile.value.profile.userId,
        type
    })
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
}

function onTabChange(tab: (typeof tabs)[number]) {
    return getData(tab.value)
}
</script>

<template>
    <div
        class="recent-songs flex w-full flex-col rounded-lg bg-base-100 bg-gradient-to-b from-accent/5 to-30% p-4"
    >
        <h2
            class="flex items-center justify-between border-l-4 border-accent px-2 text-lg/5 font-bold"
        >
            <span>最近播放</span>
        </h2>
        <Tabs
            class="mt-3 h-full"
            :tabs="tabs"
            :onTabChange="onTabChange"
            :disabled="loading"
        >
            <template
                v-for="tab in tabs"
                :key="tab.name"
                #[tab.name]="{ tab: tabItem }"
            >
                <ul
                    class="song-list list relative h-full w-full overflow-x-visible overflow-y-scroll"
                >
                    <SongItem
                        v-for="song in tabItem.name === '全部' ? allList : weekList"
                        :key="song.id"
                        :song="song"
                    >
                        <div class="flex-fixed whitespace-nowrap text-xs text-base-content/80">
                            {{ song.playCount }}次
                        </div>
                    </SongItem>
                </ul>
            </template>
        </Tabs>
    </div>
</template>

<style lang="scss">
.recent-songs {
    height: 900px;
}
</style>
