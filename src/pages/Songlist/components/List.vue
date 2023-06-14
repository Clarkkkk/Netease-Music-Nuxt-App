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
                :key="song.id"
                :song="song"
            />
        </div>
    </div>
</template>

<style scoped></style>
