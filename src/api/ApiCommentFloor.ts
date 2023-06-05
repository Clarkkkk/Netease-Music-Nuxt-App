/** 楼层评论 */
export interface ApiCommentFloor {
    api: '/comment/floor'
    method: 'post'
    params: {
        /** 楼层评论 id */
        parentCommentId: any
        /** 取出评论数量 , 默认为 20 */
        limit: any
        /** 分页参数,取上一页最后一项的 `time` 获取下一页数据 */
        time: any
    }
    return: ApiResponse
}
