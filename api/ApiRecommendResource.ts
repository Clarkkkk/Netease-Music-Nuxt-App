/** 获取每日推荐歌单 */
export interface ApiRecommendResource {
    api: '/recommend/resource'
    method: 'post'
    return: {
        code: number
        featureFirst: boolean
        haveRcmdSongs: boolean
        recommend: {
            id: number
            type: number
            name: string
            copywriter: string
            picUrl: string
            playcount: number
            createTime: number
            creator: {
                backgroundImgIdStr: string
                avatarImgIdStr: string
                remarkName: null
                avatarImgId: number
                backgroundImgId: number
                detailDescription: string
                defaultAvatar: boolean
                expertTags: string[] | null
                djStatus: number
                followed: boolean
                backgroundUrl: string
                mutual: boolean
                accountStatus: number
                vipType: number
                province: number
                gender: number
                avatarUrl: string
                authStatus: number
                userType: number
                nickname: string
                birthday: number
                city: number
                description: string
                userId: number
                signature: string
                authority: number
            }
            trackCount: number
            userId: number
            alg: string
        }[]
    }
}
