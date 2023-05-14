/** 获取用户历史评论 */
export interface ApiUserCommentHistory {
    api: '/user/comment/history',
    method: 'post',
    return: ApiResponse;
}
