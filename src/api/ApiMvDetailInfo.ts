/** 获取 mv 点赞转发评论数数据 */
export interface ApiMvDetailInfo {
    api: '/mv/detail/info'
    method: 'post'
    params: {
        /** mv 的 id */
        mvid: any
    }
    return: ApiResponse
}
