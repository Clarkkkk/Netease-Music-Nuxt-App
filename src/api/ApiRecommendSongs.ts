/** 获取每日推荐歌曲 */
export interface ApiRecommendSongs {
    api: '/recommend/songs',
    method: 'post',
    return: ApiResponse;
}
