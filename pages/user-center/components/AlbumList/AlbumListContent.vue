<script setup lang="ts">
import { ref } from 'vue'
import type { ApiAlbumSublist } from 'api'
import { IntersectionObserver } from 'components'
import AlbumItem from './AlbumItem.vue'
import { useScrollPosition } from './useScrollPosition'

defineProps<{
    list: ApiAlbumSublist['return']['data']
    more: boolean
    onUpdate: () => void
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const { onScroll, onWheel, centerPosition } = useScrollPosition(containerRef)
</script>

<template>
    <div
        id="user-album-list"
        ref="containerRef"
        class="relative flex h-80 items-center overflow-x-auto overflow-y-hidden"
        @scroll.passive="onScroll"
        @wheel="onWheel"
    >
        <div class="relative flex h-64 items-center">
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
                            onUpdate()
                        }
                    }
                "
            >
                {{ ' ' }}
            </IntersectionObserver>
        </div>
    </div>
</template>

<style lang="scss">
#user-album-list {
    // 16px is half width of the album image
    scroll-snap-type: x proximity;
    overscroll-behavior: contain;

    & > div {
        padding: 0 calc(50% - 16px);
        transform-style: preserve-3d;
    }
}
</style>
