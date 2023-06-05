/** mv 地址 */
export interface ApiMvUrl {
    api: '/mv/url'
    method: 'post'
    params: {
        /** mv id */
        id: any
        /** 分辨率,默认 1080,可从 `/mv/detail` 接口获取分辨率列表 */
        r: any
    }
    return: ApiResponse
}
