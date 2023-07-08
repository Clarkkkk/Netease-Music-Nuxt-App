<script setup lang="ts">
import { useAuthStore } from 'stores'
import { Banner, NewAlbums, NewSongs, RecommandSonglists, RecommandSongs } from './components'

const auth = useAuthStore()
</script>

<template>
    <div
        id="home"
        class="container mx-auto mt-2 flex flex-col items-center px-6 pt-16 lg:mt-6 lg:flex-row lg:items-start lg:justify-between"
    >
        <div class="w-full lg:w-7/12">
            <Banner />
            <RecommandSonglists v-if="auth.loggedIn" />
            <NewAlbums />
        </div>
        <div class="flex w-full flex-col items-center lg:w-1/3">
            <RecommandSongs v-if="auth.loggedIn" />
            <NewSongs class="new-songs" />
        </div>
    </div>
</template>

<style>
.new-songs:not(:first-child) {
    @apply mt-12;
}
</style>
