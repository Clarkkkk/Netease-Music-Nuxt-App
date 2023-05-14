/** 视频详情 */
export interface ApiVideoDetail {
    api: '/video/detail',
    method: 'post',
    params: {
        /** 视频 的 id */
        id: any;
    }
    return: ApiResponse;
}
