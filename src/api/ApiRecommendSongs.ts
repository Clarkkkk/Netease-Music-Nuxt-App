/** 获取每日推荐歌曲 */
export interface ApiRecommendSongs {
    api: '/recommend/songs'
    method: 'post'
    return: {
        code: number
        data: {
            dailySongs: {
                name: string
                id: number
                pst: number
                t: number
                ar: {
                    id: number
                    name: string
                    tns: any[]
                    alias: any[]
                }[]
                alia: string[]
                pop: number
                st: number
                rt: string | null
                fee: number
                v: number
                crbt: null
                cf: string
                al: {
                    id: number
                    name: string
                    picUrl: string
                    tns: any[]
                    picStr?: string
                    pic: number
                }
                dt: number
                h: { br: number; fid: number; size: number; vd: number; sr: number }
                m: { br: number; fid: number; size: number; vd: number; sr: number } | null
                l: { br: number; fid: number; size: number; vd: number; sr: number }
                sq: { br: number; fid: number; size: number; vd: number; sr: number } | null
                hr: { br: number; fid: number; size: number; vd: number; sr: number } | null
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
                single: number
                noCopyrightRcmd: null
                rtype: number
                rurl: null
                mst: number
                cp: number
                mv: number
                publishTime: number
                reason: null | string
                tns?: string[]
                recommendReason: null | string
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
            }[]
            recommendReasons: {
                songId: number
                reason: string
                reasonId: string
                targetUrl: null
            }[]
        }
    }
}
