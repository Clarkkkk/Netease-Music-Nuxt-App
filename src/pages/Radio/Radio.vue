<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlaylistStore } from 'stores'
import { MusicBar } from 'components'
import { Cover, Info, RadioControls } from './components'

const { updatePlayMode } = usePlaylistStore()

onMounted(() => updatePlayMode('radio'))
</script>

<template>
    <div
        id="radio"
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
#radio {
    height: calc(100% - 64px);
}
</style>
