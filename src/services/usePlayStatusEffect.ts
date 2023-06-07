import { ref, watch, watchEffect } from 'vue'
import type { ApiPersonalFm } from 'api'
import { storeToRefs } from 'pinia'
import { useAudioStore, useAuthStore, usePlaylistStore } from 'stores'
import { post } from 'utils'

export const usePlayStatusEffect = () => {
    const { loggedIn } = storeToRefs(useAuthStore())
    const { audioStatus, currentTime, duration } = storeToRefs(useAudioStore())
    const { updateAudioStatus, play } = useAudioStore()
    const { playlist, currentSong, nextSong, playMode } = storeToRefs(usePlaylistStore())
    const { appendSongs, updateSongUrl, switchToNextSong, updateCurrentSongStatus } =
        usePlaylistStore()
    const loading = ref(false)

    async function updateList() {
        if (loading.value) return

        loading.value = true
        try {
            const res = await post<ApiPersonalFm>('/personal_fm')
            await appendSongs(
                res.data.map((item) => {
                    return {
                        id: item.id,
                        name: `${item.name}`,
                        subName: `${item.alias[0] || item.transName}`,
                        artist: item.artists[0].name,
                        album: item.album.name,
                        cover: item.album.picUrl,
                        timestamp: Date.now(),
                        url: '',
                        status: 'not-playing'
                    }
                })
            )
        } finally {
            loading.value = false
        }
    }

    // 当前歌曲准备就绪后自动播放
    watch([currentSong, audioStatus], async () => {
        if (
            currentSong.value &&
            currentSong.value.url &&
            currentSong.value.status === 'waiting-to-play' &&
            audioStatus.value === 'can-play'
        ) {
            console.log('play current song')
            try {
                await play()
                updateCurrentSongStatus('playing')
            } catch (e) {
                console.error(e)
                updateCurrentSongStatus('play-failed')
            }
        }
    })

    // 播放即将结束时，更新状态
    watchEffect(() => {
        if (
            currentTime.value &&
            duration.value &&
            currentTime.value + 10 > duration.value &&
            audioStatus.value !== 'playing'
        ) {
            updateAudioStatus('almost-ended')
        }
    })

    // 播放即将结束时，更新下一首歌的url；播放结束时，自动切换下一首
    watch(audioStatus, () => {
        if (audioStatus.value === 'almost-ended' && nextSong.value) {
            console.log('almose end')
            updateSongUrl(nextSong.value)
        } else if (audioStatus.value === 'ended') {
            console.log('play next')
            switchToNextSong()
        }
    })

    // 切换至私人fm时，获取播放列表
    watch(
        [loggedIn, playMode],
        ([loggedIn, playMode]) => {
            if (!loggedIn || playMode !== 'radio') return
            console.log('first radio update')
            updateList()
        },
        { immediate: true }
    )

    // 播放私人fm时，如果即将到达列表末尾，更新播放列表
    watch([loggedIn, playMode, currentSong], ([loggedIn, playMode, currentSong]) => {
        if (!loggedIn || playMode !== 'radio' || !currentSong) return
        const listTail = playlist.value.slice(-2)
        if (listTail.includes(currentSong)) {
            console.log('updateList')
            updateList()
        }
    })
}
