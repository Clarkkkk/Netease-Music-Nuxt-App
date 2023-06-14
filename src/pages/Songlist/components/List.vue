<script setup lang="ts">
import { SongItem } from 'components'

defineProps<{ list: Song[] }>()
</script>

<template>
    <div class="mt-12 w-full">
        <div class="flex w-full">
            <h2 class="text-lg font-bold text-base-content">播放列表</h2>
        </div>
        <div>
            <SongItem
                v-for="song in list"
                :id="song.id"
                :key="song.id"
                :album="song.album"
                :artist="song.artist"
                :cover="song.cover"
                :name="song.name"
                :status="song.status"
                :timestamp="song.timestamp"
                :sub-name="song.subName"
                :url="song.url"
            />
        </div>
    </div>
</template>

<style scoped></style>
