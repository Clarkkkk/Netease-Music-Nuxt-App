<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from 'stores'

const { currentSong } = storeToRefs(usePlaylistStore())
</script>

<template>
    <div class="flex w-full flex-col items-start justify-between overflow-hidden">
        <div
            v-if="currentSong"
            class="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-base-content"
            :title="`${currentSong.name}${currentSong.subName ? `(${currentSong.subName})` : ''}`"
        >
            <span v-view-transition-name="'playing-name'">
                {{ currentSong.name }}
            </span>
            <span v-view-transition-name="'playing-subname'">
                {{
                    currentSong.subName && currentSong.subName !== 'null'
                        ? `(${currentSong.subName})`
                        : ''
                }}
            </span>
        </div>
        <div
            v-if="currentSong"
            v-view-transition-name="'playing-artist'"
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
