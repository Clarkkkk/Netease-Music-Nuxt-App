/** 获取 mv 数据 */
export interface ApiMvDetail {
    api: '/mv/detail'
    method: 'post'
    params: {
        /** mv 的 id */
        mvid: any
    }
    return: ApiResponse
}
