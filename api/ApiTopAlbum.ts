/** 新碟上架 */
export interface ApiTopAlbum {
    api: '/top/album'
    method: 'post'
    params: {
        /** ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本 */
        area?: 'ALL' | 'ZH' | 'EA' | 'KR' | 'JP'
        /** new:全部 hot:热门,默认为 new */
        type?: 'new' | 'hot'
        /** 年,默认本年 */
        year?: number
        /** 月,默认本月 */
        month?: number
        /** 返回数量 , 默认为 30 */
        limit?: number
        /** 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 */
        offset?: number
    }
    return: ApiResponse
}
