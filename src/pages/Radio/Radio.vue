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
        class="flex"
    >
        <div class="flex h-full w-1/2 flex-col items-center">
            <Cover class="mt-24" />
            <Info class="mt-12" />
            <MusicBar class="mt-8" />
            <RadioControls class="mt-8" />
        </div>
    </div>
</template>

<style scoped></style>
