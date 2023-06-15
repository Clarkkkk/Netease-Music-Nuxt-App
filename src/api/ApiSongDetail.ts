/** 获取歌曲详情 */
export interface ApiSongDetail {
    api: '/song/detail'
    method: 'post'
    params: {
        /** 音乐 id, 如 `ids=347230` */
        ids: string
    }
    return: {
        code: number
        songs: {
            name: string
            id: number
            pst: number
            t: number
            ar: {
                id: number
                name: string
                tns: any[]
                alias: string[]
            }[]
            alia: string[]
            pop: number
            st: number
            rt: string
            fee: number
            v: number
            crbt: null
            cf: string
            al: {
                id: number
                name: string
                picUrl: string
                tns: any[]
                picStr: string
                pic: number
            }
            dt: number
            h: any
            m: any
            l: any
            sq: null
            hr: null
            a: null
            cd: string
            no: number
            rtUrl: null
            ftype: number
            rtUrls: any[]
            djId: number
            copyright: number
            sId: number
            mark: number
            originCoverType: number
            originSongSimpleData: null
            tagPicList: null
            resourceState: boolean
            version: number
            songJumpInfo: null
            entertainmentTags: null
            awardTags: null
            single: number
            noCopyrightRcmd: null
            mst: number
            cp: number
            mv: number
            rtype: number
            rurl: null
            publishTime: number
        }[]
        privileges: any[]
    }
}
