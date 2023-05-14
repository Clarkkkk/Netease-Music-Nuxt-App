/** 喜欢音乐列表 */
export interface ApiLikelist {
    api: '/likelist',
    method: 'post',
    params: {
        /** 用户 id */
        uid: any;
    }
    return: ApiResponse;
}
