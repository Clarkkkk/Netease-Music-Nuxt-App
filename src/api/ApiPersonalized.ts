/** 推荐歌单 */
export interface ApiPersonalized {
    api: '/personalized'
    method: 'post'
    params: {
        /** 取出数量 , 默认为 30 (不支持 offset) */
        limit: any
    }
    return: ApiResponse
}
