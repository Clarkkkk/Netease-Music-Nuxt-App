<script setup lang="ts">
import { ref } from 'vue'
import { usePlaylistStore } from 'stores'
import { Image } from 'components'

const isHovering = ref(false)
const playlist = usePlaylistStore()
</script>

<template>
    <div
        id="radio-cover"
        class="relative h-96 w-96"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
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

<style scoped></style>
