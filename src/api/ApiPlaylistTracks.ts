/** 对歌单添加或删除歌曲 */
export interface ApiPlaylistTracks {
    api: '/playlist/tracks',
    method: 'post',
    params: {
        /** 从歌单增加单曲为 add, 删除为 del */
        op: any;
        /** 歌单 id */
        pid: any;
        /** 歌曲 id,可多个,用逗号隔开 */
        tracks: any;
    }
    return: ApiResponse;
}
