/** 排行榜详情 */
export interface ApiTopListInfo {
    api: '/top/list',
    method: 'post',
    params: {
        /** 榜单 id,通过所有榜单接口获取~~ */
        id: any;
    }
    return: ApiResponse;
}
