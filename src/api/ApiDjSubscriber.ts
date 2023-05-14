/** 电台订阅者列表 */
export interface ApiDjSubscriber {
    api: '/dj/subscriber',
    method: 'post',
    params: {
        /** 电台 id */
        id: any;
    }
    return: ApiResponse;
}
