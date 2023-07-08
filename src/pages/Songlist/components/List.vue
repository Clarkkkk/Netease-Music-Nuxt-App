<script setup lang="ts">
import { usePlaylistStore } from 'stores'
import { Button, SongItem } from 'components'

const props = defineProps<{ list: Song[]; onFullLoad: () => Promise<void> }>()
const { switchToThisList } = usePlaylistStore()

async function onPlayAll() {
    await props.onFullLoad()
    await switchToThisList(props.list)
}
</script>

<template>
    <div class="mt-12 w-full">
        <div class="flex w-full items-center justify-between">
            <h2 class="text-lg font-bold text-base-content">播放列表</h2>
            <Button
                class="btn-secondary btn-outline btn-xs"
                @click="onPlayAll"
            >
                播放全部
            </Button>
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
