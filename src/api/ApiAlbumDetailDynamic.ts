/** 专辑动态信息 */
export interface ApiAlbumDetailDynamic {
    api: '/album/detail/dynamic'
    method: 'post'
    params: {
        /** 专辑 id */
        id: any
    }
    return: ApiResponse
}
