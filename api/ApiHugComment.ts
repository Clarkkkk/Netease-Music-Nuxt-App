/** 抱一抱评论 */
export interface ApiHugComment {
    api: '/hug/comment'
    method: 'post'
    params: {
        /** 用户 id */
        uid: any
        /** 评论 id */
        cid: any
        /** 资源 id */
        sid: any
    }
    return: ApiResponse
}
