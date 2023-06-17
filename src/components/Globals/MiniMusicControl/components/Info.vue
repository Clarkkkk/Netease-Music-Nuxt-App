<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from 'stores'

const { currentSong } = storeToRefs(usePlaylistStore())
const router = useRouter()
</script>

<template>
    <div
        class="flex w-full flex-col justify-between overflow-hidden"
        @click="router.push('/playing')"
    >
        <div
            v-if="currentSong"
            class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-base-content"
            :title="`${currentSong.name}${currentSong.subName ? `(${currentSong.subName})` : ''}`"
        >
            {{ currentSong.name }}{{ currentSong.subName ? `(${currentSong.subName})` : '' }}
        </div>
        <div
            v-if="currentSong"
            class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-base-content/60"
            :title="`${currentSong.artist} - ${currentSong.album}`"
        >
            {{ currentSong.artist }} - {{ currentSong.album }}
        </div>
        <div
            v-else
            class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-base-content"
        >
            未播放
        </div>
    </div>
</template>

<style></style>
