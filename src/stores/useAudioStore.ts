import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', () => {
    const audioRef = ref<HTMLAudioElement | null>(null)
    const duration = ref(0)
    const currentTime = ref(0)
    const loop = ref(false)
    const src = ref('')
    const status = ref<
        'not-ready' | 'can-play' | 'playing' | 'paused' | 'ended' | 'loading'
    >('not-ready')

    async function play() {
        if (audioRef.value) {
            await audioRef.value.play()
            status.value = 'playing'
        }
    }

    function pause() {
        if (audioRef.value) {
            audioRef.value.pause()
            status.value = 'paused'
        }
    }

    function seek(time: number) {
        if (audioRef.value) {
            audioRef.value.currentTime = time
            updateCurrentTime(time)
        }
    }

    function updateAudioStatus(val: typeof status.value) {
        status.value = val
    }

    function updateDuration(val: number) {
        duration.value = val
    }

    function updateCurrentTime(val: number) {
        currentTime.value = val
    }

    function setLoop(val: boolean) {
        loop.value = val
    }

    return {
        audioRef,
        duration,
        currentTime,
        status,
        src,
        loop,
        play,
        pause,
        seek,
        updateAudioStatus,
        updateDuration,
        updateCurrentTime,
        setLoop
    }
})
