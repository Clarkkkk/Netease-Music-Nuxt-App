<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAudioStore, usePlaylistStore } from 'stores'
import { Button } from 'components'

const { audioStatus } = storeToRefs(useAudioStore())
const { play, pause, playAgain } = useAudioStore()
// const { currentSong, nextSong } = storeToRefs(usePlaylistStore())
const { switchToLastSong, switchToNextSong } = usePlaylistStore()

function switchPlay() {
    if (audioStatus.value === 'ended') {
        playAgain()
    } else if (['can-play', 'paused'].includes(audioStatus.value)) {
        play()
    } else if (['playing', 'almost-ended', 'loading', 'not-ready'].includes(audioStatus.value)) {
        pause()
    }
}
</script>

<template>
    <div class="flex items-center">
        <Button
            class="btn-ghost btn-square btn-sm p-0 text-primary"
            @click="switchToLastSong"
        >
            <template #icon>
                <i-solar-skip-previous-bold-duotone class="h-5 w-5" />
            </template>
        </Button>
        <Button
            class="btn-ghost btn-square btn-sm mx-3 p-0 text-primary"
            @click="switchPlay"
        >
            <template #icon>
                <i-solar-play-bold-duotone
                    v-if="['not-ready', 'can-play', 'paused', 'ended'].includes(audioStatus)"
                    class="h-6 w-6"
                />
                <i-solar-pause-bold-duotone
                    v-else
                    class="h-6 w-6"
                />
            </template>
        </Button>
        <Button
            class="btn-ghost btn-square btn-sm p-0 text-primary"
            @click="switchToNextSong()"
        >
            <template #icon>
                <i-solar-skip-next-bold-duotone class="h-5 w-5" />
            </template>
        </Button>
    </div>
</template>

<style scoped></style>
