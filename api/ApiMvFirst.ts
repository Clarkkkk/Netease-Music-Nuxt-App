/** 最新 mv */
export interface ApiMvFirst {
    api: '/mv/first'
    method: 'post'
    params: {
        /** 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 */
        area: any
    }
    return: ApiResponse
}
