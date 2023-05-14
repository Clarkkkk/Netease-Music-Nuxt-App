/** 调整歌单顺序 */
export interface ApiPlaylistOrderUpdate {
    api: '/playlist/order/update',
    method: 'post',
    params: {
        /** 歌单 id 列表 */
        ids: any;
    }
    return: ApiResponse;
}
