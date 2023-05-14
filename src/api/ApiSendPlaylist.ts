/** 发送私信(带歌单) */
export interface ApiSendPlaylist {
    api: '/send/playlist',
    method: 'post',
    return: ApiResponse;
}
