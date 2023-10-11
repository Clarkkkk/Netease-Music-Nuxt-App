/** 获取歌单详情 */
export interface ApiPlaylistDetail {
    api: '/playlist/detail'
    method: 'post'
    params: {
        id: number
        /** 歌单最近的 s 个收藏者,默认为 8 */
        s?: number
    }
    return: {
        code: number
        privileges: any[]
        playlist: {
            id: number
            name: string
            coverImgId: number
            coverImgUrl: string
            coverImgIdStr: string
            adType: number
            userId: number
            createTime: number
            status: number
            opRecommend: boolean
            highQuality: boolean
            newImported: boolean
            updateTime: number
            trackCount: number
            specialType: number
            privacy: number
            trackUpdateTime: number
            commentThreadId: string
            playCount: number
            trackNumberUpdateTime: number
            subscribedCount: number
            cloudTrackCount: number
            ordered: boolean
            description: string
            tags: string[]
            updateFrequency: null
            backgroundCoverId: number
            backgroundCoverUrl: null
            titleImage: number
            titleImageUrl: null
            englishTitle: null
            officialPlaylistType: null
            copied: boolean
            relateResType: null
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
                expertTags: null
                experts: null
                djStatus: number
                vipType: number
                remarkName: null
                authenticationTypes: number
                avatarDetail: null
                backgroundImgIdStr: string
                avatarImgIdStr: string
                anchor: boolean
                creatorAvatarImgIdStr?: string
            }
            tracks: {
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
                rt: string
                fee: number
                v: number
                crbt: null
                cf: string
                al: {
                    id: number
                    name: string
                    picUrl: string
                    tns: string[]
                    picStr?: string
                    pic: number
                }
                dt: number
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
                rurl: null
                rtype: number
                publishTime: number
                tns?: string[]
            }[]
            videoIds: null
            videos: null
            trackIds: {
                id: number
                v: number
                t: number
                at: number
                alg: null
                uid: number
                rcmdReason: string
                sc: null
                f: null
                sr: null
            }[]
            bannedTrackIds: null
            mvResourceInfos: null
            shareCount: number
            commentCount: number
            remixVideo: null
            sharedUsers: null
            historySharedUsers: null
            gradeStatus: string
            score: null
            algTags: null
        }
    }
}