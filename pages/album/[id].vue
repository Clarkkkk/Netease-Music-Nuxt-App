<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAlbum } from 'services'
import { Info, List } from './components'

const route = useRoute()
const { album, info, initAlbum } = useAlbum()

await initAlbum(Number(route.params.id.toString()))
</script>

<template>
    <div
        id="songlist-page"
        class="container mx-auto mt-6 px-6 pt-16 md:px-12"
    >
        <Info :info="info" />
        <List :list="album" />
    </div>
</template>

<style></style>
