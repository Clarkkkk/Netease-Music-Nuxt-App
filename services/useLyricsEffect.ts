import { onMounted, watch } from 'vue'
import type { ApiLyric } from 'api'
import { storeToRefs } from 'pinia'
import { useAudioStore, useLyricsStore, usePlaylistStore } from 'stores'
import { post } from 'utils'

export function useLyricsEffect() {
    const { player } = storeToRefs(useLyricsStore())
    const { updateLyrics, updateLyricsCurrentIndex, updateLyricsCurrentLine } = useLyricsStore()
    const { currentSong } = storeToRefs(usePlaylistStore())
    const { currentTime } = storeToRefs(useAudioStore())

    onMounted(() => {
        player.value.on('linechange', (line, index) => {
            updateLyricsCurrentLine(line)
            updateLyricsCurrentIndex(index === -1 ? player.value.lyrics.lines.length - 1 : index)
        })
    })

    watch(currentTime, (time) => {
        player.value.updateTime(time)
    })

    watch(currentSong, (song) => {
        if (song) {
            updateLyrics('')
            post<ApiLyric>('/lyric', { id: song.id }).then((res) => {
                updateLyrics(res.lrc.lyric, res.tlyric?.lyric)
            })
        }
    })
}
