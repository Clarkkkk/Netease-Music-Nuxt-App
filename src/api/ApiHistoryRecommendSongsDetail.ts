/** 获取历史日推详情数据 */
export interface ApiHistoryRecommendSongsDetail {
    api: '/history/recommend/songs/detail',
    method: 'post',
    params: {
        /** 日期,通过历史日推可用日期列表接口获取,不能任意日期 */
        date: any;
    }
    return: ApiResponse;
}
