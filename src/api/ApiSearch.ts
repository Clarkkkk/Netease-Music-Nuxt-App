interface Music {
    name: null
    id: number
    size: number
    extension: string
    sr: number
    dfsId: number
    bitrate: number
    playTime: number
    volumeDelta: number
}

interface TrackArtist {
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
}

/** 搜索 */
export interface ApiSearch {
    api: '/search'
    method: 'post'
    params: {
        keywords: string
        /** 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样) */
        type?: 1 | 10 | 100 | 1000 | 1002 | 1004 | 1006 | 1009 | 1014 | 1018 | 2000
        /** 返回数量 , 默认为 30 */
        limit?: number
        /** 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 */
        offset?: number
    }
    return: {
        code: number
        result: {
            song: {
                moreText: string
                songs: {
                    name: string
                    id: number
                    pst: number
                    t: number
                    ar: {
                        id: number
                        name: string
                        tns: string[]
                        alias: string[]
                        alia?: string[]
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
                        picStr?: string
                        pic: number
                    }
                    dt: number
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
                    showRecommend: boolean
                    recommendText: string
                    officialTags: string[]
                    alg: string
                    specialTags: any[]
                    tns?: string[]
                }[]
                more: boolean
                resourceIds: number[]
            }
            newMlog: {
                more: boolean
                resources: any[]
            }
            code: number
            playList: {
                moreText: string
                more: boolean
                playLists: {
                    id: number
                    name: string
                    coverImgUrl: string
                    creator: {
                        nickname: string
                        userId: number
                        userType: number
                        avatarUrl: string
                        authStatus: number
                        expertTags: null
                        experts: null
                    }
                    subscribed: boolean
                    trackCount: number
                    userId: number
                    playCount: number
                    bookCount: number
                    specialType: number
                    officialTags: string[]
                    action: null
                    actionType: null
                    recommendText: null
                    score: null
                    description: null | string
                    highQuality: boolean
                    track: {
                        name: string
                        id: number
                        position: number
                        alias: string[]
                        status: number
                        fee: number
                        copyrightId: number
                        disc: string
                        no: number
                        artists: TrackArtist[]
                        album: {
                            name: string
                            id: number
                            idStr: null
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
                            company: null | string
                            briefDesc: string
                            artist: TrackArtist
                            songs: any[]
                            alias: string[]
                            status: number
                            copyrightId: number
                            commentThreadId: string
                            artists: TrackArtist[]
                            picIdStr: string
                        }
                        starred: boolean
                        popularity: number
                        score: number
                        starredNum: number
                        duration: number
                        playedNum: number
                        dayPlays: number
                        hearTime: number
                        ringtone: string
                        crbt: null
                        audition: null
                        copyFrom: string
                        commentThreadId: string
                        rtUrl: null
                        ftype: number
                        rtUrls: any[]
                        copyright: number
                        rtype: number
                        rurl: null
                        hMusic: Music
                        mMusic: Music
                        lMusic: Music
                        bMusic: Music
                        mp3Url: null
                        mvid: number
                        transNames?: string[]
                    }
                    alg: string
                }[]
                resourceIds: number[]
            }
            artist: {
                moreText: string
                artists: {
                    id: number
                    name: string
                    picUrl: string
                    alias: string[]
                    albumSize: number
                    picId: number
                    fansGroup: null
                    img1V1Url: string
                    accountId?: number
                    img1V1: number
                    transNames?: string[]
                    identityIconUrl?: string
                    mvSize: number
                    followed: boolean
                    alg: string
                    alia?: string[]
                    trans: null | string
                }[]
                more: boolean
                resourceIds: number[]
            }
            album: {
                moreText: string
                albums: {
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
                    artist: {
                        name: string
                        id: number
                        picId: number
                        img1V1Id: number
                        briefDesc: string
                        picUrl: string
                        img1V1Url: string
                        albumSize: number
                        alias: string[]
                        trans: string
                        musicSize: number
                        topicPerson: number
                        img1V1IdStr: string
                        alia: string[]
                        picIdStr?: string
                        transNames?: string[]
                    }
                    songs: null
                    alias: string[]
                    status: number
                    copyrightId: number
                    commentThreadId: string
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
                        img1V1IdStr: string
                    }[]
                    paid: boolean
                    onSale: boolean
                    alg: string
                    picIdStr?: string
                }[]
                more: boolean
                resourceIds: number[]
            }
            user: {
                moreText: string
                more: boolean
                users: {
                    defaultAvatar: boolean
                    province: number
                    authStatus: number
                    followed: boolean
                    avatarUrl: string
                    accountStatus: number
                    gender: number
                    city: number
                    birthday: number
                    userId: number
                    userType: number
                    nickname: string
                    signature: string
                    description: string
                    detailDescription: string
                    avatarImgId: number
                    backgroundImgId: number
                    backgroundUrl: string
                    authority: number
                    mutual: boolean
                    expertTags: null
                    experts: null
                    djStatus: number
                    vipType: number
                    remarkName: null
                    authenticationTypes: number
                    avatarDetail: null
                    avatarImgIdStr: string
                    backgroundImgIdStr: string
                    anchor: boolean
                    alg: string
                }[]
                resourceIds: number[]
            }
            order: string[]
        }
    }
}
