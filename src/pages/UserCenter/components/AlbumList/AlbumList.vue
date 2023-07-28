<script setup lang="ts">
import { ref } from 'vue'
import { IntersectionObserver } from 'components'
import AlbumItem from './AlbumItem.vue'
import { useAlbumList } from './useAlbumList'
import { useScrollPosition } from './useScrollPosition'

const { list, getData, more } = useAlbumList()

const containerRef = ref<HTMLDivElement | null>(null)
const { onScroll, onWheel, centerPosition } = useScrollPosition(containerRef)
</script>

<template>
    <div
        id="user-album-list"
        ref="containerRef"
        class="relative flex h-64 items-center overflow-x-auto overflow-y-hidden"
        @scroll.passive="onScroll"
        @wheel="onWheel"
    >
        <AlbumItem
            v-for="album in list"
            :id="album.id"
            :key="album.id"
            :img="album.picUrl"
            :position="centerPosition"
        />
        <IntersectionObserver
            v-if="list.length"
            :is-bottom="!more"
            @change="
                (visible) => {
                    if (visible) {
                        getData()
                    }
                }
            "
        />
    </div>
</template>

<style lang="scss">
#user-album-list {
    // 16px is half width of the album image
    padding: 0 calc(50% - 16px);
    scroll-snap-type: x proximity;
    overscroll-behavior: contain;
}
</style>
