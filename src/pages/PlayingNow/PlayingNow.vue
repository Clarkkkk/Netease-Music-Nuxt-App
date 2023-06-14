<script setup lang="ts">
import { MusicBar } from 'components'
import { Cover, Info, RadioControls } from './components'
</script>

<template>
    <div
        id="playing-now"
        class="flex w-full flex-col items-center lg:flex-row lg:items-start"
    >
        <div class="flex h-full w-full flex-col items-center justify-center lg:w-1/2">
            <Cover />
            <Info class="mt-12" />
            <MusicBar class="mt-8" />
            <RadioControls class="mt-8" />
        </div>
    </div>
</template>

<style>
#playing-now {
    height: calc(100% - 64px);
}
</style>
