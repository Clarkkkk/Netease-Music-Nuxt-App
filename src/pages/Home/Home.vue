<script setup lang="ts">
import { Banner, NewAlbums, NewSongs, RecommandSonglists, RecommandSongs } from './components'
</script>

<template>
    <div
        id="home"
        class="container mx-auto mt-2 flex flex-col items-center px-6 pt-16 lg:mt-6 lg:flex-row lg:items-start lg:justify-between"
    >
        <div class="w-full lg:w-7/12">
            <Banner />
            <RecommandSonglists />
            <NewAlbums />
        </div>
        <div class="flex w-full flex-col items-center lg:w-1/3">
            <RecommandSongs />
            <NewSongs class="mt-12" />
        </div>
    </div>
</template>

<style></style>
