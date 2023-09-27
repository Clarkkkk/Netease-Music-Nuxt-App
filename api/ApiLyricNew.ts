/** 获取逐字歌词 */
export interface ApiLyricNew {
    api: '/lyric/new'
    method: 'post'
    params: {
        /** 音乐 id */
        id: any
    }
    return: ApiResponse
}
