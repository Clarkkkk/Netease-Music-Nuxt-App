/** 电台 - 节目 */
export interface ApiDjProgram {
    api: '/dj/program',
    method: 'post',
    params: {
        /** 电台 的 id */
        rid: any;
    }
    return: ApiResponse;
}
