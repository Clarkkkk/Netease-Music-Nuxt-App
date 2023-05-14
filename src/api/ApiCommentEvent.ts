/** 获取动态评论 */
export interface ApiCommentEvent {
    api: '/comment/event',
    method: 'post',
    return: ApiResponse;
}
