/** 获取相似歌单 */
export interface ApiSimiPlaylist {
    api: '/simi/playlist'
    method: 'post'
    params: {
        /** 歌曲 id */
        id: any
    }
    return: ApiResponse
}
