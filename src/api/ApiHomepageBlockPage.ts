/** 首页-发现 */
export interface ApiHomepageBlockPage {
    api: '/homepage/block/page',
    method: 'post',
    params: {
        /** 是否刷新数据,默认为 false */
        refresh: any;
        /** 上一条数据返回的 cursor */
        cursor: any;
    }
    return: ApiResponse;
}
