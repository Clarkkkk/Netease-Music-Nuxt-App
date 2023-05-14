/** 获取视频点赞转发评论数数据 */
export interface ApiVideoDetailInfo {
    api: '/video/detail/info',
    method: 'post',
    params: {
        /** 视频 id */
        vid: any;
    }
    return: ApiResponse;
}
