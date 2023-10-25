<script setup lang="ts">
import AlbumContent from './AlbumListContent.vue'
import { useAlbumList } from './useAlbumList'

const { list, getData, more, initAlbumlist } = useAlbumList()

await initAlbumlist()
</script>

<template>
    <ClientOnly>
        <AlbumContent
            :list="list"
            :more="more"
            @update="() => getData()"
        />
    </ClientOnly>
</template>

<style lang="scss"></style>
