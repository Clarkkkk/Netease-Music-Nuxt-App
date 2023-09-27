/** 关注歌手新歌 */
export interface ApiArtistNewSong {
    api: '/artist/new/song'
    method: 'post'
    params: {
        /** 取出评论数量 , 默认为 20 */
        limit: any
        /** 上一页数据返回的 publishTime 的数据 */
        before: any
    }
    return: ApiResponse
}
