/** 获取歌手详情 */
export interface ApiArtistDetail {
    api: '/artist/detail',
    method: 'post',
    params: {
        /** 歌手 id */
        id: any;
    }
    return: ApiResponse;
}
