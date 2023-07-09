/** 获取用户播放记录 */
export interface ApiUserRecord {
    api: '/user/record'
    method: 'post'
    params: {
        uid: number
        /** 默认为0 type=0时返回 allData, type=1时只返回 weekData */
        type?: 0 | 1
    }
    return: {
        code: number
        allData: UserRecordData[]
        weekData: UserRecordData[]
    }
}

interface UserRecordData {
    playCount: number
    score: number
    song: {
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
        rt: null | string
        fee: number
        v: number
        crbt: null
        cf: string
        al: {
            id: number
            name: string
            picUrl: string
            tns: any[]
            pic: number
            picStr?: string
        }
        dt: number
        // h: L | null
        // m: L | null
        // l: L
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
        single: number
        // noCopyrightRcmd: NoCopyrightRcmd | null
        rtype: number
        rurl: null
        mst: number
        cp: number
        mv: number
        publishTime: number
        tns?: string[]
        // privilege: Privilege
        // pc?: Pc
        eq?: string
    }
}
