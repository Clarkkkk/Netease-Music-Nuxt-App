<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSonglist } from 'services'
import { IntersectionObserver } from 'components'
import { Info, List } from './components'

const route = useRoute()
const { info, songlist, onFullLoad, onIncrementalLoad, initSonglist, more } = useSonglist()

async function onChange(visible: boolean) {
    if (!visible) return
    onIncrementalLoad()
}

await initSonglist(Number(route.params.id))
</script>

<template>
    <div
        id="songlist-page"
        class="container mx-auto mt-6 px-6 pt-16 md:px-12"
    >
        <Info :info="info" />
        <List
            :list="songlist"
            :on-full-load="onFullLoad"
        />
        <ClientOnly>
            <IntersectionObserver
                v-if="songlist.length"
                :is-bottom="!more"
                @change="onChange"
            />
        </ClientOnly>
    </div>
</template>

<style></style>
