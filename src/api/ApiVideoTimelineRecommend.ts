/** 获取推荐视频 */
export interface ApiVideoTimelineRecommend {
    api: '/video/timeline/recommend',
    method: 'post',
    params: {
        /** 默认 0 */
        offset: any;
    }
    return: ApiResponse;
}
