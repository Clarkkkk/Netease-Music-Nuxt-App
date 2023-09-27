/** 电台 - 分类推荐 */
export interface ApiDjRecommendType {
    api: '/dj/recommend/type'
    method: 'post'
    params: {
        /** 电台类型 , 数字 , 可通过`/dj/catelist`获取 , 对应关系为 */
        type: any
    }
    return: ApiResponse
}
