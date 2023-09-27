/** 获取已收藏专辑列表 */
export interface ApiAlbumSublist {
    api: '/album/sublist'
    method: 'post'
    params: {
        /** 取出数量 , 默认为 25 */
        limit: number
        /** 偏移数量 , 用于分页 , 如 :( 页数 -1)\*25, 其中 25 为 limit 的值 , 默认 */
        offset: number
    }
    return: {
        code: number
        count: number
        hasMore: boolean
        cover: string
        paidCount: number
        data: {
            subTime: number
            msg: any[]
            alias: string[]
            artists: {
                img1V1Id: number
                topicPerson: number
                alias: any[]
                picId: number
                briefDesc: string
                musicSize: number
                albumSize: number
                picUrl: string
                img1V1Url: string
                followed: boolean
                trans: string
                name: string
                id: number
                img1V1IdStr: string
            }[]
            picId: number
            picUrl: string
            name: string
            id: number
            size: number
            transNames: string[]
        }[]
    }
}
