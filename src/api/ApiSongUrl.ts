/** 获取音乐 url */
export interface ApiSongUrl {
    api: '/song/url'
    method: 'post'
    params: {
        id: number | string
        /** 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推 */
        br?: number
    }
    return: {
        code: number
        data: SongResponse[]
    }
}

interface SongResponse {
    id: number
    url: string
    br: number
    size: number
    md5: string
    code: number
    expi: number
    type: string
    gain: number
    peak: number
    fee: number
    uf: null
    payed: number
    flag: number
    canExtend: boolean
    freeTrialInfo: null
    level: string
    encodeType: string
    freeTrialPrivilege: {
        resConsumable: boolean
        userConsumable: boolean
        type: number
        remainTime: number
    }
    freeTimeTrialPrivilege: {
        resConsumable: boolean
        userConsumable: boolean
        listenType: null
        cannotListenReason: null
    }
    urlSource: number
    rightSource: number
    podcastCtrp: null
    effectTypes: null
    time: number
}
