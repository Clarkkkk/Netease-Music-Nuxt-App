<script setup lang="ts">
import { useAudioStore, usePlaylistStore } from 'stores'
import { Image } from 'components'
import DefaultCover from 'components/DefaultCover.vue'

const audio = useAudioStore()
const playlist = usePlaylistStore()
</script>

<template>
    <div class="relative mr-2 h-10 w-10 flex-fixed">
        <Image
            v-if="playlist.currentSong"
            :src="playlist.currentSong.cover"
            :class="[
                'absolute',
                'left-0',
                'top-0',
                'h-full',
                'w-full',
                'flex-fixed',
                'rounded-lg',
                'transition-all',
                'duration-500',
                'opacity-50',
                { blur: audio.audioStatus === 'playing' }
            ]"
            loading="lazy"
        />
        <Image
            v-if="playlist.currentSong"
            :src="playlist.currentSong.cover"
            class="relative z-10 h-full w-full flex-fixed rounded-lg"
            loading="lazy"
        />
        <DefaultCover v-else />
    </div>
</template>

<style scoped></style>
