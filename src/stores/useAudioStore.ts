import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', () => {
    const audioRef = ref<HTMLAudioElement | null>(null)
    const duration = ref(0)
    /** 当前已播放时间，单位是秒 */
    const currentTime = ref(0)
    const loop = ref(false)
    const audioStatus = ref<
        'not-ready' | 'can-play' | 'playing' | 'paused' | 'almost-ended' | 'ended' | 'loading'
    >('not-ready')

    async function play() {
        console.log('play')
        if (audioRef.value) {
            try {
                await audioRef.value.play()

                audioStatus.value = 'playing'
            } catch (e: any) {
                console.error(e)
                console.log(e.name)
                console.log(e.message)
                if (e.name === 'NotAllowedError') {
                    audioStatus.value = 'paused'
                }
                // throw new Error(e)
            }
        }
    }

    function pause() {
        if (audioRef.value) {
            audioRef.value.pause()
            audioStatus.value = 'paused'
        }
    }

    function seek(time: number) {
        if (audioRef.value) {
            audioRef.value.currentTime = time
            updateCurrentTime(time)
        }
    }

    function updateAudioStatus(val: typeof audioStatus.value) {
        console.log(currentTime.value)
        console.log(duration.value)
        console.log('updateAudioStatus: ' + val)
        audioStatus.value = val
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
        audioStatus,
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
