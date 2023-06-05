/** 获取客户端歌曲下载 url */
export interface ApiSongDownloadUrl {
    api: '/song/download/url'
    method: 'post'
    return: ApiResponse
}
