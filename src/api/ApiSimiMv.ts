/** 相似 mv */
export interface ApiSimiMv {
    api: '/simi/mv',
    method: 'post',
    params: {
        /** mv id */
        mvid: any;
    }
    return: ApiResponse;
}
