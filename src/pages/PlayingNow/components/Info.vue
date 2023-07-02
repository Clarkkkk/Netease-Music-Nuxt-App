<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from 'stores'

const { currentSong } = storeToRefs(usePlaylistStore())
</script>

<template>
    <div class="flex flex-col items-center">
        <h1
            v-view-transition-name="'playing-name'"
            class="text-xl font-bold text-neutral"
        >
            {{ currentSong?.name || '未播放' }}
        </h1>
        <h2
            v-if="currentSong?.subName && currentSong?.subName !== 'null'"
            v-view-transition-name="'playing-subname'"
            class="text-sm text-base-content/70"
        >
            ({{ currentSong?.subName || '--' }})
        </h2>
        <p
            v-if="currentSong?.artist"
            v-view-transition-name="'playing-artist'"
            class="mt-3 flex items-center text-sm text-base-content"
        >
            <i-solar-microphone-bold-duotone class="mr-1 h-5 w-5 text-primary" />
            {{ currentSong?.artist || '--' }}
        </p>
    </div>
</template>

<style></style>
