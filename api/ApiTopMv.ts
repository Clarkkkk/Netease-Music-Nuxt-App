/** mv 排行 */
export interface ApiTopMv {
    api: '/top/mv'
    method: 'post'
    params: {
        /** 取出数量 , 默认为 30 */
        limit: any
        /** 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部 */
        area: any
        /** 偏移数量 , 用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认 */
        offset: any
    }
    return: ApiResponse
}
