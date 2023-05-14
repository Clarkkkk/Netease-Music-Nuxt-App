/** 获取热门话题 */
export interface ApiHotTopic {
    api: '/hot/topic',
    method: 'post',
    params: {
        /** 取出评论数量 , 默认为 20 */
        limit: any;
        /** 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*20, 其中 20 为 limit 的值 */
        offset: any;
    }
    return: ApiResponse;
}
