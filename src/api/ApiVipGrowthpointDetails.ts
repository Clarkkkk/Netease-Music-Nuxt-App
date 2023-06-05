/** vip 成长值获取记录 */
export interface ApiVipGrowthpointDetails {
    api: '/vip/growthpoint/details'
    method: 'post'
    params: {
        /** 取出评论数量 , 默认为 20 */
        limit: any
        /** 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*10, 其中 10 为 limit 的值 */
        offset: any
    }
    return: ApiResponse
}
