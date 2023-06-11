<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ApiRecommendSongs } from 'api'
import { useAuthStore } from 'stores'
import { Image } from 'components'
import { post, toHttps } from 'utils'

const auth = useAuthStore()
const list = ref<Array<Song>>([])

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
        <h2 class="border-l-4 border-primary px-2 text-lg/5 font-bold">每日推荐歌曲</h2>
        <ul class="list w-full overflow-x-visible overflow-y-scroll">
            <li
                v-for="song in list"
                :key="song.id"
                class="my-2 flex w-full cursor-pointer items-center rounded-lg p-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
                <Image
                    :src="song.cover"
                    class="mr-2 h-10 w-10 flex-fixed rounded-lg"
                    loading="lazy"
                />
                <div class="flex w-full flex-col justify-between overflow-hidden">
                    <div
                        class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-base-content"
                        :title="`${song.name}${song.subName ? `(${song.subName})` : ''}`"
                    >
                        {{ song.name }}{{ song.subName ? `(${song.subName})` : '' }}
                    </div>
                    <div
                        class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-base-content/60"
                        :title="`${song.artist} - ${song.album}`"
                    >
                        {{ song.artist }} - {{ song.album }}
                    </div>
                </div>
            </li>
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
