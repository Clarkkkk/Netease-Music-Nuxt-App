/** 资源点赞( MV,电台,视频) */
export interface ApiResourceLike {
    api: '/resource/like',
    method: 'post',
    params: {
        /** 资源类型,对应以下类型 */
        type: any;
    }
    return: ApiResponse;
}
