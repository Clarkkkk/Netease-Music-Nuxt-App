/** 获取全部视频列表 */
export interface ApiVideoTimelineAll {
    api: '/video/timeline/all'
    method: 'post'
    params: {
        /** 默认 0 */
        offset: any
    }
    return: ApiResponse
}
