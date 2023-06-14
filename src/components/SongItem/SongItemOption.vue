<script setup lang="ts">
import { toRef } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from 'stores'
import Button from '../Button.vue'
import { ContextMenu, ContextMenuItem } from '../ContextMenu'

/** unnecessary interface to satisfy vue compiler */
interface Song {
    id: number
    name: string
    subName: string
    artist: string
    album: string
    cover: string
    timestamp: number
    url: string
    status: 'not-playing' | 'waiting-to-play' | 'playing' | 'play-failed'
}

const song = toRef(defineProps<Song>())

const { switchToThisSong, switchToNextSong } = usePlaylistStore()
const { playMode } = storeToRefs(usePlaylistStore())

async function onPlayClick() {
    await switchToThisSong(song.value)
}

async function onPlayNextClick() {
    await switchToNextSong()
}

async function onClick() {
    alert('not implemented')
}
</script>

<template>
    <ContextMenu>
        <template #default>
            <Button class="btn-ghost btn-square btn-sm">
                <template #icon>
                    <i-solar-menu-dots-bold />
                </template>
            </Button>
        </template>

        <template #menu>
            <ContextMenuItem @click="onPlayClick">
                <i-solar-play-line-duotone class="h-5 w-5" />
                <span>立即播放</span>
            </ContextMenuItem>
            <ContextMenuItem
                v-if="playMode !== 'radio'"
                @click="onPlayNextClick"
            >
                <i-solar-play-circle-line-duotone class="h-5 w-5" />
                <span>下一首播放</span>
            </ContextMenuItem>
            <ContextMenuItem @click="onClick">
                <i-solar-list-heart-minimalistic-line-duotone class="h-5 w-5" />
                <span>收藏到歌单</span>
            </ContextMenuItem>
            <ContextMenuItem @click="onClick">
                <i-solar-vinyl-line-duotone class="h-5 w-5" />
                <span>查看专辑</span>
            </ContextMenuItem>
        </template>
    </ContextMenu>
</template>

<style scoped></style>
