<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SEARCH } from 'api'
import { Tabs } from 'components'
import { AlbumPanel, LyricsPanel, MixedPanel, SonglistPanel, SongPanel } from './components'

const tabs = [
    {
        name: '综合',
        value: SEARCH.MIXED
    },
    {
        name: '专辑',
        value: SEARCH.ALBUM
    },
    {
        name: '歌单',
        value: SEARCH.PLAYLIST
    },
    {
        name: '歌曲',
        value: SEARCH.SINGLE
    },
    {
        name: '歌词',
        value: SEARCH.LYRICS
    }
] as const

const route = useRoute()
const router = useRouter()
const keyword = ref('')

function onSearch(val: string) {
    return router.replace({ path: '/search', query: { keyword: val } })
}

watch(
    route,
    (val) => {
        keyword.value = val.query.keyword as string
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
                type="search"
                autofocus
                class="input-primary input w-128 pl-14 text-lg"
                @keydown.enter="(e) => onSearch((e.target as HTMLInputElement).value)"
            />
        </div>

        <Tabs
            :tabs="tabs"
            class="flex w-full flex-col items-center"
            tab-class="mt-6"
            tab-pane-class="mt-2"
        >
            <template #综合="{ tab }">
                <MixedPanel :active="tab.name === '综合'" />
            </template>
            <template #专辑="{ tab }">
                <AlbumPanel :active="tab.name === '专辑'" />
            </template>
            <template #歌单="{ tab }">
                <SonglistPanel :active="tab.name === '歌单'" />
            </template>
            <template #歌曲="{ tab }">
                <SongPanel :active="tab.name === '歌曲'" />
            </template>
            <template #歌词="{ tab }">
                <LyricsPanel :active="tab.name === '歌词'" />
            </template>
        </Tabs>
    </div>
</template>

<style lang="scss">
::view-transition-old(search-input),
::view-transition-new(search-icon) {
    animation: none;
    opacity: 0;
}

::view-transition-new(search-input),
::view-transition-old(search-input),
::view-transition-new(search-icon),
::view-transition-old(search-icon) {
    animation: none;
    /* Use normal blending,
  so the new view sits on top and obscures the old view */
    mix-blend-mode: normal;
    // animation-duration: 1000ms;
    height: 100%;
}
</style>
