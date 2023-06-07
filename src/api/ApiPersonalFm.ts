/** 私人 FM */
export interface ApiPersonalFm {
    api: '/personal_fm'
    method: 'post'
    return: {
        code: number
        data: Array<{
            /** 歌曲名 */
            name: string
            /** 歌曲id */
            id: number
            position: number
            /** 歌曲别名 */
            alias: string[]
            status: number
            fee: number
            copyrightId: number
            disc: string
            no: number
            artists: {
                name: string
                id: number
                picId: number
                img1V1Id: number
                briefDesc: string
                picUrl: string
                img1V1Url: string
                albumSize: number
                alias: any[]
                trans: string
                musicSize: number
                topicPerson: number
            }[]
            album: {
                name: string
                id: number
                type: string
                size: number
                picId: number
                blurPicUrl: string
                companyId: number
                pic: number
                picUrl: string
                publishTime: number
                description: string
                tags: string
                company: string
                briefDesc: string
                artist: Artist
                songs: any[]
                alias: any[]
                status: number
                copyrightId: number
                commentThreadId: string
                artists: Artist[]
                subType: string
                transName: null
                onSale: boolean
                mark: number
                gapless: number
                picIdStr: string
            }
            /** 是否红心 */
            starred: boolean
            popularity: number
            score: number
            starredNum: number
            duration: number
            playedNum: number
            dayPlays: number
            hearTime: number
            sqMusic: Music | null
            hrMusic: Music | null
            ringtone: null | string
            crbt: null
            audition: null
            copyFrom: string
            commentThreadId: string
            rtUrl: null
            ftype: number
            rtUrls: any[]
            copyright: number
            transName: null | string
            sign: null
            mark: number
            originCoverType: number
            originSongSimpleData: null
            single: number
            noCopyrightRcmd: null
            rtype: number
            rurl: null
            mvid: number
            bMusic: Music
            mp3Url: null
            hMusic: Music
            mMusic: Music
            lMusic: Music
            reason?: string
            reasonId?: string
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
                playMaxbr: number
                downloadMaxbr: number
                maxBrLevel: string
                playMaxBrLevel: string
                downloadMaxBrLevel: string
                plLevel: string
                dlLevel: string
                flLevel: string
                rscl: null
                freeTrialPrivilege: {
                    resConsumable: boolean
                    userConsumable: boolean
                    listenType: null
                }
                chargeInfoList: {
                    rate: number
                    chargeUrl: null
                    chargeMessage: null
                    chargeType: number
                }[]
            }
            alg: string
            sCtrp?: string
            transNames?: string[]
        }>
    }
}

enum Extension {
    Flac = 'flac',
    Mp3 = 'mp3'
}

interface Music {
    name: null
    id: number
    size: number
    extension: Extension
    sr: number
    dfsId: number
    bitrate: number
    playTime: number
    volumeDelta: number
}

interface Artist {
    name: string
    id: number
    picId: number
    img1V1Id: number
    briefDesc: string
    picUrl: string
    img1V1Url: string
    albumSize: number
    alias: any[]
    trans: string
    musicSize: number
    topicPerson: number
}
