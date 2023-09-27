/** 获取用户歌单 */
export interface ApiUserPlaylist {
    api: '/user/playlist'
    method: 'post'
    params: {
        uid: number
        /** 返回数量 , 默认为 30 */
        limit?: number
        /** 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 */
        offset?: number
    }
    return: {
        code: number
        version: string
        more: boolean
        playlist: {
            subscribers: any[]
            subscribed: boolean
            creator: {
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
                expertTags: string[] | null
                experts: null
                djStatus: number
                vipType: number
                remarkName: null
                authenticationTypes: number
                avatarDetail: null
                avatarImgIdStr: string
                backgroundImgIdStr: string
                anchor: boolean
                creatorAvatarImgIdStr?: string
            }
            artists: null
            tracks: null
            updateFrequency: null
            backgroundCoverId: number
            backgroundCoverUrl: null
            titleImage: number
            titleImageUrl: null
            englishTitle: null
            opRecommend: boolean
            recommendInfo: null
            subscribedCount: number
            cloudTrackCount: number
            userId: number
            totalDuration: number
            coverImgId: number
            privacy: number
            trackUpdateTime: number
            trackCount: number
            updateTime: number
            commentThreadId: string
            coverImgUrl: string
            specialType: number
            anonimous: boolean
            createTime: number
            highQuality: boolean
            newImported: boolean
            trackNumberUpdateTime: number
            playCount: number
            adType: number
            description: null | string
            tags: string[]
            ordered: boolean
            status: number
            name: string
            id: number
            coverImgIdStr: null | string
            sharedUsers: null
            shareStatus: null
            copied: boolean
        }[]
    }
}
