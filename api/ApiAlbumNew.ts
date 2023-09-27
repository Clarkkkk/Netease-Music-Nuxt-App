/** 全部新碟 */
export interface ApiAlbumNew {
    api: '/album/new'
    method: 'post'
    params: {
        /** ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本 */
        area?: 'ALL' | 'ZH' | 'EA' | 'KR' | 'JP'
        /** 返回数量 , 默认为 30 */
        limit?: number
        /** 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 */
        offset?: number
    }
    return: {
        total: number
        code: number
        albums: {
            songs: any[]
            paid: boolean
            onSale: boolean
            mark: number
            awardTags: null
            blurPicUrl: string
            companyId: number
            pic: number
            alias: any[]
            artists: {
                img1V1Id: number
                topicPerson: number
                trans: string
                alias: string[]
                picId: number
                musicSize: number
                albumSize: number
                briefDesc: string
                picUrl: string
                img1V1Url: string
                followed: boolean
                name: string
                id: number
                img1V1IdStr: string
                picIdStr?: string
                transNames?: string[]
            }[]
            copyrightId: number
            picId: number
            artist: {
                img1V1Id: number
                topicPerson: number
                trans: string
                alias: string[]
                picId: number
                musicSize: number
                albumSize: number
                briefDesc: string
                picUrl: string
                img1V1Url: string
                followed: boolean
                name: string
                id: number
                img1V1IdStr: string
                picIdStr?: string
                transNames?: string[]
            }
            publishTime: number
            company: string
            briefDesc: string
            picUrl: string
            commentThreadId: string
            description: string
            tags: string
            status: number
            subType: string
            name: string
            id: number
            type: string
            size: number
            picIdStr: string
            transNames?: string[]
        }[]
    }
}
