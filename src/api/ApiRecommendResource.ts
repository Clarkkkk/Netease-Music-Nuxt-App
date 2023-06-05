/** 获取每日推荐歌单 */
export interface ApiRecommendResource {
    api: '/recommend/resource'
    method: 'post'
    return: ApiResponse
}
