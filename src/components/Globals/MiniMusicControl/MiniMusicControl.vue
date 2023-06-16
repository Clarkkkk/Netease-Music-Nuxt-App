<script setup lang="ts">
import { Controls, Cover, Info, MusicBar, Playlist } from './components'
</script>

<template>
    <div
        id="mini-music-control"
        class="fixed bottom-4 left-0 flex w-full items-center justify-center rounded-xl px-2"
    >
        <div
            class="container flex items-center rounded-xl bg-base-100/60 px-3 py-2 shadow-xl shadow-gray-400/10 backdrop-blur-xl"
        >
            <Cover />
            <Info />
            <MusicBar />
            <Controls />
            <Playlist />
        </div>
    </div>
</template>

<style></style>
