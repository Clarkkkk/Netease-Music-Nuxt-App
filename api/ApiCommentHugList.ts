/** 评论抱一抱列表 */
export interface ApiCommentHugList {
    api: '/comment/hug/list'
    method: 'post'
    params: {
        /** 用户 id */
        uid: any
        /** 评论 id */
        cid: any
        /** 资源 id */
        sid: any
        /** 页数 */
        page: any
        /** 上一页返回的 cursor,默认-1,第一页不需要传 */
        cursor: any
        /** 上一页返回的 idCursor,默认-1,第一页不需要传 */
        idCursor: any
    }
    return: ApiResponse
}
