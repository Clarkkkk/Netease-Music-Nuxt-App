<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ApiAlbumNew } from 'api'
import { post, toHttps } from 'utils'
import AlbumItem from './AlbumItem.vue'

interface Album {
    name: string
    subName: string
    artist: string
    artistPicUrl: string
    id: number
    picUrl: string
    createTime: number
}

const albums = ref<Array<Album>>([])

onMounted(() => {
    post<ApiAlbumNew>('/album/new', { limit: 12 }).then((res) => {
        albums.value = res.albums.map((item) => {
            return {
                name: item.name,
                subName: item.transNames?.[0] || item.alias[0] || '',
                artist: item.artist.name,
                artistPicUrl: item.artist.picUrl,
                id: item.id,
                picUrl: toHttps(item.picUrl),
                createTime: item.publishTime
            }
        })
    })
})
</script>

<template>
    <div
        id="new-albums"
        class="w-full md:mt-6"
    >
        <h2 class="border-l-4 border-primary px-2 text-lg/5 font-bold">新碟上架</h2>
        <ul class="relative flex w-full flex-wrap items-center py-4">
            <AlbumItem
                v-for="album in albums"
                :id="album.id"
                :key="album.id"
                :name="album.name"
                :sub-name="album.subName"
                :artist="album.artist"
                :artist-pic-url="album.artistPicUrl"
                :pic-url="album.picUrl"
                :create-time="album.createTime"
                class="album relative"
            />
        </ul>
    </div>
</template>

<style lang="scss">
#new-albums {
    .album {
        width: calc(50% - 24px);
    }

    @media (min-width: 1024px) {
        .album {
            width: calc(33% - 24px);
        }
    }

    @media (min-width: 1536px) {
        .album {
            width: calc(25% - 24px);
        }
    }
}
</style>
