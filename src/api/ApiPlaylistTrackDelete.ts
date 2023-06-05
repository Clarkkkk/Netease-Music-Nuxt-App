/** 删除视频歌单里的视频 */
export interface ApiPlaylistTrackDelete {
    api: '/playlist/track/delete'
    method: 'post'
    return: ApiResponse
}
