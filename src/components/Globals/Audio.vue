<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAudioStore } from 'stores'

const { audioRef, src, loop } = storeToRefs(useAudioStore())
const { updateAudioStatus, updateCurrentTime, updateDuration } = useAudioStore()
</script>

<template>
    <audio
        ref="audioRef"
        :src="src"
        :loop="loop"
        @canplay="(e) => updateDuration((e.target as HTMLAudioElement).duration)"
        @durationchange="(e) => updateDuration((e.target as HTMLAudioElement).duration)"
        @timeupdate="(e) => updateCurrentTime((e.target as HTMLAudioElement).currentTime)"
        @play="updateAudioStatus('playing')"
        @pause="updateAudioStatus('paused')"
        @waiting="updateAudioStatus('loading')"
        @playing="updateAudioStatus('playing')"
        @ended="updateAudioStatus('ended')"
    />
</template>
