import { computed, ref } from 'vue'
import type { ApiSongUrl } from 'api'
import { defineStore } from 'pinia'
import { post, toHttps } from 'utils'
import { useAudioStore } from './useAudioStore'

const ONE_MINUTE = 60 * 1000

export const usePlaylistStore = defineStore('playlist', () => {
    const playlist = ref<Song[]>([])
    const historyPlaylist = ref<Song[]>([])
    const currentSong = ref<Song | null>(null)
    const playMode = ref<'list-loop' | 'list-sequent' | 'song-loop' | 'radio'>('list-sequent')
    const { updateAudioStatus } = useAudioStore()

    const nextSong = computed(() => {
        if (!currentSong.value || !playlist.value.length) {
            return null
        } else if (playMode.value === 'song-loop') {
            return currentSong.value
        } else {
            const currentIndex = playlist.value.findIndex((item) => item === currentSong.value)
            if (currentIndex > -1) {
                if (playMode.value === 'list-loop') {
                    return playlist.value[(currentIndex + 1) % playlist.value.length]
                } else {
                    return playlist.value[currentIndex + 1] || null
                }
            } else {
                return null
            }
        }
    })

    const lastSong = computed(() => {
        if (!currentSong.value || !playlist.value.length) {
            return null
        } else if (playMode.value === 'song-loop') {
            return currentSong.value
        } else {
            const currentIndex = playlist.value.findIndex((item) => item === currentSong.value)
            if (currentIndex > -1) {
                if (playMode.value === 'list-loop') {
                    return playlist.value[
                        (currentIndex - 1 + playlist.value.length) % playlist.value.length
                    ]
                } else {
                    return playlist.value[currentIndex - 1] || null
                }
            } else {
                return null
            }
        }
    })

    async function updateCurrentSong(song: Song | null) {
        if (song) {
            await updateSongUrl(song)
        }
        currentSong.value = song
        updateAudioStatus('not-ready')
        updateCurrentSongStatus('waiting-to-play')
    }

    function updatePlayMode(mode: typeof playMode.value) {
        playMode.value = mode
    }

    function updateCurrentSongStatus(status: Song['status']) {
        if (currentSong.value) {
            currentSong.value.status = status
        }
    }

    async function switchToNextSong() {
        if (
            !currentSong.value ||
            playlist.value.length <= 1 ||
            playMode.value === 'song-loop' ||
            !nextSong.value
        ) {
            // do nothing
        } else {
            updateCurrentSongStatus('not-playing')
            await updateCurrentSong(nextSong.value)
        }
    }

    async function switchToLastSong() {
        if (
            !currentSong.value ||
            playlist.value.length <= 1 ||
            playMode.value === 'song-loop' ||
            !lastSong.value
        ) {
            // do nothing
        } else {
            updateCurrentSongStatus('not-playing')
            await updateCurrentSong(lastSong.value)
        }
    }

    async function appendSongs(payload: Song | Song[]) {
        const firstAppend = !playlist.value.length
        if (Array.isArray(payload)) {
            playlist.value.push(...payload)
        } else {
            playlist.value.push(payload)
        }
        if (firstAppend) {
            await updateCurrentSong(playlist.value[0])
        }
    }

    function insertSongToNext(song: Song) {
        const currentIndex = playlist.value.findIndex((item) => item === currentSong.value)
        if (!playlist.value.length || currentIndex + 1 === playlist.value.length) {
            playlist.value.push(song)
        } else {
            playlist.value.splice(currentIndex + 1, 0, song)
        }
    }

    async function removeSong(id: number) {
        const index = playlist.value.findIndex((item) => item.id === id)

        playlist.value.splice(index, 1)

        if (id === currentSong.value?.id) {
            await updateCurrentSong(nextSong.value)
        }
    }

    async function startNewPlaylist(list: Song[], shouldPlay?: Song) {
        historyPlaylist.value = playlist.value
        playlist.value = list
        await updateCurrentSong(shouldPlay || list[0] || null)
    }

    async function restoreHistoryPlaylist(shouldPlay?: Song) {
        const history = historyPlaylist.value
        historyPlaylist.value = playlist.value
        playlist.value = history
        await updateCurrentSong(shouldPlay || playlist.value[0] || null)
    }

    async function updateSongUrl(payload: Song | Song[]) {
        if (Array.isArray(payload)) {
            const needUpdateArr = payload.filter(
                (item) => !item.url || item.timestamp + 15 * ONE_MINUTE > Date.now()
            )
            const res = await post<ApiSongUrl>('/song/url', {
                id: needUpdateArr.map((item) => item.id).join(',')
            })
            needUpdateArr.forEach((item) => {
                const data = res.data.find((d) => d.id === item.id)
                if (data) {
                    item.url = toHttps(data.url)
                }
            })
        } else {
            if (!payload.url || payload.timestamp + 15 * ONE_MINUTE < Date.now()) {
                const res = await post<ApiSongUrl>('/song/url', { id: payload.id, br: 320000 })
                payload.url = toHttps(res.data[0].url)
            }
        }
    }

    return {
        playlist,
        currentSong,
        lastSong,
        nextSong,
        playMode,
        updateCurrentSong,
        updatePlayMode,
        updateCurrentSongStatus,
        switchToNextSong,
        switchToLastSong,
        appendSongs,
        insertSongToNext,
        removeSong,
        startNewPlaylist,
        restoreHistoryPlaylist,
        updateSongUrl
    }
})
