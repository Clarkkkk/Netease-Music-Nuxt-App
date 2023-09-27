/** 获取视频播放地址 */
export interface ApiVideoUrl {
    api: '/video/url'
    method: 'post'
    params: {
        /** 视频 的 id */
        id: any
    }
    return: ApiResponse
}
