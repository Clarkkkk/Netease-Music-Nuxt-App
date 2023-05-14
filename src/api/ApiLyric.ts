/** 获取歌词 */
export interface ApiLyric {
    api: '/lyric',
    method: 'post',
    params: {
        /** 音乐 id */
        id: any;
    }
    return: ApiResponse;
}
