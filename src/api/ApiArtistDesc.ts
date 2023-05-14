/** 获取歌手描述 */
export interface ApiArtistDesc {
    api: '/artist/desc',
    method: 'post',
    params: {
        /** 歌手 id */
        id: any;
    }
    return: ApiResponse;
}
