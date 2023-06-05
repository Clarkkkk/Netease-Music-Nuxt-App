/** 电台 - 详情 */
export interface ApiDjDetail {
    api: '/dj/detail'
    method: 'post'
    params: {
        /** 电台 的 id */
        rid: any
    }
    return: ApiResponse
}
