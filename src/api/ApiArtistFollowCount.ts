/** 歌手粉丝数量 */
export interface ApiArtistFollowCount {
    api: '/artist/follow/count',
    method: 'post',
    params: {
        /** 取出粉丝数量 , 默认为 20 */
        limit: any;
        /** 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*10, 其中 10 为 limit 的值 */
        offset: any;
    }
    return: ApiResponse;
}
