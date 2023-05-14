/** 云盘歌曲信息匹配纠正 */
export interface ApiCloudMatch {
    api: '/cloud/match',
    method: 'post',
    params: {
        /** 用户 id */
        uid: any;
        /** 云盘的歌曲 id */
        sid: any;
        /** 要匹配的歌曲 id */
        asid: any;
    }
    return: ApiResponse;
}
