/** 云盘歌曲删除 */
export interface ApiUserCloudDel {
    api: '/user/cloud/del',
    method: 'post',
    params: {
        /** 歌曲 id,可多个,用逗号隔开 */
        id: any;
    }
    return: ApiResponse;
}
