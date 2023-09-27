/** 获取歌手 mv */
export interface ApiArtistMv {
    api: '/artist/mv'
    method: 'post'
    params: {
        /** 歌手 id, 可由搜索接口获得 */
        id: any
    }
    return: ApiResponse
}
