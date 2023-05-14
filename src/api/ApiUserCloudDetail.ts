/** 云盘数据详情 */
export interface ApiUserCloudDetail {
    api: '/user/cloud/detail',
    method: 'post',
    params: {
        /** 歌曲 id,可多个,用逗号隔开 */
        id: any;
    }
    return: ApiResponse;
}
