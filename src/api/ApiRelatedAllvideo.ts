/** 相关视频 */
export interface ApiRelatedAllvideo {
    api: '/related/allvideo'
    method: 'post'
    params: {
        /** 视频 的 id */
        id: any
    }
    return: ApiResponse
}
