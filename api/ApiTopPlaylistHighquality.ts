/** 获取精品歌单 */
export interface ApiTopPlaylistHighquality {
    api: '/top/playlist/highquality'
    method: 'post'
    params: {
        /** tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 */
        cat: any
    }
    return: ApiResponse
}
