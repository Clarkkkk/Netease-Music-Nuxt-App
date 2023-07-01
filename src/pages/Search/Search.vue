<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { ApiSearch } from 'api'
import { post, toHttps } from 'utils'
import { AlbumResult, SonglistResult, SongResult } from './components'

const route = useRoute()
const keyword = ref('')
const songResult = ref<ApiSearch['return']['result']['song'] | null>(null)
const songlistResult = ref<ApiSearch['return']['result']['playList'] | null>(null)
const albumResult = ref<ApiSearch['return']['result']['album'] | null>(null)

const songResultList: ComputedRef<Song[]> = computed(() => {
    if (songResult.value) {
        return songResult.value.songs.map((item) => {
            return {
                id: item.id,
                name: item.name,
                subName: item.alia[0] || '',
                artist: item.ar[0]?.name,
                album: item.al.name,
                cover: toHttps(item.al.picUrl),
                timestamp: 0,
                url: '',
                status: 'not-playing'
            }
        })
    } else {
        return []
    }
})

const songlistResultList = computed(() => {
    if (songlistResult.value) {
        return songlistResult.value.playLists.map((item) => {
            return {
                name: item.name,
                creator: item.creator.nickname,
                id: item.id,
                cover: toHttps(item.coverImgUrl)
            }
        })
    } else {
        return []
    }
})

const albumResultList = computed(() => {
    if (albumResult.value) {
        return albumResult.value.albums.map((item) => {
            return {
                name: item.name,
                creator: item.artists[0]?.name || '',
                id: item.id,
                cover: toHttps(item.picUrl)
            }
        })
    } else {
        return []
    }
})

function onSearch(key: string, type: ApiSearch['params']['type'] = 1018) {
    post<ApiSearch>('/search', { type, keywords: key }).then((res) => {
        console.log(res)
        songResult.value = res.result.song
        songlistResult.value = res.result.playList
        albumResult.value = res.result.album
    })
}

watch(
    route,
    (val) => {
        keyword.value = val.query.keyword as string
        onSearch(keyword.value)
    },
    { immediate: true }
)
</script>

<template>
    <div
        id="search"
        class="container mx-auto flex flex-col items-center px-12 pt-16"
    >
        <div class="relative mr-8 mt-12">
            <i-solar-magnifer-line-duotone
                v-view-transition-name="'search-icon'"
                class="absolute left-4 top-1/2 z-10 h-6 w-6 -translate-y-1/2 text-primary"
            />
            <input
                v-model="keyword"
                v-view-transition-name="'search-input'"
                class="input-primary input w-128 pl-14 text-lg"
                @keydown.enter="(e) => onSearch((e.target as HTMLInputElement).value)"
            />
        </div>

        <SongResult :list="songResultList" />
        <SonglistResult
            class="mt-8"
            :list="songlistResultList"
        />
        <AlbumResult
            class="mt-8"
            :list="albumResultList"
        />
    </div>
</template>

<style lang="scss"></style>
