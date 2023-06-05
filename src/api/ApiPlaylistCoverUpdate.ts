/** 歌单封面上传 */
export interface ApiPlaylistCoverUpdate {
    api: '/playlist/cover/update'
    method: 'post'
    params: {
        /** 歌单 id 3143833470 */
        id: any
    }
    return: ApiResponse
}
