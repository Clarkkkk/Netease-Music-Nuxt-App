/** 电台 - 订阅 */
export interface ApiDjSub {
    api: '/dj/sub',
    method: 'post',
    params: {
        /** 电台 的 id */
        rid: any;
    }
    return: ApiResponse;
}
