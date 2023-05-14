/** 获取相似音乐 */
export interface ApiSimiSong {
    api: '/simi/song',
    method: 'post',
    params: {
        /** 歌曲 id */
        id: any;
    }
    return: ApiResponse;
}
