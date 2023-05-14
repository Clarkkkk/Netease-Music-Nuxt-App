/** 热门评论 */
export interface ApiCommentHot {
    api: '/comment/hot',
    method: 'post',
    params: {
        /** 取出评论数量 , 默认为 20 */
        limit: any;
        /** 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*20, 其中 20 为 limit 的值 */
        offset: any;
        /** 分页参数,取上一页最后一项的 `time` 获取下一页数据(获取超过 5000 条评论的时候需要用到) */
        before: any;
    }
    return: ApiResponse;
}
