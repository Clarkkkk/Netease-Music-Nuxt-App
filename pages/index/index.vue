<script setup lang="ts">
import { definePageMeta } from '#imports'
import { useAuthStore } from 'stores'
import { Banner, NewAlbums, NewSongs, RecommandSonglists, RecommandSongs } from './components'

const auth = useAuthStore()

definePageMeta({
    keepalive: true
})
</script>

<template>
    <div
        id="home"
        class="container mx-auto mt-2 flex flex-col items-center pt-16 lg:mt-6 lg:flex-row lg:items-start lg:justify-between"
    >
        <div
            class="flex w-full flex-col items-center overflow-hidden lg:w-7/12 lg:overflow-visible"
        >
            <Banner />
            <RecommandSonglists v-if="auth.loggedIn" />
            <NewAlbums />
        </div>
        <div class="flex w-full flex-col items-center px-6 lg:w-1/3 lg:px-0">
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
