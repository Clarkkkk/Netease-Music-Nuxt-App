/** 新版评论接口 */
export interface ApiCommentNew {
    api: '/comment/new'
    method: 'post'
    params: {
        /** 分页参数,第 N 页,默认为 1 */
        pageNo: any
        /** 分页参数,每页多少条数据,默认 20 */
        pageSize: any
        /** 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序 */
        sortType: any
        /** 当`sortType`为 3 时且页数不是第一页时需传入,值为上一条数据的 time */
        cursor: any
    }
    return: ApiResponse
}
