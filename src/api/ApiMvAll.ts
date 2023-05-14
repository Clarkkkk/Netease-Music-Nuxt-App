/** 全部 mv */
export interface ApiMvAll {
    api: '/mv/all',
    method: 'post',
    params: {
        /** 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 */
        area: any;
        /** 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部 */
        type: any;
        /** 排序,可选值为上升最快,最热,最新,不填则为上升最快 */
        order: any;
        /** 取出数量 , 默认为 30 */
        limit: any;
        /** 偏移数量 , 用于分页 , 如 :( 页数 -1)\*50, 其中 50 为 limit 的值 , 默认 */
        offset: any;
    }
    return: ApiResponse;
}
