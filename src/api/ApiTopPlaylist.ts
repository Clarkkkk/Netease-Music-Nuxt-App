/** 歌单 ( 网友精选碟 ) */
export interface ApiTopPlaylist {
    api: '/top/playlist',
    method: 'post',
    params: {
        /** 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 */
        order: any;
    }
    return: ApiResponse;
}
