<script setup lang="ts">
import { Banner, NewAlbums, RecommandSonglists, RecommandSongs } from './components'
</script>

<template>
    <div
        id="home"
        class="container mx-auto mt-6 flex"
    >
        <div class="w-2/3">
            <Banner />
            <RecommandSonglists />
            <NewAlbums />
        </div>
        <div class="flex w-1/3 justify-center">
            <RecommandSongs />
        </div>
    </div>
</template>

<style></style>
