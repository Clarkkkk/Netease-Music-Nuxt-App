<script setup lang="ts">
import { useIsHovering } from 'services'
import { usePlaylistStore } from 'stores'
import { Image } from 'components'

const { isHovering, onMouseEnter, onMouseLeave } = useIsHovering()
const playlist = usePlaylistStore()
</script>

<template>
    <div
        class="relative w-5/6 md:h-96 md:w-96"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <Image
            :src="playlist.currentSong?.cover"
            :class="[
                'absolute',
                'left-0',
                'top-0',
                'rounded-3xl',
                isHovering ? 'blur-3xl' : 'blur-xl'
            ]"
        />
        <Image
            :src="playlist.currentSong?.cover"
            :class="['relative', 'rounded-3xl', { 'scale-105': isHovering }]"
        />
    </div>
</template>

<style></style>
