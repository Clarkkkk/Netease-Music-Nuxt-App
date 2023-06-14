<script setup lang="ts">
import { useDeviceType, useIsHovering } from 'services'
import Image from '../Image.vue'
import SongItemOption from './SongItemOption.vue'
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

defineProps<{ song: Song }>()
const { isHovering, onMouseEnter, onMouseLeave } = useIsHovering()
const { isPc } = useDeviceType()
</script>

<template>
    <li
        class="my-2 flex w-full items-center rounded-lg p-2 transition-all duration-500 @container hover:bg-base-200/50"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <div class="relative mr-2 h-10 w-10 flex-fixed">
            <Image
                :src="song.cover"
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
                    { blur: isHovering }
                ]"
                loading="lazy"
            />
            <Image
                :src="song.cover"
                class="relative z-10 h-full w-full flex-fixed rounded-lg"
                loading="lazy"
            />
        </div>
        <div class="flex w-full flex-col justify-between overflow-hidden @2xl:hidden">
            <div
                class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-base-content"
                :title="`${song.name}${song.subName ? `(${song.subName})` : ''}`"
            >
                {{ song.name }}{{ song.subName ? `(${song.subName})` : '' }}
            </div>
            <div
                class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-base-content/60"
                :title="`${song.artist} - ${song.album}`"
            >
                {{ song.artist }} - {{ song.album }}
            </div>
        </div>
        <div class="hidden w-5/12 flex-col overflow-hidden text-sm @2xl:flex">
            <span
                class="overflow-hidden text-ellipsis whitespace-nowrap"
                :title="song.name"
            >
                {{ song.name }}
            </span>
            <span
                v-if="song.subName"
                class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-base-content/60"
                :title="song.subName ? `(${song.subName})` : ''"
            >
                {{ song.subName ? `(${song.subName})` : '' }}
            </span>
        </div>
        <div
            class="hidden w-2/12 overflow-hidden text-ellipsis whitespace-nowrap text-sm @2xl:block"
            :title="song.artist"
        >
            {{ song.artist }}
        </div>
        <div
            class="hidden w-5/12 overflow-hidden text-ellipsis whitespace-nowrap text-sm @2xl:block"
            :title="song.album"
        >
            {{ song.album }}
        </div>
        <SongItemOption
            :song="song"
            :class="['ml-2', 'transition-all', { 'opacity-0': !isHovering && isPc }]"
        />
    </li>
</template>

<style scoped></style>
