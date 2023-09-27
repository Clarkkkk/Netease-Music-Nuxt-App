/** 新歌速递 */
export interface ApiTopSong {
    api: '/top/song'
    method: 'post'
    params: {
        /** 地区类型 id 全部:0 华语:7 欧美:96 日本:8 韩国:16 */
        type: 0 | 7 | 8 | 16 | 96
    }
    return: {
        code: number
        data: {
            starred: boolean
            popularity: number
            starredNum: number
            playedNum: number
            dayPlays: number
            hearTime: number
            mp3Url: string
            rtUrls: null
            status: number
            alias: string[]
            artists: {
                img1V1Id: number
                topicPerson: number
                alias: any[]
                picId: number
                trans: string
                albumSize: number
                img1V1Url: string
                picUrl: string
                followed: boolean
                briefDesc: string
                musicSize: number
                name: string
                id: number
                img1V1IdStr: string
            }[]
            score: number
            copyrightId: number
            album: {
                songs: any[]
                paid: boolean
                onSale: boolean
                status: number
                alias: string[]
                artists: {
                    img1V1Id: number
                    topicPerson: number
                    alias: any[]
                    picId: number
                    trans: string
                    albumSize: number
                    img1V1Url: string
                    picUrl: string
                    followed: boolean
                    briefDesc: string
                    musicSize: number
                    name: string
                    id: number
                    img1V1IdStr: string
                }[]
                copyrightId: number
                picId: number
                artist: {
                    img1V1Id: number
                    topicPerson: number
                    alias: any[]
                    picId: number
                    trans: string
                    albumSize: number
                    img1V1Url: string
                    picUrl: string
                    followed: boolean
                    briefDesc: string
                    musicSize: number
                    name: string
                    id: number
                    img1V1IdStr: string
                }
                publishTime: number
                picUrl: string
                commentThreadId: string
                briefDesc: string
                blurPicUrl: string
                companyId: number
                pic: number
                tags: string
                company: null | string
                subType: string
                description: string
                name: string
                id: number
                type: string
                size: number
                picIdStr: string
                transNames?: string[]
            }
            fee: number
            mMusic: {
                sr: number
                dfsId: number
                playTime: number
                bitrate: number
                volumeDelta: number
                name: null
                id: number
                size: number
                extension: string
            } | null
            lMusic: {
                sr: number
                dfsId: number
                playTime: number
                bitrate: number
                volumeDelta: number
                name: null
                id: number
                size: number
                extension: string
            }
            copyFrom: string
            hMusic: {
                sr: number
                dfsId: number
                playTime: number
                bitrate: number
                volumeDelta: number
                name: null
                id: number
                size: number
                extension: string
            } | null
            mvid: number
            ftype: number
            rtype: number
            rurl: null
            commentThreadId: string
            audition: null
            ringtone: string
            crbt: null
            bMusic: {
                sr: number
                dfsId: number
                playTime: number
                bitrate: number
                volumeDelta: number
                name: null
                id: number
                size: number
                extension: string
            }
            rtUrl: null
            disc: string
            no: number
            position: number
            duration: number
            name: string
            id: number
            exclusive: boolean
            privilege: {
                id: number
                fee: number
                payed: number
                st: number
                pl: number
                dl: number
                sp: number
                cp: number
                subp: number
                cs: boolean
                maxbr: number
                fl: number
                toast: boolean
                flag: number
                preSell: boolean
            }
            transNames?: string[]
        }[]
    }
}
