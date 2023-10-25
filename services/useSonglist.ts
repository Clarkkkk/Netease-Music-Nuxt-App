import { ref } from 'vue'
import type { ApiPlaylistDetail, ApiSongDetail } from 'api'
import { toHttps, usePageData, useRequest } from 'utils'

export function useSonglist() {
    const post = useRequest()
    const info = ref<ApiPlaylistDetail['return']['playlist'] | null>(null)
    const songlist = ref<Song[]>([])
    const songlistId = ref(0)
    const songIdList = ref<number[]>([])
    const more = ref(true)
    const offset = ref(0)
    const loading = ref(false)
    const PAGE_SIZE = 30

    async function initSonglist(id: number) {
        const { data } = await usePageData<ApiPlaylistDetail>({
            api: '/playlist/detail',
            params: {
                id,
                s: 1
            },
            transform(input) {
                return {
                    code: input.code,
                    playlist: {
                        ...input.playlist,
                        tracks: input.playlist.tracks.map((item) => {
                            return {
                                id: item.id,
                                name: item.name,
                                alia: item.alia,
                                ar: [
                                    {
                                        name: item.ar[0].name
                                    }
                                ],
                                al: {
                                    name: item.al.name,
                                    picUrl: item.al.picUrl
                                }
                            }
                        })
                    }
                } as unknown as ApiPlaylistDetail['return']
            }
        })
        songlistId.value = id
        info.value = data.value.playlist
        songIdList.value = data.value.playlist.trackIds.map((item) => item.id)
        songlist.value = data.value.playlist.tracks.map((item) => {
            return {
                id: item.id,
                name: item.name,
                subName: item.alia[0] || '',
                artist: item.ar[0]?.name || '',
                album: item.al.name,
                cover: toHttps(item.al.picUrl) || '',
                sourceid: id,
                timestamp: 0,
                url: '',
                status: 'not-playing'
            } as Song
        })
        more.value = data.value.playlist.trackIds.length > data.value.playlist.tracks.length
        offset.value = data.value.playlist.tracks.length
    }

    async function onIncrementalLoad() {
        if (loading.value || !more.value) return
        loading.value = true
        try {
            const ids = songIdList.value.slice(
                offset.value,
                Math.min(offset.value + PAGE_SIZE, songIdList.value.length)
            )
            const list = await getSongsByIds(ids, songlistId.value)
            more.value = offset.value + PAGE_SIZE < songIdList.value.length
            offset.value = offset.value + PAGE_SIZE
            songlist.value.push(...list)
        } finally {
            loading.value = false
        }
    }

    async function onFullLoad() {
        if (!more.value) return

        const ids = songIdList.value.slice(offset.value)
        const list = await getSongsByIds(ids, songlistId.value)
        more.value = false
        offset.value = songIdList.value.length
        songlist.value.push(...list)
    }

    function getSongsByIds(ids: number[], songlistId: number) {
        return post<ApiSongDetail>('/song/detail', {
            ids: ids.join(',')
        }).then(({ songs }) => {
            const list: Song[] = songs.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    subName: item.alia[0] || '',
                    artist: item.ar[0]?.name || '',
                    artistId: item.ar[0]?.id || 0,
                    album: item.al.name,
                    cover: toHttps(item.al.picUrl) || '',
                    albumId: item.al.id,
                    sourceid: songlistId,
                    timestamp: 0,
                    url: '',
                    status: 'not-playing'
                }
            })
            return list
        })
    }

    return {
        info,
        songlist,
        loading,
        more,
        initSonglist,
        onIncrementalLoad,
        onFullLoad
    }
}
