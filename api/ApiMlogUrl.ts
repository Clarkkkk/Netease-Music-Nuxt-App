/** 获取 mlog 播放地址 */
export interface ApiMlogUrl {
    api: '/mlog/url'
    method: 'post'
    params: {
        /** 分辨率 , 默认为 1080 */
        res: any
    }
    return: ApiResponse
}
