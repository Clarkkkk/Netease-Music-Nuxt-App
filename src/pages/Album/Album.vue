<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAlbum } from 'services'
import { Info, List } from './components'

const route = useRoute()
const { album, info, initAlbum } = useAlbum()

watch(
    route,
    (val) => {
        if (!val.path.includes('album')) return
        initAlbum(+val.params.id.toString())
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
        <List :list="album" />
    </div>
</template>

<style></style>
