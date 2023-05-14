/** 获取歌手专辑 */
export interface ApiArtistAlbum {
    api: '/artist/album',
    method: 'post',
    params: {
        /** 歌手 id */
        id: any;
        /** 取出数量 , 默认为 30 */
        limit: any;
        /** 偏移数量 , 用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认 */
        offset: any;
    }
    return: ApiResponse;
}
