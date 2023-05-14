/** 推荐新音乐 */
export interface ApiPersonalizedNewsong {
    api: '/personalized/newsong',
    method: 'post',
    params: {
        /** 取出数量 , 默认为 10 (不支持 offset) */
        limit: any;
    }
    return: ApiResponse;
}
