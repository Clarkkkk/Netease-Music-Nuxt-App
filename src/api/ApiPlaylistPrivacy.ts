/** 公开隐私歌单 */
export interface ApiPlaylistPrivacy {
    api: '/playlist/privacy',
    method: 'post',
    return: ApiResponse;
}
