<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ApiArtistDetail } from 'api'
import { storeToRefs } from 'pinia'
import { useAlbum } from 'services'
import { usePlaylistStore } from 'stores'
import { post } from 'utils'

const { info: albumInfo, initAlbum } = useAlbum()
const { currentSong } = storeToRefs(usePlaylistStore())
const artistInfo = ref<ApiArtistDetail['return']['data']['artist']>()

watch(currentSong, async (song) => {
    if (!song) return
    initAlbum(song.albumId)
    const res = await post<ApiArtistDetail>('/artist/detail', { id: song.artistId })
    artistInfo.value = res.data.artist
})
</script>

<template>
    <div class="aspect-square w-full overflow-y-auto p-4">
        <template v-if="artistInfo">
            <h2 class="text-base font-bold text-base-content">关于歌手</h2>
            <p class="mt-2 text-xs text-base-content/70">
                {{ artistInfo.briefDesc }}
            </p>
        </template>
        <template v-if="albumInfo">
            <h2 class="mt-4 text-base font-bold text-base-content">关于专辑</h2>
            <p class="mt-2 text-xs text-base-content/70">
                {{ `《${albumInfo.name}》` }}
            </p>
            <p class="mt-2 text-xs text-base-content/70">
                {{ albumInfo.briefDesc || albumInfo.description }}
            </p>
            <p class="mt-2 text-xs text-base-content/70">
                {{
                    `发行于${new Date(albumInfo.publishTime)
                        .toLocaleDateString('cn')
                        .replaceAll('/', '-')}`
                }}
            </p>
        </template>
    </div>
</template>

<style lang="scss"></style>
