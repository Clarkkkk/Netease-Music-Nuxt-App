/** 转发用户动态 */
export interface ApiEventForward {
    api: '/event/forward',
    method: 'post',
    return: ApiResponse;
}
