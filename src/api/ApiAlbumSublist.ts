/** 获取已收藏专辑列表 */
export interface ApiAlbumSublist {
    api: '/album/sublist',
    method: 'post',
    params: {
        /** 取出数量 , 默认为 25 */
        limit: any;
        /** 偏移数量 , 用于分页 , 如 :( 页数 -1)\*25, 其中 25 为 limit 的值 , 默认 */
        offset: any;
    }
    return: ApiResponse;
}
