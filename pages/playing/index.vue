<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { definePageMeta } from '#imports'
import { MusicBar } from 'components'
import { Cover, Info, Lyrics, RadioControls } from './components'

definePageMeta({
    keepalive: true
})

const showLyrics = useMediaQuery('(min-width: 1024px)')
</script>

<template>
    <div
        id="playing-now"
        class="flex w-full flex-col items-center pt-16 lg:flex-row lg:items-start"
    >
        <div
            v-view-transition-name="'playing-background'"
            class="flex h-full w-full flex-col items-center justify-center bg-base-100 lg:w-1/2"
        >
            <Cover />
            <Info class="mt-6 sm:mt-12" />
            <ClientOnly>
                <MusicBar class="mt-4 sm:mt-8" />
            </ClientOnly>
            <RadioControls class="mt-4 sm:mt-8" />
        </div>
        <div
            v-if="showLyrics"
            class="flex h-full w-full flex-col items-center justify-center bg-base-100 lg:w-1/2"
        >
            <Lyrics />
        </div>
    </div>
</template>

<style>
#playing-now {
    margin-bottom: -80px;
    width: 100vw;
    overflow: hidden;
    height: calc(100vh - env(safe-area-inset-bottom) - env(safe-area-inset-top));
    height: calc(100dvh - env(safe-area-inset-bottom) - env(safe-area-inset-top));
}
</style>
