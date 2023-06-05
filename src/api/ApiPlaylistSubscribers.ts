/** 歌单收藏者 */
export interface ApiPlaylistSubscribers {
    api: '/playlist/subscribers'
    method: 'post'
    params: {
        /** 取出评论数量 , 默认为 20 */
        limit: any
        /** 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*20, 其中 20 为 limit 的值 */
        offset: any
    }
    return: ApiResponse
}
