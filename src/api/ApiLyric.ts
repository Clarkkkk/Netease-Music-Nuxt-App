/** 获取歌词 */
export interface ApiLyric {
    api: '/lyric'
    method: 'post'
    params: {
        /** 音乐 id */
        id: number
    }
    return: {
        code: number
        sgc: boolean
        sfy: boolean
        qfy: boolean
        /** 歌词原文 */
        lrc: {
            version: number
            lyric: string
        }
        klyric: {
            version: number
            lyric: string
        }
        /** 歌词翻译 */
        tlyric: {
            version: number
            lyric: string
        }
        /** 罗马音歌词 */
        romalrc: {
            version: number
            lyric: string
        }
        transUser: {
            id: number
            status: number
            demand: number
            userid: number
            nickname: string
            uptime: number
        }
    }
}
