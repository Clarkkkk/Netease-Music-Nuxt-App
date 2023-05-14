/** 收藏的专栏 */
export interface ApiTopicSublist {
    api: '/topic/sublist',
    method: 'post',
    params: {
        /** 取出歌单数量 , 默认为 50 */
        limit: any;
        /** 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*50, 其中 50 为 limit 的值 */
        offset: any;
    }
    return: ApiResponse;
}
