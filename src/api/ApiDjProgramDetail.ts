/** 电台 - 节目详情 */
export interface ApiDjProgramDetail {
    api: '/dj/program/detail',
    method: 'post',
    params: {
        /** 电台节目 的 id */
        id: any;
    }
    return: ApiResponse;
}
