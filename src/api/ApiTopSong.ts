/** 新歌速递 */
export interface ApiTopSong {
    api: '/top/song',
    method: 'post',
    params: {
        /** 地区类型 id,对应以下: */
        type: any;
    }
    return: ApiResponse;
}
