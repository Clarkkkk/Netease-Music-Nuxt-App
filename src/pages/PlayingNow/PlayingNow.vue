<script setup lang="ts">
import { useDeviceType } from 'services'
import { MusicBar } from 'components'
import { Cover, Info, Lyrics, RadioControls } from './components'

const { isPc } = useDeviceType()
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
            <Info class="mt-12" />
            <MusicBar class="mt-8" />
            <RadioControls class="mt-8" />
        </div>
        <div
            v-if="isPc"
            class="flex h-full w-full flex-col items-center justify-center bg-base-100 lg:w-1/2"
        >
            <Lyrics />
        </div>
    </div>
</template>

<style>
#playing-now {
    height: calc(100vh - 80px);
    height: calc(100dvh - 80px);
}
</style>
