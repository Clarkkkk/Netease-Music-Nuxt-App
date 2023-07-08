<script setup lang="ts">
import { watch } from 'vue'
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

watch(
    route,
    (val) => {
        if (!val.path.includes('songlist')) return
        initSonglist(Number(val.params.id))
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
        <List
            :list="songlist"
            :on-full-load="onFullLoad"
        />
        <IntersectionObserver
            v-if="songlist.length"
            :is-bottom="!more"
            @change="onChange"
        />
    </div>
</template>

<style></style>
