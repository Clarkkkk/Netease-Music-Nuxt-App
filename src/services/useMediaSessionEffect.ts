import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAudioStore, usePlaylistStore } from 'stores'

export const useMediaSessionEffect = () => {
    const { audioStatus, currentTime, duration } = storeToRefs(useAudioStore())
    const { seek, play, pause } = useAudioStore()
    const { currentSong } = storeToRefs(usePlaylistStore())
    const { switchToLastSong, switchToNextSong } = usePlaylistStore()

    onMounted(() => {
        setActionhandlers()
    })

    watch(audioStatus, (status) => {
        if (status === 'can-play') {
            updateMeta()
        }
    })

    watch(currentTime, () => {
        navigator.mediaSession.setPositionState({
            duration: duration.value,
            playbackRate: 1,
            position: currentTime.value
        })
    })

    function updateMeta() {
        if ('mediaSession' in navigator && currentSong.value) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: currentSong.value.name || '',
                artist: currentSong.value.artist || '',
                album: currentSong.value.album || '',
                artwork: [
                    {
                        src: currentSong.value.cover + '?param=512y512',
                        type: 'image/jpg',
                        sizes: '512x512'
                    }
                ]
            })
        } else {
            console.error('mediasession not available')
        }
    }

    function setActionhandlers() {
        const actionHandlers = [
            ['previoustrack', switchToLastSong],
            ['nexttrack', switchToNextSong],
            ['seekto', (details: { seekTime: number }) => seek(details.seekTime)],
            ['play', play],
            ['pause', pause]
        ] as Array<[MediaSessionAction, () => void]>

        for (const [action, handler] of actionHandlers) {
            try {
                navigator.mediaSession.setActionHandler(action, handler)
            } catch (error) {
                console.error(error)
                console.error(
                    `${error}: The media session action "${action}" is not supported yet.`
                )
            }
        }
    }
}
