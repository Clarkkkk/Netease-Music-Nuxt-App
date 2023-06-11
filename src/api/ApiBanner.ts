/** banner */
export interface ApiBanner {
    api: '/banner'
    method: 'post'
    params: {
        /** 资源类型, 0: pc, 1: android, 2: iphone, 3: ipad, 默认为 0 */
        type?: 0 | 1 | 2 | 3
    }
    return: {
        code: number
        banners: Array<{
            /** 图片url */
            imageUrl: string
            /** 目标id，歌曲id或歌单id */
            targetId: number
            adid: null
            /** 1-歌曲 1000-歌单 10-专辑 3000-网页 */
            targetType: number
            titleColor: string
            /** 类型名称 */
            typeTitle: string
            /** 网页链接 */
            url: null | string
            exclusive: boolean
            adSource: null
            adLocation: null
            adDispatchJson: null
            encodeId: string
            program: null
            event: null
            video: null
            song: null
            scm: string
            bannerBizType: string
        }>
    }
}
