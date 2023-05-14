/** 获取歌曲详情 */
export interface ApiSongDetail {
    api: '/song/detail',
    method: 'post',
    params: {
        /** 音乐 id, 如 `ids=347230` */
        ids: any;
    }
    return: ApiResponse;
}
