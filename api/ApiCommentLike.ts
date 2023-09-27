/** 给评论点赞 */
export interface ApiCommentLike {
    api: '/comment/like'
    method: 'post'
    return: ApiResponse
}
