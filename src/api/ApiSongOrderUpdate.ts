/** 调整歌曲顺序 */
export interface ApiSongOrderUpdate {
    api: '/song/order/update'
    method: 'post'
    params: {
        /** 歌单 id */
        pid: any
        /** 歌曲 id 列表 */
        ids: any
    }
    return: ApiResponse
}
