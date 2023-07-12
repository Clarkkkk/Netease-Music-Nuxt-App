<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAudioStore, usePlaylistStore } from 'stores'
import { Image } from 'components'
import DefaultCover from 'components/DefaultCover.vue'

const audio = useAudioStore()
const playlist = usePlaylistStore()
const router = useRouter()
</script>

<template>
    <div
        class="relative mr-2 h-10 w-10 flex-fixed cursor-pointer duration-300 hover:scale-110 active:scale-100"
        @click="router.push('/playing')"
    >
        <Image
            v-if="playlist.currentSong"
            v-view-transition-name="'playing-cover-shadow'"
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
            :size="40"
        />
        <Image
            v-if="playlist.currentSong"
            v-view-transition-name="'playing-cover'"
            :src="playlist.currentSong.cover"
            class="relative z-10 h-full w-full flex-fixed rounded-lg"
            loading="lazy"
            :size="40"
        />
        <DefaultCover v-else />
    </div>
</template>

<style></style>
