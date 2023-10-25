import { ref } from 'vue'
import type { ApiAlbum } from 'api'
import { toHttps, usePageData } from 'utils'

export function useAlbum() {
    const info = ref<ApiAlbum['return']['album'] | null>(null)
    const album = ref<Song[]>([])

    async function initAlbum(id: number) {
        const { data } = await usePageData<ApiAlbum>({
            api: '/album',
            params: { id },
            transform(input) {
                return {
                    code: input.code,
                    songs: input.songs.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                            alia: item.alia,
                            ar: [
                                {
                                    name: item.ar[0]?.name || '',
                                    id: item.ar[0]?.id || 0
                                }
                            ],
                            al: {
                                name: item.al.name,
                                id: item.al.id,
                                picUrl: item.al.picUrl
                            }
                        }
                    }),
                    album: {
                        name: input.album.name,
                        picUrl: input.album.picUrl,
                        tags: input.album.tags,
                        info: {
                            likedCount: input.album.info.likedCount
                        },
                        description: input.album.description,
                        artist: {
                            picUrl: input.album.artist.picUrl
                        },
                        artists: [
                            {
                                name: input.album.artists[0]?.name || '',
                                picUrl: input.album.artists[0]?.picUrl || ''
                            }
                        ],
                        briefDesc: input.album.briefDesc,
                        publishTime: input.album.publishTime
                    }
                } as unknown as ApiAlbum['return']
            }
        })
        info.value = data.value.album
        album.value = data.value.songs.map((item) => {
            return {
                id: item.id,
                name: item.name,
                subName: item.alia[0] || '',
                artist: item.ar[0]?.name || '',
                artistId: item.ar[0]?.id || 0,
                album: item.al.name,
                albumId: item.al.id,
                cover: toHttps(item.al.picUrl) || '',
                sourceid: data.value.album.id,
                timestamp: 0,
                url: '',
                status: 'not-playing'
            }
        })
    }

    return {
        album,
        info,
        initAlbum
    }
}
