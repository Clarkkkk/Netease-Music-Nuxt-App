/** 获取相似歌手 */
export interface ApiSimiArtist {
    api: '/simi/artist'
    method: 'post'
    params: {
        /** 歌手 id */
        id: any
    }
    return: ApiResponse
}
