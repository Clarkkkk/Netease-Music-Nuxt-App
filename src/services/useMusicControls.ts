import { storeToRefs } from 'pinia'
import { useAudioStore, usePlaylistStore } from 'stores'

export const useMusicControls = () => {
    const { play } = useAudioStore()
    const { playlist, currentSong, lastSong, nextSong, playMode } = storeToRefs(usePlaylistStore())
    const { updateCurrentSong } = usePlaylistStore()

    async function playNextSong() {
        if (
            !currentSong.value ||
            playlist.value.length <= 1 ||
            playMode.value === 'song-loop' ||
            !nextSong.value
        ) {
            // do nothing
        } else {
            await updateCurrentSong(nextSong.value)
            await play()
        }
    }

    async function playLastSong() {
        if (
            !currentSong.value ||
            playlist.value.length <= 1 ||
            playMode.value === 'song-loop' ||
            !lastSong.value
        ) {
            // do nothing
        } else {
            await updateCurrentSong(lastSong.value)
            await play()
        }
    }

    return {
        playNextSong,
        playLastSong
    }
}
