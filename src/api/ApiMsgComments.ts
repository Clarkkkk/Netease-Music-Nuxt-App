/** 通知 - 评论 */
export interface ApiMsgComments {
    api: '/msg/comments',
    method: 'post',
    params: {
        /** 用户 的 id，只能和登录账号的 id 一致 */
        uid: any;
    }
    return: ApiResponse;
}
