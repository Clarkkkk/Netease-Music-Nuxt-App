/** 用户电台 */
export interface ApiUserAudio {
    api: '/user/audio'
    method: 'post'
    params: {
        /** 用户 id */
        uid: any
    }
    return: ApiResponse
}
