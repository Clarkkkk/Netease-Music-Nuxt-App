import { computed, ref } from 'vue'
import type { ApiSongUrl } from 'api'
import { defineStore } from 'pinia'
import { post } from 'utils'

const ONE_MINUTE = 60 * 1000

export const usePlaylistStore = defineStore('playlist', () => {
    const playlist = ref<Song[]>([])
    const currentSong = ref<Song | null>(null)
    const playMode = ref<'list-loop' | 'list-sequent' | 'song-loop' | 'radio'>('list-sequent')

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
        currentSong.value = song
        if (song && !song.url) {
            await updateSongUrl(song)
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

    function resetPlaylist() {
        playlist.value = []
        updateCurrentSong(null)
    }

    async function updateSongUrl(payload: Song | Song[]) {
        if (Array.isArray(payload)) {
            const needUpdateArr = payload.filter(
                (item) => !item.url || item.timestamp + 20 * ONE_MINUTE > Date.now()
            )
            const res = await post<ApiSongUrl>('/song/url', {
                id: needUpdateArr.map((item) => item.id).join(',')
            })
            needUpdateArr.forEach((item) => {
                const data = res.data.find((d) => d.id === item.id)
                if (data) {
                    item.url = data.url
                }
            })
        } else {
            if (!payload.url || payload.timestamp + 15 * ONE_MINUTE > Date.now()) {
                const res = await post<ApiSongUrl>('/song/url', { id: payload.id })
                payload.url = res.data[0].url
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
        appendSongs,
        insertSongToNext,
        removeSong,
        resetPlaylist,
        updateSongUrl
    }
})
