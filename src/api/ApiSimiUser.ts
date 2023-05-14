/** 获取最近 5 个听了这首歌的用户 */
export interface ApiSimiUser {
    api: '/simi/user',
    method: 'post',
    params: {
        /** 歌曲 id */
        id: any;
    }
    return: ApiResponse;
}
