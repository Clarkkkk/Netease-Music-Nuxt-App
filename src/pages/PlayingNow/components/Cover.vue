<script setup lang="ts">
import { useIsHovering } from 'services'
import { usePlaylistStore } from 'stores'
import { DefaultCover, Image } from 'components'

const { isHovering, onMouseEnter, onMouseLeave } = useIsHovering()
const playlist = usePlaylistStore()
</script>

<template>
    <div
        v-if="playlist.currentSong?.cover"
        class="relative w-5/6 md:h-96 md:w-96"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <Image
            v-view-transition-name="'playing-cover-shadow'"
            :src="playlist.currentSong?.cover"
            :class="[
                'absolute',
                'left-0',
                'top-0',
                'rounded-3xl',
                isHovering ? 'blur-3xl' : 'blur-xl'
            ]"
            :size="400"
        />
        <Image
            v-view-transition-name="'playing-cover'"
            :src="playlist.currentSong?.cover"
            :class="['relative', 'rounded-3xl', 'z-10', { 'scale-105': isHovering }]"
            :size="400"
        />
    </div>
    <div
        v-else
        class="relative w-5/6 overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-2xl md:h-96 md:w-96"
    >
        <DefaultCover
            v-view-transition-name="'playing-cover'"
            class="opacity-90"
        />
    </div>
</template>

<style></style>
