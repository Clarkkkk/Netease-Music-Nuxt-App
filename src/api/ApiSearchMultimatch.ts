/** 搜索多重匹配 */
export interface ApiSearchMultimatch {
    api: '/search/multimatch'
    method: 'post'
    params: {
        keywords: string
    }
    return: ApiResponse
}
