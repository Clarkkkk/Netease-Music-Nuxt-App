<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from 'stores'

const { currentSong } = storeToRefs(usePlaylistStore())
</script>

<template>
    <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold text-neutral">
            {{ currentSong?.name || '--' }}
        </h1>
        <h2
            v-if="currentSong?.subName && currentSong?.subName !== 'null'"
            class="text-sm text-base-content/70"
        >
            ({{ currentSong?.subName || '--' }})
        </h2>
        <p class="mt-3 flex items-center text-sm text-base-content">
            <i-solar-microphone-bold-duotone class="mr-1 h-5 w-5 text-primary" />
            {{ currentSong?.artist || '--' }}
        </p>
    </div>
</template>

<style></style>
