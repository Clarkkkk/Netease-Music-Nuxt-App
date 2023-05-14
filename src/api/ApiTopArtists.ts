/** 热门歌手 */
export interface ApiTopArtists {
    api: '/top/artists',
    method: 'post',
    params: {
        /** 取出数量 , 默认为 50 */
        limit: any;
        /** 偏移数量 , 用于分页 , 如 :( 页数 -1)\*50, 其中 50 为 limit 的值 , 默认 */
        offset: any;
    }
    return: ApiResponse;
}
