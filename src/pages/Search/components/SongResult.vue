<script setup lang="ts">
import { SongItem } from 'components'

defineProps<{ list: Song[] }>()
</script>

<template>
    <div class="mt-16 w-full rounded-xl bg-gradient-to-b from-primary/5 to-100% p-4">
        <div class="flex w-full">
            <h2 class="text-lg font-bold text-base-content">歌曲</h2>
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

<style lang="scss"></style>
