/** 网易出品 mv */
export interface ApiMvExclusiveRcmd {
    api: '/mv/exclusive/rcmd',
    method: 'post',
    params: {
        /** 取出数量 , 默认为 30 */
        limit: any;
        /** 偏移数量 , 用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认 */
        offset: any;
    }
    return: ApiResponse;
}
