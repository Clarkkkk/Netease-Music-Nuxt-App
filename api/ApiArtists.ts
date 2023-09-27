/** 获取歌手单曲 */
export interface ApiArtists {
    api: '/artists'
    method: 'post'
    params: {
        /** 歌手 id, 可由搜索接口获得 */
        id: any
    }
    return: ApiResponse
}
