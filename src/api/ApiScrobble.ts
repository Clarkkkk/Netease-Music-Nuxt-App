/** 听歌打卡 */
export interface ApiScrobble {
    api: '/scrobble'
    method: 'post'
    params: {
        /** 歌曲 id, `sourceid`: 歌单或专辑 id */
        id: number
        sourceid?: number
        /** 歌曲播放时间,单位为秒 */
        time?: number
    }
    return: {
        code: number
        data: string
        message: string
    }
}
