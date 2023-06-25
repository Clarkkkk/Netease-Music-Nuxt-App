<script setup lang="ts">
import { Banner, NewAlbums, NewSongs, RecommandSonglists, RecommandSongs } from './components'
</script>

<template>
    <div
        id="home"
        class="container mx-auto mt-2 flex flex-col items-center px-6 pt-16 md:mt-6 md:flex-row md:items-start md:justify-between"
    >
        <div class="w-full md:w-7/12">
            <Banner />
            <RecommandSonglists />
            <NewAlbums />
        </div>
        <div class="flex w-full flex-col items-center md:w-1/3">
            <RecommandSongs />
            <NewSongs class="mt-12" />
        </div>
    </div>
</template>

<style></style>
