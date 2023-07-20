import { ref } from 'vue'
import { Lyrics, LyricsPlayer } from 'paroles'
import { defineStore } from 'pinia'

export const useLyricsStore = defineStore('lyrics', () => {
    const lyrics = ref<Lyrics>(new Lyrics(''))
    const player = ref<LyricsPlayer>(new LyricsPlayer(lyrics.value as Lyrics))
    const lyricsCurrentIndex = ref(0)
    const lyricsCurrentLine = ref('')

    function updateLyrics(original: string, translated?: string) {
        const originalLyrics = new Lyrics(original)
        const translatedLyrics = new Lyrics(translated)
        originalLyrics.merge(translatedLyrics, {
            resolveConflict: (original, affiliate) => {
                return `${original}\n${affiliate}`
            }
        })
        lyrics.value = originalLyrics
        player.value.rewind(originalLyrics)
    }

    function updateLyricsCurrentIndex(val: number) {
        lyricsCurrentIndex.value = val
    }

    function updateLyricsCurrentLine(val: string) {
        lyricsCurrentLine.value = val
    }

    return {
        lyrics,
        player,
        lyricsCurrentIndex,
        lyricsCurrentLine,
        updateLyrics,
        updateLyricsCurrentIndex,
        updateLyricsCurrentLine
    }
})
