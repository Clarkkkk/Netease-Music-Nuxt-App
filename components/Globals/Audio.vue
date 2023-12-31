<script setup lang="ts">
import { ONE_MINUTE } from 'common'
import { storeToRefs } from 'pinia'
import { useAudioStore, usePlaylistStore } from 'stores'
import { wait } from 'utils'

const { audioRef, loop, audioStatus } = storeToRefs(useAudioStore())
const { updateAudioStatus, updateCurrentTime, updateDuration } = useAudioStore()
const { currentSong } = storeToRefs(usePlaylistStore())

let reloadCount = 0
async function onError() {
    if (currentSong.value && currentSong.value.timestamp + 15 * ONE_MINUTE < Date.now()) {
        updateAudioStatus('error')
    } else {
        if (reloadCount < 3) {
            console.log('reload')
            await wait(1000)
            audioRef.value?.load()
        } else {
            updateAudioStatus('error')
            reloadCount = 0
        }
    }
}
</script>

<template>
    <audio
        ref="audioRef"
        :src="currentSong?.url"
        autoplay
        :loop="loop"
        @error="onError"
        @loadeddata="updateAudioStatus('not-ready')"
        @canplay="(e) => {
            updateDuration((e.target as HTMLAudioElement).duration)
            updateAudioStatus('can-play')
        }"
        @durationchange="(e) => updateDuration((e.target as HTMLAudioElement).duration)"
        @timeupdate="(e) => updateCurrentTime((e.target as HTMLAudioElement).currentTime)"
        @play="updateAudioStatus('playing')"
        @pause="
            () => {
                if (audioStatus !== 'error') {
                    updateAudioStatus('paused')
                }
            }
        "
        @waiting="updateAudioStatus('loading')"
        @playing="updateAudioStatus('playing')"
        @ended="updateAudioStatus('ended')"
    />
</template>
